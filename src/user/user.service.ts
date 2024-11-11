import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async activateCustomer(
    link: string,
  ): Promise<{ is_active: boolean; message: string }> {
    const customer = await this.userModel.findOne({
      where: { activation_link: link },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (customer.is_active) {
      throw new BadRequestException('Customer already activated');
    }

    customer.is_active = true;
    await customer.save();

    return {
      is_active: customer.is_active,
      message: 'Customer activated successfully',
    };
  }

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id, {
      include: { all: true },
    });
    if (!user) {
      return `User with ${id}-ID was not found.`;
    }
    return user;
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.update(updateUserDto);
    return user;
  }

  async updateRefreshToken(
    id: number,
    hashed_refresh_token: string,
    activation_link: string,
  ) {
    await this.userModel.update(
      { hashed_refresh_token, activation_link },
      { where: { id }, returning: true },
    );
    return this.userModel.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<string> {
    const result = await this.userModel.destroy({ where: { id } });

    if (result === 0) {
      return `User with ${id}-ID was not found.`;
    }

    return `User with ${id}-ID deleted successfully.`;
  }
}
