import { Module } from '@nestjs/common';
import { PublishersService } from './publisher.service';
import { PublishersController } from './publisher.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Publisher } from './models/publisher.model';

@Module({
  imports:[SequelizeModule.forFeature([Publisher])],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublisherModule {}
