export class CreateTaskDto {
  id: number;
  title: string;
  description: string;
  startAt: Date;
  finishAt: Date;
  deadLine: Date;
}
