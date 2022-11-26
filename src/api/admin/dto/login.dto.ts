import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
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
  @ApiProperty({
    name: 'type',
    description: '登录类型',
    enum: ['account', 'mobile'],
  })
  @Length(6, 12, { message: '登录类型' })
  type: string;
  @ApiProperty({
    name: 'cacheKey',
    description: '用于校验验证码的key',
    minLength: 6,
    maxLength: 12,
    example: '123456',
  })
  @IsNotEmpty({ message: 'cacheKey不可以为空' })
  cacheKey: string;
  @ApiProperty({
    name: 'captcha',
    description: '验证码',
    minLength: 6,
    maxLength: 12,
    example: '123456',
  })
  @IsNotEmpty({ message: '验证码不可以为空' })
  captcha: string;
}
