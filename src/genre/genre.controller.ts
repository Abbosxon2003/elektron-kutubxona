import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Genre } from './models/genre.model';

@ApiTags('Genre')
@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({ summary: 'Create a new genre' })
  @ApiResponse({
    status: 201,
    description: 'Create a new genre',
    type: Genre,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @ApiOperation({ summary: 'Get all genre' })
  @ApiResponse({
    status: 200,
    description: 'Get all genre',
    type: [Genre],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.genreService.findAll();
  }

  @ApiOperation({ summary: 'Get an genre by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get an genre by ID',
    type: Genre,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an genre by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update an genre by ID',
    type: Genre,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.updateGenre(+id, updateGenreDto);
  }

  @ApiOperation({ summary: 'Delete an genre by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete an genre by ID',
    type: Genre,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.genreService.deleteGenre(+id);
  }
}