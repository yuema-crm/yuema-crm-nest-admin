import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    name: 'username',
    description: '用户名',
    minLength: 2,
    maxLength: 12,
    example: '最爱白菜吖',
  })
  @Length(2, 12, { message: '用户名必须在2-12个字符之间' })
  username: string;
  @ApiProperty({
    name: 'password',
    description: '密码',
    minLength: 6,
    maxLength: 12,
    example: '12345678',
  })
  @Length(6, 12, { message: '密码必须在6-32个字符之间' })
  password: string;
}
