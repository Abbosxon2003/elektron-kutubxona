import { PartialType } from '@nestjs/swagger';
import { CreateFavoritebookDto } from './create-favoritebook.dto';

export class UpdateFavoritebookDto extends PartialType(CreateFavoritebookDto) {}
