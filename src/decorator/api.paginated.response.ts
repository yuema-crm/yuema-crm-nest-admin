import { Type, applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
export class PaginatedDto {
  @ApiProperty({
    description: '状态：true表示成功；false表示失败',
    type: 'boolean',
    default: true,
  })
  success: boolean;
  @ApiProperty({
    description: '提示信息',
    required: false,
  })
  errorMessage: string;
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                description: '数据',
                items: {
                  allOf: [{ $ref: getSchemaPath(model) }],
                  properties: {
                    createdAt: {
                      type: 'string',
                      description: '创建时间',
                    },
                    updatedAt: {
                      type: 'string',
                      description: '修改时间',
                    },
                  },
                },
              },
              total: {
                type: 'number',
                description: '总数',
              },
              totalPage: {
                type: 'number',
                description: '总页码',
              },
              current: {
                type: 'number',
                description: '当前页码',
              },
              pageSize: {
                type: 'number',
                description: '每页数量',
              },
            },
          },
        ],
      },
    }),
  );
};
