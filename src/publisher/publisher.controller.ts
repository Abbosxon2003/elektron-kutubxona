import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import {  PublishersService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Publisher } from './models/publisher.model';

@ApiTags('Publisher')
@Controller('publisher')
export class PublishersController {
  constructor(private readonly publisherService: PublishersService) {}

  @ApiOperation({ summary: 'Create a new publisher' })
  @ApiResponse({
    status: 201,
    description: 'Create a new publisher',
    type: Publisher,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publisherService.create(createPublisherDto);
  }

  @ApiOperation({ summary: 'Get all publisher' })
  @ApiResponse({
    status: 200,
    description: 'Get all publisher',
    type: [Publisher],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.publisherService.findAll();
  }

  @ApiOperation({ summary: 'Get an publisher by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get an publisher by ID',
    type: Publisher,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publisherService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an publisher by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update an publisher by ID',
    type: Publisher,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePublisherDto: UpdatePublisherDto) {
    return this.publisherService.updatePublishers(+id, updatePublisherDto);
  }

  @ApiOperation({ summary: 'Delete an publisher by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete an publisher by ID',
    type: Publisher,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.publisherService.deletePublishers(+id);
  }
}
