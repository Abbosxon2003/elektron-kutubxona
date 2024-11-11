import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import * as bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import { Response } from 'express';
import { SignInDto } from './dto/signin-auth.dto';
import { MailService } from '../mail/mail.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/models/user.model';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}
  async generateAdminTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_ADMIN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateAdminRefreshToken(adminId: number, refresh_token: string) {
    const hashed_refresh_token = await bcrypt.hash(refresh_token, 3);
    return this.adminService.updateRefreshToken(adminId, hashed_refresh_token);
  }

  async signUpAdmin(createAdminDto: CreateAdminDto, res: Response) {
    const newAdmin = await this.adminService.create(createAdminDto);

    if (!newAdmin) {
      throw new InternalServerErrorException("Yangi Admin qo'shishda xatolik");
    }

    const hashed_password = await bcrypt.hash(newAdmin.password, 7);
    console.log(hashed_password);

    const updatedAdmin = await this.adminService.updateAdmin(newAdmin.id, {
      hashed_password,
    });

    const tokens = await this.generateAdminTokens(newAdmin);

    return { admin: updatedAdmin, access_token: tokens.access_token };
  }

  async signInAdmin(signInAdminDto: SignInDto, res: Response) {
    const admin = await this.adminService.findByEmail(signInAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException('Email or Password incrrect1');
    }

    const validPassword = await bcrypt.compare(
      signInAdminDto.password,
      admin.hashed_password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Email or Password incrrect2');
    }

    admin.is_active = true;
    await admin.save();

    const tokens = await this.generateAdminTokens(admin);
    const updatedAdmin = await this.updateAdminRefreshToken(admin.id, tokens.refresh_token);
    console.log(updatedAdmin);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.REFRESH_TIME_MS,
      httpOnly: true,
    });

    return {
      message: 'Admin signed in succesfully',
      admin,
      access_token: tokens.access_token,
    };
  }

  async signOutAdmin(refresh_token: string, res: Response) {
    try {
      if (!refresh_token) {
        throw new BadRequestException('Refresh token is required');
      }
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
      });
      if (!payload) {
        throw new BadRequestException('Invalid refresh token1');
      }
      // console.log(payload)
      const admin = await this.adminService.findByEmail(payload.email);
      if (!admin) {
        throw new BadRequestException('Invalid refresh token2');
      }
      admin.hashed_refresh_token = null;
      admin.is_active = false;
      admin.save();

      res.clearCookie('refresh_token');

      return { message: 'Admin signed  out' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async refreshAdminToken(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_ADMIN_KEY,
      });
      console.log(payload);
      const admin = await this.adminService.findByEmail(payload.email);
      if (!admin) {
        throw new BadRequestException('Invalid refresh token');
      }

      const validRefreshToken = await bcrypt.compare(
        refresh_token,
        admin.hashed_refresh_token,
      );

      if (!validRefreshToken) {
        throw new ForbiddenException('Invalid refresh token');
      }

      const tokens = await this.generateAdminTokens(admin);
      await this.updateAdminRefreshToken(admin.id, tokens.refresh_token);
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: +process.env.REFRESH_TIME_MS,
        httpOnly: true,
      });

      return {
        message: 'Token refreshed successfully',
        id: admin.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async generateUserTokens(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      is_active: user.is_active,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_USER_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_USER_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return { access_token, refresh_token };
  }

  async updateUserRefreshToken(
    userId: number,
    refresh_token: string,
    activation_link?: string,
  ) {
    const hashed_refresh_token = await bcrypt.hash(refresh_token, 3);
    const updatedUser = await this.userService.updateRefreshToken(
      userId,
      hashed_refresh_token,
      activation_link,
    );

    return updatedUser;
  }

  async signUpUser(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userService.findUserByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadRequestException('Passwords do not match');
    }

    const newUser = await this.userService.create({
      ...createUserDto,
    });

    const hashed_password = await bcrypt.hash(newUser.password, 7);
    const updateUser = await this.userService.updateUser(newUser.id, {
      hashed_password,
    });

    const tokens = await this.generateUserTokens(updateUser);

    const activation_link = uuid.v4();
    const updatedUser = await this.updateUserRefreshToken(
      newUser.id,
      tokens.refresh_token,
      activation_link,
    );

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      maxAge: +process.env.REFRESH_TIME_MS,
    });

    console.log(updatedUser);

    try {
      await this.mailService.sendMailToUser(updatedUser);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error sending mail');
    }

    const response = {
      message: 'User registered successfully',
      user: updatedUser,
      access_token: tokens.access_token,
    };
    return response;
  }

  async signInUser(email: string, password: string, res: Response) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.hashed_password);

    if (!isMatch) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = await this.generateUserTokens(user);

    await this.updateUserRefreshToken(user.id, tokens.refresh_token);
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: +process.env.REFRESH_TIME_MS,
      httpOnly: true,
    });

    return {
      message: 'User signed in succesfully',
      id: user.id,
      access_token: tokens.access_token,
    };
  }

  async signOutUser(refresh_token: string, res: Response) {
    try {
      if (!refresh_token) {
        throw new BadRequestException('Refresh token is required');
      }
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_USER_KEY,
      });
      if (!payload) {
        throw new BadRequestException('Invalid refresh token1');
      }
      // console.log(payload)
      const user = await this.userService.findUserByEmail(payload.email);
      if (!user) {
        throw new BadRequestException('Invalid refresh token2');
      }
      user.hashed_refresh_token = null;
      user.save();

      res.clearCookie('refresh_token');

      return { message: 'User signed  out succesfuly' };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async refreshUserToken(refresh_token: string, res: Response) {
    try {
      const payload = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_USER_KEY,
      });
      const user = await this.userService.findUserByEmail(payload.email);
      if (!user) {
        throw new BadRequestException('Invalid refresh token');
      }

      const validRefreshToken = await bcrypt.compare(
        refresh_token,
        user.hashed_refresh_token,
      );

      if (!validRefreshToken) {
        throw new ForbiddenException('Invalid refresh token');
      }

      const tokens = await this.generateUserTokens(user);
      await this.updateUserRefreshToken(user.id, tokens.refresh_token);
      res.cookie('refresh_token', tokens.refresh_token, {
        maxAge: +process.env.REFRESH_TIME_MS,
        httpOnly: true,
      });

      return {
        message: 'Token refreshed successfully',
        id: user.id,
        access_token: tokens.access_token,
      };
    } catch (error) {
      console.log('refreshuser error', error);
      throw new InternalServerErrorException();
    }
  }
}
