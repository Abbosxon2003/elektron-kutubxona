import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateCategoryDto {
    @ApiProperty({
        example: "Fiction",
        description: "Category's name",
    })
    @IsString()
    @IsNotEmpty()   
    name: string;
}
