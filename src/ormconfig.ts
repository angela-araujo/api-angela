import { DataSourceOptions } from 'typeorm';
import { Person } from './person/entities/person.entity';
import { Task } from './task/entities/task.entity';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: '.db/database.sqlite3',
  synchronize: true, // Obs: use synchronize: true somente em desenvolvimento.
  entities: [Person, Task],
};
