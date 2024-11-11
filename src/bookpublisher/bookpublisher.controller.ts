import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBookpublisherDto } from './dto/create-bookpublisher.dto';
import { UpdateBookpublisherDto } from './dto/update-bookpublisher.dto';
import { BookpublisherService } from './bookpublisher.service';
import { Bookpublisher } from './models/bookpublisher.model';

@ApiTags('Bookpublisher')
@Controller('bookpublisher')
export class BookpublisherController {
  constructor(private readonly bookpublisherService: BookpublisherService) {}

  @ApiOperation({ summary: 'Create a new bookpublisher' })
  @ApiResponse({
    status: 201,
    description: 'Create a new bookpublisher',
    type: Bookpublisher,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createBookpublisherDto: CreateBookpublisherDto) {
    return this.bookpublisherService.create(createBookpublisherDto);
  }

  @ApiOperation({ summary: 'Get all bookpublisher' })
  @ApiResponse({
    status: 200,
    description: 'Get all bookpublisher',
    type: [Bookpublisher],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.bookpublisherService.findAll();
  }

  @ApiOperation({ summary: 'Get an bookpublisher by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get an bookpublisher by ID',
    type: Bookpublisher,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookpublisherService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an bookpublisher by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update an bookpublisher by ID',
    type: Bookpublisher,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBookpublisherDto: UpdateBookpublisherDto) {
    return this.bookpublisherService.updateBookpublisher(+id, updateBookpublisherDto);
  }

  @ApiOperation({ summary: 'Delete an bookpublisher by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete an bookpublisher by ID',
    type: Bookpublisher,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.bookpublisherService.deleteBookpublisher(+id);
  }
}
