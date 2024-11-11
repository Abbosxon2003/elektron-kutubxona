import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { AudiobookService } from './audiobook.service';
import { CreateAudiobookDto } from './dto/create-audiobook.dto';
import { UpdateAudiobookDto } from './dto/update-audiobook.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Audiobook } from './models/audiobook.model';

@ApiTags('Audiobook')
@Controller('audiobook')
export class AudiobookController {
  constructor(private readonly audiobookService: AudiobookService) {}

  @ApiOperation({ summary: 'Create a new audiobook' })
  @ApiResponse({
    status: 201,
    description: 'Create a new audiobook',
    type: Audiobook,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createAudiobookDto: CreateAudiobookDto) {
    return this.audiobookService.create(createAudiobookDto);
  }

  @ApiOperation({ summary: 'Get all audiobook' })
  @ApiResponse({
    status: 200,
    description: 'Get all audiobook',
    type: [Audiobook],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.audiobookService.findAll();
  }

  @ApiOperation({ summary: 'Get an audiobook by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get an audiobook by ID',
    type: Audiobook,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audiobookService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an audiobook by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update an audiobook by ID',
    type: Audiobook,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAudiobookDto: UpdateAudiobookDto) {
    return this.audiobookService.updateAudiobook(+id, updateAudiobookDto);
  }

  @ApiOperation({ summary: 'Delete an audiobook by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete an audiobook by ID',
    type: Audiobook,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.audiobookService.deleteAudiobook(+id);
  }
}
