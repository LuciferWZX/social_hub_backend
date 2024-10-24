import { UserRole } from '../types/user';

export class SignUpDto {
  username: string;
  nickname: string;
  email: string;
  password: string;
  gender?: 0 | 1;
  avatar?: string;
  role?: UserRole;
}
