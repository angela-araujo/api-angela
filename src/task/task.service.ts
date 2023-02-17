import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { equal } from 'assert';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.taskRepository.save(createTaskDto);
  }

  findAll() {
    return this.taskRepository.find({
      relations: {
        person: true,
      },
      select: {
        person: {
          name: true,
        },
      },
      order: {
        finishAt: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.taskRepository.findOneBy({ id: id });
  }

  findByPerson(personId: number) {
    return this.taskRepository.find({
      relations: {
        person: true,
      },
      select: {
        person: {
          name: true,
        },
      },
      where: {
        person: {
          id: personId,
        },
      },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log('updateTaskDto', updateTaskDto);
    return this.taskRepository.update(id, updateTaskDto);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
