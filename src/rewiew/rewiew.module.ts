import { Module } from '@nestjs/common';
import { RewiewsService } from './rewiew.service';
import { RewiewsController } from './rewiew.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rewiew } from './models/rewiew.model';

@Module({
  imports:[SequelizeModule.forFeature([Rewiew])],
  controllers: [RewiewsController],
  providers: [RewiewsService],
})
export class RewiewModule {}
