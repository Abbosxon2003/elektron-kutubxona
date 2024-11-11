import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";


export class CreateSavolDto {
  @ApiProperty({
    example: 1,
    description: "Book ID",
  })
  @IsNumber()
  @IsNotEmpty()
  bookId: number;
}
