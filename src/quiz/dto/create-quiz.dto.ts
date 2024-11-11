import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateQuizDto {
    @ApiProperty({
        example: 1,
        description: "Quiz ID",
    })
    @IsNumber()
    @IsNotEmpty()
    savolId: number;

    @ApiProperty({
        example: 1,
        description: "Number of questions",
    })
    @IsNumber()
    soni: number;

    @ApiProperty({
        example: "Question",
        description: "Question",
    })
    @IsString()
    question: string;
}
