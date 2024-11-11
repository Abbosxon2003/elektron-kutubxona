import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author) private authorsModel: typeof Author) {}
  create(createAuthorsDto: CreateAuthorDto) {
    return this.authorsModel.create(createAuthorsDto);
  }

  findAll() {
    return this.authorsModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const authors = await this.authorsModel.findByPk(id, {
      include: { all: true },
    });
    if (!authors) {
      return `Authors with ${id}-ID was not found.`;
    }
    return authors;
  }

  async updateAuthors(
    id: number,
    updateAuthorsDto: UpdateAuthorDto,
  ): Promise<Author> {
    const authors = await this.authorsModel.findByPk(id);
    if (!authors) {
      throw new Error('Authors not found');
    }
    await authors.update(updateAuthorsDto);
    return authors;
  }
  async deleteAuthors(id: number): Promise<string> {
    const result = await this.authorsModel.destroy({ where: { id } });

    if (result === 0) {
      return `Authors with ${id}-ID was not found.`;
    }

    return `Authors with ${id}-ID deleted successfully.`;
  }
}
