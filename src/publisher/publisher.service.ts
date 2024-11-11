import { Injectable } from '@nestjs/common';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Publisher } from './models/publisher.model';

@Injectable()
export class PublishersService {
  constructor(@InjectModel(Publisher) private publisherModel: typeof Publisher) {}
  create(createPublishersDto: CreatePublisherDto) {
    return this.publisherModel.create(createPublishersDto);
  }

  findAll() {
    return this.publisherModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const publisher = await this.publisherModel.findByPk(id, {
      include: { all: true },
    });
    if (!publisher) {
      return `Publishers with ${id}-ID was not found.`;
    }
    return publisher;
  }

  async updatePublishers(
    id: number,
    updatePublishersDto: UpdatePublisherDto,
  ): Promise<Publisher> {
    const publisher = await this.publisherModel.findByPk(id);
    if (!publisher) {
      throw new Error('Publishers not found');
    }
    await publisher.update(updatePublishersDto);
    return publisher;
  }
  async deletePublishers(id: number): Promise<string> {
    const result = await this.publisherModel.destroy({ where: { id } });

    if (result === 0) {
      return `Publishers with ${id}-ID was not found.`;
    }

    return `Publishers with ${id}-ID deleted successfully.`;
  }
}
