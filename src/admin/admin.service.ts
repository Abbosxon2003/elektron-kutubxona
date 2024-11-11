import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private adminModel: typeof Admin) {}

  async create(createAdminDto: CreateAdminDto) {
    return this.adminModel.create({
      ...createAdminDto,
      hashed_password: createAdminDto.password,
    });
  }

  async findAll() {
    return this.adminModel.findAll();
  }

  async findOne(id: number) {
    return this.adminModel.findByPk(id);
  }

  async findByEmail(email: string) {
    return await this.adminModel.findOne({ where: { email } });
  }

  async updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    if (updateAdminDto.password && updateAdminDto.confirm_password) {
      if (updateAdminDto.password !== updateAdminDto.confirm_password) {
        throw new BadRequestException('Parrollar mos emas');
      }
      const hashed_password = await bcrypt.hash(updateAdminDto.password, 7);
      
      const hashedadmin = await this.adminModel.update(
        { ...updateAdminDto, hashed_password },
        { where: { id }, returning: true },
      );
      return hashedadmin[1][0];
    }
    const admin = await this.adminModel.update(
      { ...updateAdminDto },
      { where: { id }, returning: true },
    );
    return admin[1][0];
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    return this.adminModel.update(
      { hashed_refresh_token },
      { where: { id }, returning: true },
    );
  }
  
  async deleteAdmin(id: number): Promise<string> {
    const result = await this.adminModel.destroy({ where: { id } });

    if (result === 0) {
      return `AdminStatus with ID ${id} was not found.`;
    }

    return `AdminStatus with ID ${id} deleted successfully.`;
  }
}
