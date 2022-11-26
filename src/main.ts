import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PaginatedDto } from './decorator/api.paginated.response';
import { ResponseMapDto } from './decorator/api.map.response';
import { HttpExceptionFilter } from './execption/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'express';
import { ResponseArrayDto } from './decorator/api.array.response';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(json({ limit: '100mb' }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('武汉跃码教育--中台系统项目实战API文档')
    .setDescription(
      'nest(nodejs)+mysql开发的后台管理系统 [最爱白菜吖](https://space.bilibili.com/388985971)',
    )
    .setContact('最爱白菜吖', '', '1355081829@qq.com')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PaginatedDto, ResponseMapDto, ResponseArrayDto],
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
