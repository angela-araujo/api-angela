import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/person/entities/person.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      // const newTask = new Task();
      const taskInProgress = await this.taskRepository.find({
        where: {
          person: {
            id: createTaskDto.personId,
          },
          finishAt: IsNull(),
        },
      });
      console.log('createTaskDto: ', createTaskDto);
      console.log('taskInProgress.length: ', taskInProgress.length);
      if (taskInProgress.length !== 0) {
        return {
          code: 'TASK_IN_PROGRESS',
          message: 'Já existe uma tarefa em progresso',
          status: 409,
        };
      } else {
        return this.taskRepository.save(createTaskDto);
      }
    } catch (error) {
      if (error.code === 409) {
        throw error;
      }
    }
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

  async remove(id: number) {
    try {
      return await this.taskRepository.delete(id);
    } catch (error) {
      console.log(error);
    }
  }
}
