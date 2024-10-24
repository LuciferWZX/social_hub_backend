import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}
