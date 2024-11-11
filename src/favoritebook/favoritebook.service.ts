import { Injectable } from '@nestjs/common';
import { CreateFavoritebookDto } from './dto/create-favoritebook.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Favoritebook } from './models/favoritebook.model';
import { UpdateFavoritebookDto } from './dto/update-favoritebook.dto';

@Injectable()
export class FavoritebookService {
  constructor(@InjectModel(Favoritebook) private favoritebookModel: typeof Favoritebook) {}
  create(createFavoritebookDto: CreateFavoritebookDto) {
    return this.favoritebookModel.create(createFavoritebookDto);
  }

  findAll() {
    return this.favoritebookModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const favoritebook = await this.favoritebookModel.findByPk(id, {
      include: { all: true },
    });
    if (!favoritebook) {
      return `Favoritebook with ${id}-ID was not found.`;
    }
    return favoritebook;
  }

  async updateFavoritebook(id: number, updateFavoritebookDto: UpdateFavoritebookDto): Promise<Favoritebook> {
    const favoritebook = await this.favoritebookModel.findByPk(id);
    if (!favoritebook) {
      throw new Error('Favoritebook not found');
    }
    await favoritebook.update(updateFavoritebookDto);
    return favoritebook;
  }
  async deleteFavoritebook(id: number): Promise<string> {
    const result = await this.favoritebookModel.destroy({ where: { id } });

    if (result === 0) {
      return `Favoritebook with ${id}-ID was not found.`;
    }

    return `Favoritebook with ${id}-ID deleted successfully.`;
  }
}
