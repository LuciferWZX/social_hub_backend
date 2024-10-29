import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../models/user';
import { UsersController } from './users.controller';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}
