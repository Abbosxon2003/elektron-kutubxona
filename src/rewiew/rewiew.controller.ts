import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RewiewsService } from './rewiew.service';
import { CreateRewiewDto } from './dto/create-rewiew.dto';
import { UpdateRewiewDto } from './dto/update-rewiew.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Rewiew } from './models/rewiew.model';

@ApiTags('Rewiew')
@Controller('rewiew')
export class RewiewsController {
  constructor(private readonly rewiewService: RewiewsService) {}

  @ApiOperation({ summary: 'Create a new rewiew' })
  @ApiResponse({
    status: 201,
    description: 'Create a new rewiew',
    type: Rewiew,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createRewiewDto: CreateRewiewDto) {
    return this.rewiewService.create(createRewiewDto);
  }

  @ApiOperation({ summary: 'Get all rewiew' })
  @ApiResponse({
    status: 200,
    description: 'Get all rewiew',
    type: [Rewiew],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.rewiewService.findAll();
  }

  @ApiOperation({ summary: 'Get an rewiew by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get an rewiew by ID',
    type: Rewiew,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rewiewService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an rewiew by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update an rewiew by ID',
    type: Rewiew,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateRewiewDto: UpdateRewiewDto) {
    return this.rewiewService.updateRewiews(+id, updateRewiewDto);
  }

  @ApiOperation({ summary: 'Delete an rewiew by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete an rewiew by ID',
    type: Rewiew,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.rewiewService.deleteRewiews(+id);
  }
}
