import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto);
  }

  findAll() {
    return this.categoryModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id, {
      include: { all: true },
    });
    if (!category) {
      return `Category with ${id}-ID was not found.`;
    }
    return category;
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryModel.findByPk(id);
    if (!category) {
      throw new Error('Category not found');
    }
    await category.update(updateCategoryDto);
    return category;
  }
  async deleteCategory(id: number): Promise<string> {
    const result = await this.categoryModel.destroy({ where: { id } });

    if (result === 0) {
      return `Category with ${id}-ID was not found.`;
    }

    return `Category with ${id}-ID deleted successfully.`;
  }
}
