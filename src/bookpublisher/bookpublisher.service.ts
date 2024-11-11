import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bookpublisher } from './models/bookpublisher.model';
import { CreateBookpublisherDto } from './dto/create-bookpublisher.dto';
import { UpdateBookpublisherDto } from './dto/update-bookpublisher.dto';

@Injectable()
export class BookpublisherService {
  constructor(@InjectModel(Bookpublisher) private bookpublisherModel: typeof Bookpublisher) {}
  create(createBookpublisherDto: CreateBookpublisherDto) {
    return this.bookpublisherModel.create(createBookpublisherDto);
  }

  findAll() {
    return this.bookpublisherModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const bookpublisher = await this.bookpublisherModel.findByPk(id, {
      include: { all: true },
    });
    if (!bookpublisher) {
      return `Bookpublisher with ${id}-ID was not found.`;
    }
    return bookpublisher;
  }

  async updateBookpublisher(id: number, updateBookpublisherDto: UpdateBookpublisherDto): Promise<Bookpublisher> {
    const bookpublisher = await this.bookpublisherModel.findByPk(id);
    if (!bookpublisher) {
      throw new Error('Bookpublisher not found');
    }
    await bookpublisher.update(updateBookpublisherDto);
    return bookpublisher;
  }
  async deleteBookpublisher(id: number): Promise<string> {
    const result = await this.bookpublisherModel.destroy({ where: { id } });

    if (result === 0) {
      return `Bookpublisher with ${id}-ID was not found.`;
    }

    return `Bookpublisher with ${id}-ID deleted successfully.`;
  }
}

