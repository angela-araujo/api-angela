import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
      console.log('service create:', createTaskDto);

      if (createTaskDto.personId !== null) {
        const taskInProgress = await this.taskRepository.find({
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
              id: createTaskDto.personId,
            },
            finishAt: IsNull(),
          },
        });

        if (taskInProgress.length !== 0) {
          throw new NotFoundException({
            code: 'TASK_IN_PROGRESS',
            message: 'Já existe uma tarefa em progresso',
            status: 404,
          });
        }
      }
      return this.taskRepository.save(createTaskDto);
    } catch (error) {
      console.log('erro ao criar tarefa: ', error);
      if (error.code === 404) {
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

  async findOne(id: number) {
    return await this.taskRepository.findOneBy({ id: id });
  }

  async findByPerson(personId: number) {
    return await this.taskRepository.find({
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

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    console.log('updateTaskDto', updateTaskDto);
    const result = await this.taskRepository.update(id, updateTaskDto);
    if (result.affected == 1) {
      const taskEdited = await this.taskRepository.find({
        where: { id: id },
        relations: {
          person: true,
        },
        select: {
          person: {
            name: true,
          },
        },
      });
      return taskEdited[0];
    } else {
      return {};
    }
  }

  async remove(id: number) {
    try {
      const deletedTask = await this.taskRepository.delete(id);
      console.log('deleteTask: ', deletedTask);

      return deletedTask;
    } catch (error) {
      console.log(error);
    }
  }
}
