import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}
  async findOne(params: Partial<User>): Promise<User | null> {
    return this.userModel.findOne({
      rejectOnEmpty: undefined,
      where: { ...params },
    });
  }
  async saveOne(params: Partial<User>): Promise<User | null> {
    const user = await this.userModel.findOne({
      attributes: { include: ['username', 'nickname', 'email', 'gender'] },
      where: {
        [Op.or]: [
          { email: params.email },
          { username: params.username },
          { nickname: params.nickname },
        ],
      },
    });
    if (user) {
      if (user.username === params.email) {
        throw new BadRequestException('该邮箱已存在');
      }
      if (user.username === params.username) {
        throw new BadRequestException('用户名已存在');
      }
      if (user.nickname === params.nickname) {
        throw new BadRequestException('昵称已存在');
      }
    }
    return this.userModel.create({ ...params });
  }
}
