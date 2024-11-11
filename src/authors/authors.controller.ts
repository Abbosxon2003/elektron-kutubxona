import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Author } from './models/author.model';

@ApiTags("Author")
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({summary: "Create a new author"})
  @ApiResponse({
    status: 201,
    description: "Create a new author",
    type: Author,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("create")
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @ApiOperation({summary: "Get all authors"})
  @ApiResponse({
    status: 200,
    description: "Get all authors",
    type: [Author],
  })
  @HttpCode(HttpStatus.OK)
  @Get("all")
  findAll() {
    return this.authorsService.findAll();
  }

  @ApiOperation({summary: "Get an author by ID"})
  @ApiResponse({
    status: 200,
    description: "Get an author by ID",
    type: Author,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @ApiOperation({summary: "Update an author by ID"})
  @ApiResponse({
    status: 200,
    description: "Update an author by ID",
    type: Author,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.updateAuthors(+id, updateAuthorDto);
  }

  @ApiOperation({summary: "Delete an author by ID"})
  @ApiResponse({
    status: 200,
    description: "Delete an author by ID",
    type: Author,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.authorsService.deleteAuthors(+id);
  }
}
