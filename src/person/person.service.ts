import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const newPerson = await this.personRepository.save(createPersonDto);
      return {
        statusCode: 201,
        message: 'Usuário criado com sucesso',
        data: newPerson,
      };
    } catch (error) {
      return {
        statusCode: 409,
        message: 'Erro ao criar pessoa.',
        data: error.driverError,
      };
    }
  }

  findAll() {
    return this.personRepository.find();
  }

  async findOne(id: number) {
    try {
      const onePerson = await this.personRepository.findOneBy({ id: id });
      if (onePerson) {
        return {
          statusCode: 200,
          message: 'Pessoa encontrada',
          data: onePerson,
        };
      } else {
        return {
          statusCode: 200,
          message: 'Nenhuma pessoa encontrada com esse id',
          data: {},
        };
      }
    } catch (error) {
      return {
        statusCode: 409,
        message: 'Id de pessoa inválido',
        data: {
          data: error.driverError,
        },
      };
    }
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    try {
      const updatePersonResult = await this.personRepository.update(
        id,
        updatePersonDto,
      );
      if (updatePersonResult.affected == 1) {
        const updatePerson = await this.personRepository.findOneBy({ id: id });
        return {
          statusCode: 200,
          message: 'Pessoa atualizada com sucesso',
          data: updatePerson,
        };
      }
    } catch (error) {
      return {
        statusCode: 409,
        message: 'Erro ao atualizar pessoa',
        data: error.driverError,
      };
    }
  }

  remove(id: number) {
    return this.personRepository.delete(id);
  }
}
