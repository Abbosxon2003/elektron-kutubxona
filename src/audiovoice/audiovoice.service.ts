import { Injectable } from '@nestjs/common';
import { CreateAudiovoiceDto } from './dto/create-audiovoice.dto';
import { UpdateAudiovoiceDto } from './dto/update-audiovoice.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Audiovoice } from './models/audiovoice.model';

@Injectable()
export class AudiovoiceService {
  constructor(@InjectModel(Audiovoice) private audiovoiceModel: typeof Audiovoice) {}
  create(createAudiovoiceDto: CreateAudiovoiceDto) {
    return this.audiovoiceModel.create(createAudiovoiceDto);
  }

  findAll() {
    return this.audiovoiceModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const audiovoice = await this.audiovoiceModel.findByPk(id, {
      include: { all: true },
    });
    if (!audiovoice) {
      return `Audiovoice with ${id}-ID was not found.`;
    }
    return audiovoice;
  }

  async updateAudiovoice(
    id: number,
    updateAudiovoiceDto: UpdateAudiovoiceDto,
  ): Promise<Audiovoice> {
    const audiovoice = await this.audiovoiceModel.findByPk(id);
    if (!audiovoice) {
      throw new Error('Audiovoice not found');
    }
    await audiovoice.update(updateAudiovoiceDto);
    return audiovoice;
  }
  async deleteAudiovoice(id: number): Promise<string> {
    const result = await this.audiovoiceModel.destroy({ where: { id } });

    if (result === 0) {
      return `Audiovoice with ${id}-ID was not found.`;
    }

    return `Audiovoice with ${id}-ID deleted successfully.`;
  }
}
