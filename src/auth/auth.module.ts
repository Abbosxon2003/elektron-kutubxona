import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    AdminModule,
    JwtModule.register(
      {global: true }),
    MailModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule]
})
export class AuthModule {}
