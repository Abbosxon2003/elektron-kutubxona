import { Module } from '@nestjs/common';
import { SavolService } from './savol.service';
import { SavolController } from './savol.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Savol } from './models/savol.model';

@Module({
  imports: [SequelizeModule.forFeature([ Savol ])],
  controllers: [SavolController],
  providers: [SavolService],
})
export class SavolModule {}
