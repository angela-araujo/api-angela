export interface CreateTaskDto {
  title: string;
  description?: string;
  startAt: Date;
  deadLine: Date;
  personId?: number;
}
