import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from './models/book.model';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book) private bookModel: typeof Book,
  ) {}
  create(createBookDto: CreateBookDto) {
    return this.bookModel.create(createBookDto);
  }

  findAll() {
    return this.bookModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const book = await this.bookModel.findByPk(id, {
      include: { all: true },
    });
    if (!book) {
      return `Book with ${id}-ID was not found.`;
    }
    return book;
  }

  async updateBook(
    id: number,
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const book = await this.bookModel.findByPk(id);
    if (!book) {
      throw new Error('Book not found');
    }
    await book.update(updateBookDto);
    return book;
  }
  async deleteBook(id: number): Promise<string> {
    const result = await this.bookModel.destroy({ where: { id } });

    if (result === 0) {
      return `Book with ${id}-ID was not found.`;
    }

    return `Book with ${id}-ID deleted successfully.`;
  }
}
