import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async sendMailToUser(user: User) {
    const url = `${process.env.API_URL}:${process.env.PORT}/api/user/activate/${user.activation_link}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Activate your account',
      template: './confirm',
      context: {
        full_name: `${user.full_name}`,
        url,
      },
    });
  }
}
