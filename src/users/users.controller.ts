import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('search')
  search(@Request() req, @Body() params: { exact: string }) {
    return this.usersService.searchOne(req.user.id, params.exact);
  }
  @HttpCode(HttpStatus.OK)
  @Post('/friend/request')
  async request(@Request() req, @Body() params: { friendId: string }) {
    const uid = req.user.id;
    await this.usersService.friendRequest(uid, params.friendId);
    return null;
  }
  @HttpCode(HttpStatus.OK)
  @Get('/:uid')
  getUserInfo(@Param('uid') uid: string) {
    return this.usersService.getUserSimple(uid);
  }
  @HttpCode(HttpStatus.OK)
  @Get('/friend/request/list')
  getRequestList(@Request() req) {
    const uid = req.user.id;
    return this.usersService.getRequestList(uid);
  }
}
