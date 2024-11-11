import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'login',
    description: 'Admin login',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()  
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Admin password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
