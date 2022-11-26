import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger';
import { error, success } from '../../utils/response';
import { ApiMapResponse } from 'src/decorator/api.map.response';
import { Admin } from './entities/admin.entity';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Public } from '../../decorator/public.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { Captcha } from './dto/captcha.dto';
import { create } from 'svg-captcha';
import { Cache } from 'cache-manager';
import { randomStr } from '../../utils/randomStr';
@ApiTags('admin')
@ApiExtraModels(Admin, LoginResponseDto, Captcha)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @ApiOperation({
    operationId: 'login',
    summary: '登录',
  })
  @ApiMapResponse(LoginResponseDto)
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const captcha = await this.cacheManager.get(loginDto.cacheKey);
    await this.cacheManager.del(loginDto.cacheKey);
    if (captcha !== loginDto.captcha) {
      return error('验证码错误');
    }
    const admin = await this.adminService.findByName(loginDto.username);
    if (admin === null) {
      return error('用户不存在');
    }
    const password = crypto
      .createHash('md5')
      .update(loginDto.password + admin.salt)
      .digest('hex');
    if (admin.password !== password) {
      return error('密码错误');
    }
    return success({
      status: 'ok',
      type: 'account',
      currentAuthority: 'admin',
      username: admin.username,
      token: this.jwtService.sign({ ...admin }, { secret: '12345678' }),
    });
  }

  @ApiOperation({
    summary: '获得验证码',
    operationId: 'getCaptcha',
  })
  @ApiMapResponse(Captcha)
  @Public()
  @Get('captcha')
  async captcha() {
    const { text, data } = create({
      //可配置返回的图片信息
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: 'white', //背景颜色
    });
    const cacheKey = randomStr(6);
    console.log(text);
    await this.cacheManager.set(cacheKey, text, 300 * 1000);
    return success({
      cacheKey,
      captcha:
        'data:image/svg+xml;base64, ' + Buffer.from(data).toString('base64'),
    });
  }
  @ApiOperation({
    operationId: 'currentUser',
    summary: '登录的当前用户',
  })
  @ApiMapResponse(Admin)
  @Get('current/user')
  currentUser() {
    return {
      data: {
        name: 'yuema-crm',
        avatar:
          'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'antdesign@alipay.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          { key: '0', label: '很有想法的' },
          { key: '1', label: '专注设计' },
          { key: '2', label: '辣~' },
          { key: '3', label: '大长腿' },
          { key: '4', label: '川妹子' },
          { key: '5', label: '海纳百川' },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        geographic: {
          province: { label: '浙江省', key: '330000' },
          city: { label: '杭州市', key: '330100' },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      },
    };
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({
    operationId: 'outLogin',
    summary: '退出',
  })
  @Post('outLogin')
  outLogin() {
    return { success: true };
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
