import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFavoritebookDto {
  @ApiProperty({
    example: 1,
    description: 'Book ID',
  })
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: '2022-01-01T12:00:00.000',
    description: 'Date when book was added to favorites',
  })
  @IsString()
  @IsOptional()
  addedAt: Date;
}
