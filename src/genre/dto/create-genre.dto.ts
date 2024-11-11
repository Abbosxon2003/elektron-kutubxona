import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateGenreDto {
    @ApiProperty({
        example: "Fiction",
        description: "Genre's name",
    })
    @IsString()
    @IsNotEmpty()
    name: string;
}
