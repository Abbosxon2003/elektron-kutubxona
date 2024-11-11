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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from './models/category.model';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({
    status: 201,
    description: 'Create a new category',
    type: Category,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Get all category' })
  @ApiResponse({
    status: 200,
    description: 'Get all category',
    type: [Category],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Get an category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get an category by ID',
    type: Category,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update an category by ID',
    type: Category,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(+id, updateCategoryDto);
  }

  @ApiOperation({ summary: 'Delete an category by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete an category by ID',
    type: Category,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.deleteCategory(+id);
  }
}
