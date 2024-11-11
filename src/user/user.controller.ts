import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { UserGuard } from 'src/common/guards/user.guard';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'Create a new user',
    type: User,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all user' })
  @ApiResponse({
    status: 200,
    description: 'Get all user',
    type: [User],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get an user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Get an user by ID',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Update an user by ID',
    type: User,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete an user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Delete an user by ID',
    type: User,
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(+id);
  }

  @Get('activate/:link')
  async activateCustomer(@Param('link') link: string) {
    return this.userService.activateCustomer(link);
  }
}
