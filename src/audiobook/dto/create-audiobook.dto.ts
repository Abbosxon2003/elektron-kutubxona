import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate,  IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateAudiobookDto {
    @ApiProperty({
        example: 1,
        description: "Audiobook's ID",
    })
    @IsNumber()
    @IsNotEmpty()
    bookId: number;

    @ApiProperty({
        example: "Audiobook Title",
        description: "Audiobook's title",
    })
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    duration: Date;

    @ApiProperty({
        example: "audiobook.mp3",
        description: "Audiobook's file path",
    })
    @IsString()
    @IsNotEmpty()
    filePath: string;
}
