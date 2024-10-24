import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dtos/signUp.dto';
import { IUser } from '../types/user';
import { User } from '../models/user';
import { WuKongService } from '../wukongim/service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private wuKongService: WuKongService,
  ) {}
  async signIn(
    username: string,
    pass: string,
  ): Promise<(IUser & { access_token: string }) | null> {
    const user = await this.userService.findOne({
      username: username,
    });
    if (!user) {
      throw new BadRequestException('该用户不存在');
    }
    if (user.password !== pass) {
      throw new BadRequestException('密码不正确');
    }
    const { password, ...restUser } = user.dataValues as User;
    const payload = { ...restUser };
    const token = await this.jwtService.signAsync(payload);
    //注册到悟空
    await this.wuKongService.token({
      uid: user.id,
      token: token,
      device_flag: 1,
      device_level: 1,
    });
    return {
      ...(restUser as IUser),
      access_token: token,
    };
  }
  async signUp(signUpDto: SignUpDto) {
    return this.userService.saveOne(signUpDto);
  }
}
