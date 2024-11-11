import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreatorGuard } from 'src/common/guards/creator.guard';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Create a Admin' })
  @ApiResponse({
    status: 201,
    description: 'The admin has been successfully created',
    type: Admin,
  })
  @UseGuards(JwtAuthGuard, CreatorGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Retrieve all Admin' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved list of all Admin',
    type: [Admin],
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the Admin',
    type: Admin,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a Admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated the Admin',
    type: Admin,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.updateAdmin(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete a Admin by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted the Admin',
    type: Admin,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.adminService.deleteAdmin(+id);
  }
}

