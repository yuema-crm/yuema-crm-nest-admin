import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function PageDecorator() {
  return applyDecorators(
    ApiQuery({
      name: 'current',
      description: '当前页',
      example: 1,
      required: false,
    }),
    ApiQuery({
      name: 'pageSize',
      description: '每一页数量',
      example: 16,
      required: false,
    }),
    ApiQuery({
      name: 'startDate',
      description: '开始时间',
      example: '2022-11-26',
      required: false,
    }),
    ApiQuery({
      name: 'endDate',
      description: '结束时间',
      example: '2022-11-26',
      required: false,
    }),
  );
}
