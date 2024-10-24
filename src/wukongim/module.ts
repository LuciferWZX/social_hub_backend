import { Module } from '@nestjs/common';
import { WuKongService } from './service';
import { WuKongController } from './controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [UsersModule],
  providers: [WuKongService, UsersService],
  controllers: [WuKongController],
  exports: [WuKongService],
})
export class WuKongModule {}
