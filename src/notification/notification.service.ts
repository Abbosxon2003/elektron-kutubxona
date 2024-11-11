import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './models/notification.model';

@Injectable()
export class NotificationService {
  constructor(@InjectModel(Notification) private notificationModel: typeof Notification) {}
  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationModel.create(createNotificationDto);
  }

  findAll() {
    return this.notificationModel.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const notification = await this.notificationModel.findByPk(id, {
      include: { all: true },
    });
    if (!notification) {
      return `Notification with ${id}-ID was not found.`;
    }
    return notification;
  }

  async updateNotification(
    id: number,
    updateNotificationDto: UpdateNotificationDto,
  ): Promise<Notification> {
    const notification = await this.notificationModel.findByPk(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    await notification.update(updateNotificationDto);
    return notification;
  }
  async deleteNotification(id: number): Promise<string> {
    const result = await this.notificationModel.destroy({ where: { id } });

    if (result === 0) {
      return `Notification with ${id}-ID was not found.`;
    }

    return `Notification with ${id}-ID deleted successfully.`;
  }
}


