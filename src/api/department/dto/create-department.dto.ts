import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    name: 'name',
    description: '部门名称',
  })
  name: string;
}
