import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModule } from './person/person.module';
import { TaskModule } from './task/task.module';
import { config } from './ormconfig';

@Module({
  imports: [PersonModule, TaskModule, TypeOrmModule.forRoot(config)],
  controllers: [],
  providers: [],
})
export class AppModule {}
