import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsString } from "class-validator";



export class CreatePublisherDto {
  @ApiProperty({
    example: "Pearson",
    description: "Publisher's name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Pearson Inc.",
    description: "Publisher's address",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: "123-456-7890",
    description: "Publisher's phone number",
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
