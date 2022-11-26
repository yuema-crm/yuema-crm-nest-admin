import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    name: 'username',
    description: '用户名',
  })
  username: string;
  @ApiProperty({
    name: 'token',
    description: 'token',
  })
  token: string;
  @ApiProperty({
    name: 'status',
    description: 'status',
  })
  status: string;
  @ApiProperty({
    name: 'type',
    description: '登录类型',
  })
  type: string;
}
