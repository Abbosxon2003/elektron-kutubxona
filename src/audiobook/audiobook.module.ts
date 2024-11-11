import { Module } from '@nestjs/common';
import { AudiobookService } from './audiobook.service';
import { AudiobookController } from './audiobook.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Audiobook } from './models/audiobook.model';

@Module({
  imports: [ SequelizeModule.forFeature([ Audiobook ])],
  controllers: [AudiobookController],
  providers: [AudiobookService],
})
export class AudiobookModule {}
