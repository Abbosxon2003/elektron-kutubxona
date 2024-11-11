import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({
    example: 'John Doe',
    description: "Author's name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '1989-12-01',
    description: "Author's birth_date",
  })
  @IsString()
  @IsNotEmpty()
  birth_date: Date;

  @ApiProperty({
    example: 'Ali Vai',
    description: "Author's description",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: "Qo'qon ko'chasi",
    description: "Author's address",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: '2024-10-10',
    description: "Author's death_date",
  })
  @IsString()
  @IsNotEmpty()
  death_date: Date;
}
