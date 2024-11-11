import { Module } from '@nestjs/common';
import { AudiovoiceService } from './audiovoice.service';
import { AudiovoiceController } from './audiovoice.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Audiovoice } from './models/audiovoice.model';

@Module({
  imports: [ SequelizeModule.forFeature([ Audiovoice])],
  controllers: [AudiovoiceController],
  providers: [AudiovoiceService],
})
export class AudiovoiceModule {}
