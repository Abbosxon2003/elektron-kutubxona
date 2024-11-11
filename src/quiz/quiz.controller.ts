import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Quiz } from './models/quiz.model';

@ApiTags('Quiz')
@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({
    status: 201,
    description: 'Create a new quiz',
    type: Quiz,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.create(createQuizDto);
  }

  @ApiOperation({ summary: 'Get all quiz' })
  @ApiResponse({
    status: 200,
    description: 'Get all quiz',
    type: [Quiz],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.quizService.findAll();
  }

  @ApiOperation({ summary: 'Get an quiz by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get an quiz by ID',
    type: Quiz,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an quiz by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update an quiz by ID',
    type: Quiz,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.updateQuiz(+id, updateQuizDto);
  }

  @ApiOperation({ summary: 'Delete an quiz by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete an quiz by ID',
    type: Quiz,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.quizService.deleteQuiz(+id);
  }
}