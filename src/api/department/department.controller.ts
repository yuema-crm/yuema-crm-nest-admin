import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PageDecorator } from '../../decorator/page.decorator';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '../../decorator/api.paginated.response';
import { Department } from './entities/department.entity';
import { error, pagination, success } from '../../utils/response';
import { ApiMapResponse } from '../../decorator/api.map.response';

@ApiTags('department')
@ApiExtraModels(Department)
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @ApiOperation({
    summary: '部门列表',
    operationId: 'getDepartmentList',
  })
  @ApiPaginatedResponse(Department)
  @PageDecorator()
  @Get()
  async findAll(
    @Query('current', new DefaultValuePipe(1), ParseIntPipe)
    current: number,
    @Query('pageSize', new DefaultValuePipe(16), ParseIntPipe)
    pageSize: number,
    @Query('name', new DefaultValuePipe('')) name: string,
    @Query('startDate', new DefaultValuePipe('')) startDate: string,
    @Query('endDate', new DefaultValuePipe('')) endDate: string,
  ) {
    const [list, total] = await this.departmentService.findAll(
      current,
      pageSize,
      name,
      startDate,
      endDate,
    );
    return pagination(list, total, current, pageSize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentService.update(+id, updateDepartmentDto);
  }

  @ApiOperation({
    summary: '删除部门',
    operationId: 'deleteDepartment',
  })
  @ApiMapResponse()
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const department = await this.departmentService.findOne(id);
    if (department === null) {
      return error('部门不存在');
    }
    const { affected } = await this.departmentService.remove(+id);
    if (affected) {
      return success();
    }
    return error('删除失败');
  }
}
