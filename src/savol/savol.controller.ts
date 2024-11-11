import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { SavolService } from './savol.service';
import { CreateSavolDto } from './dto/create-savol.dto';
import { UpdateSavolDto } from './dto/update-savol.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Savol } from './models/savol.model';

@ApiTags('Savol')
@Controller('savol')
export class SavolController {
  constructor(private readonly savolService: SavolService) {}

  @ApiOperation({ summary: 'Create a new savol' })
  @ApiResponse({
    status: 201,
    description: 'Create a new savol',
    type: Savol
    ,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createSavolDto: CreateSavolDto) {
    return this.savolService.create(createSavolDto);
  }

  @ApiOperation({ summary: 'Get all savol' })
  @ApiResponse({
    status: 200,
    description: 'Get all savol',
    type: [Savol],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.savolService.findAll();
  }

  @ApiOperation({ summary: 'Get an savol by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get an savol by ID',
    type: Savol,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.savolService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an savol by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update an savol by ID',
    type: Savol,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateSavolDto: UpdateSavolDto,
  ) {
    return this.savolService.updateSavol(+id, updateSavolDto);
  }

  @ApiOperation({ summary: 'Delete an savol by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete an savol by ID',
    type: Savol,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.savolService.deleteSavol(+id);
  }
}