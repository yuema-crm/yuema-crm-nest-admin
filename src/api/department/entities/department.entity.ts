import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Department {
  @ApiProperty({
    name: 'id',
    description: '部门id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    name: 'status',
    description: '部门名称',
  })
  @Column()
  name: string;

  @ApiProperty({
    name: 'status',
    description: '状态',
  })
  @Column({ length: 2, default: 1 })
  status: string;

  @ApiProperty({
    name: 'parentId',
    description: '父级id',
  })
  @Column({ default: 0 })
  parentId: number;

  @ApiProperty({
    name: 'createdAt',
    description: '创建时间',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    name: 'updatedAt',
    description: '更新时间',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    name: 'deletedAt',
    description: '删除时间',
  })
  @DeleteDateColumn()
  deletedAt: Date;
}
