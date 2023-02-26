// import { PartialType } from '@nestjs/mapped-types';
// import { CreatePersonDto } from './create-person.dto';

// export class UpdatePersonDto extends PartialType(CreatePersonDto) {}
export class UpdatePersonDto {
  name: string;
  email: string;
}
