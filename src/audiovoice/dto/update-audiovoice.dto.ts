import { PartialType } from '@nestjs/swagger';
import { CreateAudiovoiceDto } from './create-audiovoice.dto';

export class UpdateAudiovoiceDto extends PartialType(CreateAudiovoiceDto) {}
