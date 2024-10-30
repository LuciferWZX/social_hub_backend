export enum UserRole {
  user = 'user',
  admin = 'admin',
  super_admin = 'superAdmin',
  system = 'system',
}
export interface IUser {
  id: string;
  username: string;
  nickname: string;
  email: string;
  gender: 0 | 1 | null;
  avatar: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  deletedAt: Date;
  iat?: number;
  exp?: number;
}
export enum RequestStatus {
  accept = 'accept',
  reject = 'reject',
}
