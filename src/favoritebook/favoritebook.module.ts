import { Module } from '@nestjs/common';
import { FavoritebookService } from './favoritebook.service';
import { FavoritebookController } from './favoritebook.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favoritebook } from './models/favoritebook.model';

@Module({
  imports: [ SequelizeModule.forFeature([Favoritebook])],
  controllers: [FavoritebookController],
  providers: [FavoritebookService],
})
export class FavoritebookModule {}
