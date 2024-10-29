import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
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
}
