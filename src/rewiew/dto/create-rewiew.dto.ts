import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateRewiewDto {

    @ApiProperty({
        example: 1,
        description: "Book ID",
    })
    @IsNumber()
    @IsNotEmpty()
    bookId: number;
    
    @ApiProperty({
        example: 1,
        description: "User ID",
    })
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({
        example: 4,
        description: "Rating (1-5)",
    })
    @IsNumber()
    rating: number;

    @ApiProperty({
        example: "I love this book!",
        description: "Review text",
    })
    @IsString()
    rewiewText: string;

    @ApiProperty({
        example:"2022-01-01T12:00:00.000",
        description: "Review date",
    })
    @IsString()
    @IsOptional()
    rewiewAt: Date;
}
