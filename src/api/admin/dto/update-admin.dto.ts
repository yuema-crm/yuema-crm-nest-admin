import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({
    name: 'username',
    description: '用户名',
    minLength: 2,
    maxLength: 12,
    example: '最爱白菜吖',
  })
  @Length(2, 12, { message: '用户名必须在2-12个字符之间' })
  username: string;
}
