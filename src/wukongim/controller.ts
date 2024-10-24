import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { WuKongService } from './service';
import { Public } from '../auth/decorator';
import { UsersService } from '../users/users.service';

@Controller('wuKong')
export class WuKongController {
  constructor(
    // @Inject(EventEmitter2)
    // private readonly eventEmitterService: EventEmitter2,
    private wuKongService: WuKongService,
    private usersService: UsersService,
  ) {}

  @Get('ip')
  @HttpCode(HttpStatus.OK)
  getIPList(@Query('uid') uid: string) {
    return this.wuKongService.getWuKongAddress(uid);
  }

  @Public()
  @Post('wukong-webhook')
  @HttpCode(200)
  webhook(
    @Query('event')
    event: any,
    @Body() data: any,
  ) {
    console.log('hook:', event, data);
    if (event === 'user.onlinestatus') {
      console.log('在线:', data);
      // this.userService.updateOnline(data);
      // const sseEventData: SSEEventData = {
      //   type: 'online',
      //   data: data,
      // };
      // this.eventEmitterService.emit('CUSTOM_MESSAGE', sseEventData);
    }
    return null;
  }
}
