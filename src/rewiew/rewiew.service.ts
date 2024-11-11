import { Injectable } from '@nestjs/common';
import { CreateRewiewDto } from './dto/create-rewiew.dto';
import { UpdateRewiewDto } from './dto/update-rewiew.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Rewiew } from './models/rewiew.model';

@Injectable()
export class RewiewsService {
  constructor(@InjectModel(Rewiew) private rewiewModel: typeof Rewiew) {}
  create(createRewiewsDto: CreateRewiewDto) {
    return this.rewiewModel.create(createRewiewsDto);
  }

  findAll() {
    return this.rewiewModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const rewiew = await this.rewiewModel.findByPk(id, {
      include: { all: true },
    });
    if (!rewiew) {
      return `Rewiews with ${id}-ID was not found.`;
    }
    return rewiew;
  }

  async updateRewiews(
    id: number,
    updateRewiewsDto: UpdateRewiewDto,
  ): Promise<Rewiew> {
    const rewiew = await this.rewiewModel.findByPk(id);
    if (!rewiew) {
      throw new Error('Rewiews not found');
    }
    await rewiew.update(updateRewiewsDto);
    return rewiew;
  }
  async deleteRewiews(id: number): Promise<string> {
    const result = await this.rewiewModel.destroy({ where: { id } });

    if (result === 0) {
      return `Rewiews with ${id}-ID was not found.`;
    }

    return `Rewiews with ${id}-ID deleted successfully.`;
  }
}