import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    name: 'username',
    description: '用户名',
  })
  @Column()
  username: string;

  @ApiProperty({
    name: 'avatar',
    description: '头像',
    required: false,
  })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({
    name: 'password',
    description: '密码',
    required: false,
  })
  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;
}
