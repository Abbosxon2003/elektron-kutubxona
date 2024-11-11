import { PartialType } from '@nestjs/swagger';
import { CreateBookpublisherDto } from './create-bookpublisher.dto';

export class UpdateBookpublisherDto extends PartialType(CreateBookpublisherDto) {}
