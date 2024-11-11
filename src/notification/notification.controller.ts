import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { NotificationService} from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Notification } from './models/notification.model';

@ApiTags("Notification")
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({summary: "Create a new author"})
  @ApiResponse({
    status: 201,
    description: "Create a new author",
    type: Notification,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post("create")
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @ApiOperation({summary: "Get all notification"})
  @ApiResponse({
    status: 200,
    description: "Get all notification",
    type: [Notification],
  })
  @HttpCode(HttpStatus.OK)
  @Get("all")
  findAll() {
    return this.notificationService.findAll();
  }

  @ApiOperation({summary: "Get an author by ID"})
  @ApiResponse({
    status: 200,
    description: "Get an author by ID",
    type: Notification,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @ApiOperation({summary: "Update an author by ID"})
  @ApiResponse({
    status: 200,
    description: "Update an author by ID",
    type: Notification,
  })
  @HttpCode(HttpStatus.OK)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.updateNotification(+id, updateNotificationDto);
  }

  @ApiOperation({summary: "Delete an author by ID"})
  @ApiResponse({
    status: 200,
    description: "Delete an author by ID",
    type: Notification,
  })
  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.notificationService.deleteNotification(+id);
  }
}
