import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateAudiovoiceDto {
  @ApiProperty({
    example: 1,
    description: "Audiobook ID",
  })
  @IsNumber()
  @IsNotEmpty()
  audiobookId: number;

  @ApiProperty({
    example: "Voice 1",
    description: "Voice Name",
  })
  @IsString()
  @IsNotEmpty()
  voiceName: string;
}
