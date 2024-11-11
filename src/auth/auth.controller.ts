import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInDto } from './dto/signin-auth.dto';
import { CookieGetter } from 'src/common/decorators/cookie_getter.decorator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreatorGuard } from 'src/common/guards/creator.guard';
import { UserGuard } from 'src/common/guards/user.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(CreatorGuard)
  @ApiOperation({ summary: 'Register new Admin' })
  @ApiResponse({
    status: 201,
    description: 'Registered',
    type: Object,
  })
  @Post('signup-admin')
  async signUpAdmin(
    @Body() createAdminDto: CreateAdminDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUpAdmin(createAdminDto, res);
  }

  @ApiOperation({ summary: 'Sign in Admin' })
  @ApiResponse({
    status: 200,
    description: 'Sign in',
    type: Object,
  })
  @HttpCode(200)
  @Post('signin-admin')
  async signInAdmin(
    @Body() signInAdminDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInAdmin(signInAdminDto, res);
  }

  @ApiOperation({ summary: 'Sign out Admin' })
  @ApiResponse({
    status: 200,
    description: 'Sign out',
    type: Object,
  })
  @HttpCode(200)
  @Post('signout-admin')
  async signOut(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOutAdmin(refresh_token, res);
  }

  @ApiOperation({ summary: 'Refresh Admin' })
  @ApiResponse({
    status: 200,
    description: 'Refresh',
    type: Object,
  })
  @HttpCode(200)
  @Post('refresh-admin')
  async refreshAdminToken(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshAdminToken(refresh_token, res);
  }

  @ApiOperation({ summary: 'Register new User' })
  @ApiResponse({
    status: 201,
    description: 'Registered',
    type: Object,
  })
  @Post('signup-user')
  async signUpUser(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signUpUser(createUserDto, res);
  }

  @ApiOperation({ summary: 'Sign in User' })
  @ApiResponse({
    status: 200,
    description: 'Sign in',
    type: Object,
  })
  @HttpCode(200)
  @Post('signin-user')
  async signInUser(
    @Body() signInUserDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInUser(
      signInUserDto.email,
      signInUserDto.password,
      res,
    );
  }

  @ApiOperation({ summary: 'Sign out User' })
  @ApiResponse({
    status: 200,
    description: 'Sign out',
    type: Object,
  })
  @UseGuards(UserGuard)
  @HttpCode(200)
  @Post('signout-user')
  async signOutUser(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOutUser(refresh_token, res);
  }

  @ApiOperation({ summary: 'Refresh Token User' })
  @ApiResponse({
    status: 200,
    description: 'Refresh',
    type: Object,
  })
  @HttpCode(200)
  @Post('refresh-user')
  async refreshUserToken(
    @CookieGetter('refresh_token') refresh_token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshUserToken(refresh_token, res);
  }
}
