import {
  Column,
  DataType,
  Table,
  Model,
  DeletedAt,
  BeforeCreate,
} from 'sequelize-typescript';
import { Libs } from '../lib';
import { RequestStatus } from '../types/user';

@Table({ tableName: 'tb_friend_request' })
export class FriendRequest extends Model {
  @Column({
    primaryKey: true,
    comment: 'id',
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '发送者的id',
  })
  uid: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '接收者的id',
  })
  to: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '是否接受',
    defaultValue: null,
  })
  status: RequestStatus;

  // @Column({
  //   type: DataType.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false,
  //   comment: '是否被ban',
  // })
  // banned: boolean;

  @DeletedAt
  deletedAt: Date;

  @BeforeCreate
  static addId(instance: FriendRequest) {
    instance.id = Libs.generateId();
  }
}
