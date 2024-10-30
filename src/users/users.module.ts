import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user';
import { UsersController } from './users.controller';
import { FriendRequest } from '../models/friend_request';

@Module({
  imports: [SequelizeModule.forFeature([User, FriendRequest])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}
