import { Injectable } from '@nestjs/common';
import { CreateAudiobookDto } from './dto/create-audiobook.dto';
import { UpdateAudiobookDto } from './dto/update-audiobook.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Audiobook } from './models/audiobook.model';

@Injectable()
export class AudiobookService {
  constructor(@InjectModel(Audiobook) private audiobookModel: typeof Audiobook) {}
  create(createAudiobookDto: CreateAudiobookDto) {
    return this.audiobookModel.create(createAudiobookDto);
  }

  findAll() {
    return this.audiobookModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const audiobook = await this.audiobookModel.findByPk(id, {
      include: { all: true },
    });
    if (!audiobook) {
      return `Audiobook with ${id}-ID was not found.`;
    }
    return audiobook;
  }

  async updateAudiobook(id: number, updateAudiobookDto: UpdateAudiobookDto,
  ): Promise<Audiobook> {
    const audiobook = await this.audiobookModel.findByPk(id);
    if (!audiobook) {
      throw new Error('Audiobook not found');
    }
    await audiobook.update(updateAudiobookDto);
    return audiobook;
  }
  async deleteAudiobook(id: number): Promise<string> {
    const result = await this.audiobookModel.destroy({ where: { id } });

    if (result === 0) {
      return `Audiobook with ${id}-ID was not found.`;
    }

    return `Audiobook with ${id}-ID deleted successfully.`;
  }
}
