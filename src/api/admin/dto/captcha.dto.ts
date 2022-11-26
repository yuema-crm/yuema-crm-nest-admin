import { ApiProperty } from '@nestjs/swagger';

export class Captcha {
  @ApiProperty({
    name: 'cacheKey',
    description: '验证码的key',
  })
  cacheKey: string;
  @ApiProperty({
    name: 'captcha',
    description: '验证码，base64内容',
  })
  captcha: string;
}
