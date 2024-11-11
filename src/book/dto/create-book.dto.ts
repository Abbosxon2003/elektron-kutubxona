import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateBookDto {
    @ApiProperty({
        example: 'The Catcher in the Rye',
        description: 'Book Title',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        example: '9780316769484',
        description: 'International Standard Book Number (ISBN)',
    })
    @IsString()
    @IsNotEmpty()
    isbn: string;

    @ApiProperty({
        example: '9780316769484',
        description: 'Book Cover Image URL',
    })
    @IsString()
    @IsNotEmpty()
    images: string;

    @ApiProperty({
        example: 1,
        description: 'Genre id',
    })
    @IsNumber()
    @IsNotEmpty()
    genreId: number;

    @ApiProperty({
        example: 1,
        description: 'Author id',
    })
    @IsNumber()
    @IsNotEmpty()
    authorId: number;

    @ApiProperty({
        example: 1,
        description: 'Category id',
    })
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @ApiProperty({
        example: 1000,
        description: 'Total copies',
    })
    @IsNumber()
    @IsNotEmpty()
    totalCopies: number;

    @ApiProperty({
        example: 100,
        description: 'Available copies',
    })
    @IsNumber()
    @IsNotEmpty()
    availableCopies: number;

    @ApiProperty({
        example: true,
        description: 'True or False',
    })
    @IsBoolean()
    @IsNotEmpty()
    isAudio: boolean;
}
