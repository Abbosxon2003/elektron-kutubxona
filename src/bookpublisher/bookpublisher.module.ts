import { Module } from '@nestjs/common';
import { BookpublisherService } from './bookpublisher.service';
import { BookpublisherController } from './bookpublisher.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bookpublisher } from './models/bookpublisher.model';

@Module({
  imports:[ SequelizeModule.forFeature([ Bookpublisher ])],
  controllers: [BookpublisherController],
  providers: [BookpublisherService],
})
export class BookpublisherModule {}
