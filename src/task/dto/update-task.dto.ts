// import { PartialType } from '@nestjs/mapped-types';
// import { CreateTaskDto } from './create-task.dto';

// export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export interface UpdateTaskDto {
  id: number;
  title: string;
  description: string;
  startAt: Date;
  finishAt: Date;
  deadLine: Date;
}
