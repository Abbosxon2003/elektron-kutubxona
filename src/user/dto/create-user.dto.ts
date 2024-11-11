import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 1,
    description: "User's notification ID",
  })
  @IsNumber()
  @IsNotEmpty()
  notificationId: number;

  @ApiProperty({
    example: 'John Doe',
    description: "User's name",
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: "User's email",
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '1234567890',
    description: "User's password",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: '1234567890',
    description: "User's confirm_password",
  })
  @IsString()
  @IsNotEmpty()
  confirm_password: string;

  @ApiProperty({
    example: '$Ard0r11',
    description: 'User hashed password',
  })
  hashed_password: string;

  @ApiProperty({
    example: '+998944414188',
    description: "User's phone number",
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: '#$%^&ertfygRDTFY456',
    description: "User's hashed refresh token",
  })
  @IsString()
  @IsOptional()
  hashed_refresh_token: string;

  @ApiProperty({
    example: 'https://example.com/activation/123456',
    description: "User's activation link",
  })
  @IsString()
  @IsOptional()
  activation_link: string;

  @ApiProperty({
    example: false,
    description: 'Is User active',
  })
  is_active: boolean;
}
