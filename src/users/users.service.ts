import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FriendRequest } from '../models/friend_request';
import { RequestStatus } from '../types/user';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    @InjectModel(FriendRequest)
    private friendRequestModel: typeof FriendRequest,
  ) {}
  async findOne(params: Partial<User>): Promise<User | null> {
    return this.userModel.findOne({
      rejectOnEmpty: undefined,
      where: { ...params },
    });
  }
  async getUserSimple(uid: string) {
    return this.userModel.findOne({
      rejectOnEmpty: undefined,
      attributes: [
        'id',
        'username',
        'nickname',
        'email',
        'gender',
        'avatar',
        'banned',
      ],
      where: {
        id: uid,
      },
    });
  }
  async searchOne(uid: string, exact: string) {
    return await this.userModel.findOne({
      attributes: { exclude: ['password'] },
      where: {
        [Op.and]: [
          { [Op.or]: [{ email: exact }, { username: exact }] },
          { id: { [Op.not]: uid } },
        ],
      },
    });
  }
  async getFriends(uid: string) {
    const friendsRecord = await this.friendRequestModel.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [{ uid: uid }, { to: uid }],
          },
          { status: RequestStatus.accept },
        ],
      },
    });
    const friendIds = friendsRecord.map((fr) => {
      if (fr.uid === uid) {
        return fr.to;
      }
      return fr.uid;
    });
    return await this.userModel.findAll({
      attributes: { exclude: ['password'] },
      where: {
        id: friendIds,
      },
    });
  }
  async friendRequest(uid: string, fid: string) {
    const record = await this.friendRequestModel.findOne({
      where: {
        [Op.or]: [
          { uid: uid, to: fid, status: null },
          { uid: fid, to: uid, status: null },
        ],
      },
    });
    if (record) {
      if (record.uid === uid) {
        throw new BadRequestException('您已发送好友请求，请勿重复发送');
      }
      if (record.to === uid) {
        throw new BadRequestException('对方已向您发送好友请求，请勿重复发送');
      }
    }
    return await this.friendRequestModel.create({
      uid: uid,
      to: fid,
    });
  }
  async handleFriendRequest(id: string, uid: string, type: RequestStatus) {
    const record = await this.friendRequestModel.update(
      {
        status: type,
      },
      {
        returning: undefined,
        where: {
          id: id,
          to: uid,
        },
      },
    );
    return null;
  }
  async getRequestList(uid: string) {
    return await this.friendRequestModel.findAll({
      where: {
        [Op.or]: [{ uid: uid }, { to: uid }],
      },
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
