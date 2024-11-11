import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quiz } from './models/quiz.model';

@Module({
  imports: [ SequelizeModule.forFeature([ Quiz ])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
