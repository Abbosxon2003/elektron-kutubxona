import { Injectable } from '@nestjs/common';
import { CreateSavolDto } from './dto/create-savol.dto';
import { UpdateSavolDto } from './dto/update-savol.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Savol } from './models/savol.model';

@Injectable()
export class SavolService {
  constructor(
    @InjectModel(Savol) private savolModel: typeof Savol,
  ) {}
  create(createSavolDto: CreateSavolDto) {
    return this.savolModel.create(createSavolDto);
  }

  findAll() {
    return this.savolModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const savol = await this.savolModel.findByPk(id, {
      include: { all: true },
    });
    if (!savol) {
      return `Savol with ${id}-ID was not found.`;
    }
    return savol;
  }

  async updateSavol(
    id: number,
    updateSavolDto: UpdateSavolDto,
  ): Promise<Savol> {
    const savol = await this.savolModel.findByPk(id);
    if (!savol) {
      throw new Error('Savol not found');
    }
    await savol.update(updateSavolDto);
    return savol;
  }
  async deleteSavol(id: number): Promise<string> {
    const result = await this.savolModel.destroy({ where: { id } });

    if (result === 0) {
      return `Savol with ${id}-ID was not found.`;
    }

    return `Savol with ${id}-ID deleted successfully.`;
  }
}

