import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateNotificationDto {
  @ApiProperty({
    example: 'New book added',
    description: 'The title of the notification',
  })
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({
    example: 'Author XYZ added a new book',
    description: 'The content of the notification',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
   
  @ApiProperty({
    example: '2022-01-01T12:00:00.000Z',
    description: 'The creation date of the notification',
  })
  @IsString()
  @IsOptional()
  createdAt: Date;
}
