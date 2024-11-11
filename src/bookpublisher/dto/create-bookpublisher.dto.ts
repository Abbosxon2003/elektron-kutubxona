import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateBookpublisherDto {
  @ApiProperty({
    example: 1,
    description: 'Book ID',
  })
  @IsNumber()
  @IsNotEmpty()
  bookId: number;

  @ApiProperty({
    example: 1,
    description: 'Publisher ID',
  })
  @IsNumber()
  @IsNotEmpty()
  publisherId: number;

  @ApiProperty({
    example: '2022-01-01',
    description: 'Published year of the book',
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  publishedYear: Date;
}
