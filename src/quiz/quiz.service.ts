import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Quiz } from './models/quiz.model';

@Injectable()
export class QuizService {
  constructor(@InjectModel(Quiz) private quizModel: typeof Quiz) {}
  create(createQuizDto: CreateQuizDto) {
    return this.quizModel.create(createQuizDto);
  }

  findAll() {
    return this.quizModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const quiz = await this.quizModel.findByPk(id, {
      include: { all: true },
    });
    if (!quiz) {
      return `Quiz with ${id}-ID was not found.`;
    }
    return quiz;
  }

  async updateQuiz(
    id: number,
    updateQuizDto: UpdateQuizDto,
  ): Promise<Quiz> {
    const quiz = await this.quizModel.findByPk(id);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    await quiz.update(updateQuizDto);
    return quiz;
  }
  async deleteQuiz(id: number): Promise<string> {
    const result = await this.quizModel.destroy({ where: { id } });

    if (result === 0) {
      return `Quiz with ${id}-ID was not found.`;
    }

    return `Quiz with ${id}-ID deleted successfully.`;
  }
}

