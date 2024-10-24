import {
  Column,
  DataType,
  Table,
  Model,
  DeletedAt,
  BeforeCreate,
} from 'sequelize-typescript';
import { Libs } from '../lib';
import { UserRole } from '../types/user';

@Table({ tableName: 'tb_user' })
export class User extends Model {
  @Column({
    primaryKey: true,
    comment: '用户id',
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名',
  })
  username: string;
  @Column(DataType.STRING)
  password: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    comment: '用户邮箱',
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    comment: '用户昵称',
  })
  nickname: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    comment: '用户头像',
    defaultValue: null,
  })
  avatar: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: '角色类型',
    defaultValue: UserRole.user,
  })
  role: UserRole;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否被ban',
  })
  banned: boolean;
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    comment: '性别',
  })
  gender: 0 | 1 | null;
  @DeletedAt
  deletedAt: Date;

  @BeforeCreate
  static addId(instance: User) {
    instance.id = Libs.generateId();
  }
}
