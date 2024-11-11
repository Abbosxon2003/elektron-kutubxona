import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Book } from './models/book.model';


@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Create a Book' })
  @ApiResponse({
    status: 201,
    description: 'The book has been successfully created',
    type: Book,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @ApiOperation({ summary: 'Retrieve all Book' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of all Book',
    type: [Book],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.bookService.findAll();
  }

  @ApiOperation({ summary: 'Get book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the Book',
    type: Book,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a Book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the Book',
    type: Book,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(+id, updateBookDto);
  }

  @ApiOperation({ summary: 'Delete a Book by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the Book',
    type: Book,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.bookService.deleteBook(+id);
  }
}
