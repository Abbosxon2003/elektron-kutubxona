import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AudiovoiceService } from './audiovoice.service';
import { CreateAudiovoiceDto } from './dto/create-audiovoice.dto';
import { UpdateAudiovoiceDto } from './dto/update-audiovoice.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Audiovoice } from './models/audiovoice.model';

@ApiTags('Audiovoice')
@Controller('audiovoice')
export class AudiovoiceController {
  constructor(private readonly audiovoiceService: AudiovoiceService) {}

  @ApiOperation({ summary: 'Create a new audiovoice' })
  @ApiResponse({
    status: 201,
    description: 'Create a new audiovoice',
    type: Audiovoice,
  })                                                                                   

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createAudiovoiceDto: CreateAudiovoiceDto) {
    return this.audiovoiceService.create(createAudiovoiceDto);
  }

  @ApiOperation({ summary: 'Get all audiovoice' })
  @ApiResponse({
    status: 200,
    description: 'Get all audiovoice',
    type: [Audiovoice],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.audiovoiceService.findAll();
  }

  @ApiOperation({ summary: 'Get an audiovoice by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get an audiovoice by ID',
    type: Audiovoice,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.audiovoiceService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an audiovoice by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update an audiovoice by ID',
    type: Audiovoice,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAudiovoiceDto: UpdateAudiovoiceDto) {
    return this.audiovoiceService.updateAudiovoice(+id, updateAudiovoiceDto);
  }

  @ApiOperation({ summary: 'Delete an audiovoice by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete an audiovoice by ID',
    type: Audiovoice,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.audiovoiceService.deleteAudiovoice(+id);
  }
}
