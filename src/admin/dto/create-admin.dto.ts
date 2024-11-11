import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'Sardor',
    description: 'Admin Name',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: 'sardor@gmail.com',
    description: 'Admin email',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John_doe7781',
    description: 'Password of the admin',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '+995555555555',
    description: 'Admin phone number',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: 'John_doe7781',
    description: 'Confirm password of the admin',
  })
  confirm_password: string;

  @ApiProperty({
    example: 'admin',
    description: 'Admin role',
  })
  role: string;

  @ApiProperty({
    example: true,
    description: 'Is the admin active?',
  })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @ApiProperty({
    example: false,
    description: 'Is the admin creator?',
  })
  @IsBoolean()
  @IsOptional()
  is_creator: boolean;

  @ApiProperty({
    example: '$Ard0r11',
    description: 'Admin password',
  })
  @IsString()
  @IsOptional()
  hashed_password: string;

  @ApiProperty({
    example: 'jsgadjgddhljaljdjq',
    description: 'Admin hashed refresh token',
  })
  @IsString()
  @IsOptional()
  hashed_refresh_token: string;
}
