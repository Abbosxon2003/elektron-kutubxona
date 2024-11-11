import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { CategoryController } from './category.controller';

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
1