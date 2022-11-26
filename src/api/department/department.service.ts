import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Brackets, Repository } from 'typeorm';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  create(createDepartmentDto: CreateDepartmentDto) {
    return 'This action adds a new department';
  }

  findAll(current = 1, pageSize = 16, name = '', startDate = '', endDate = '') {
    return this.departmentRepository
      .createQueryBuilder()
      .offset((current - 1) * pageSize)
      .limit(pageSize)
      .andWhere(
        new Brackets((q) => {
          if (name) {
            q.where('name like :name', { name: `%${name}%` });
          }
        }),
      )
      .andWhere(
        new Brackets((q) => {
          if (startDate) {
            q.where('createdAt between :startDate and :endDate', {
              startDate,
              endDate: endDate + ' 23:59:59',
            });
          }
        }),
      )
      .getManyAndCount();
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
