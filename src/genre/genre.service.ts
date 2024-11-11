import { Injectable } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './models/genre.model';

@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre) private genreModel: typeof Genre) {}
  create(createGenreDto: CreateGenreDto) {
    return this.genreModel.create(createGenreDto);
  }

  findAll() {
    return this.genreModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const genre = await this.genreModel.findByPk(id, {
      include: { all: true },
    });
    if (!genre) {
      return `Genre with ${id}-ID was not found.`;
    }
    return genre;
  }

  async updateGenre(
    id: number,
    updateGenreDto: UpdateGenreDto,
  ): Promise<Genre> {
    const genre = await this.genreModel.findByPk(id);
    if (!genre) {
      throw new Error('Genre not found');
    }
    await genre.update(updateGenreDto);
    return genre;
  }
  async deleteGenre(id: number): Promise<string> {
    const result = await this.genreModel.destroy({ where: { id } });

    if (result === 0) {
      return `Genre with ${id}-ID was not found.`;
    }

    return `Genre with ${id}-ID deleted successfully.`;
  }
}