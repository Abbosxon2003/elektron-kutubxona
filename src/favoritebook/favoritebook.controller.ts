import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { FavoritebookService } from './favoritebook.service';
import { CreateFavoritebookDto } from './dto/create-favoritebook.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Favoritebook } from './models/favoritebook.model';
import { UpdateFavoritebookDto } from './dto/update-favoritebook.dto';

@ApiTags('Favoritebook')
@Controller('favoritebook')
export class FavoritebookController {
  constructor(private readonly favoritebookService: FavoritebookService) {}

  @ApiOperation({ summary: 'Create a new favoritebook' })
  @ApiResponse({
    status: 201,
    description: 'Create a new favoritebook',
    type: Favoritebook,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createFavoritebookDto: CreateFavoritebookDto) {
    return this.favoritebookService.create(createFavoritebookDto);
  }

  @ApiOperation({ summary: 'Get all favoritebook' })
  @ApiResponse({
    status: 200,
    description: 'Get all favoritebook',
    type: [Favoritebook],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.favoritebookService.findAll();
  }

  @ApiOperation({ summary: 'Get an favoritebook by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get an favoritebook by ID',
    type: Favoritebook,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.favoritebookService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an favoritebook by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update an favoritebook by ID',
    type: Favoritebook,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateFavoritebookDto: UpdateFavoritebookDto) {
    return this.favoritebookService.updateFavoritebook(+id, updateFavoritebookDto);
  }

  @ApiOperation({ summary: 'Delete an favoritebook by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete an favoritebook by ID',
    type: Favoritebook,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.favoritebookService.deleteFavoritebook(+id);
  }
}
