import { PartialType } from '@nestjs/swagger';
import { CreateSavolDto } from './create-savol.dto';

export class UpdateSavolDto extends PartialType(CreateSavolDto) {}
