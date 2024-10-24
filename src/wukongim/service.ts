import { Injectable, OnModuleInit } from '@nestjs/common';
import request from 'umi-request';

/**
 * @todo 这里面的方法直接从WKSDK获取的，真实的是需要替换成自己数据库里面的数据
 */
@Injectable()
export class WuKongService implements OnModuleInit {
  constructor() {}
  async onModuleInit(): Promise<void> {
    // const res = await this.token({
    //   uid: 'system',
    //   token: 'system',
    //   device_flag: 1,
    //   device_level: 1,
    // });
    // if (res.status === 200) {
    //   console.info('系统账号注册成功');
    // }
  }
  async token(params: {
    uid: string; // 通信的用户唯一ID，可以随机uuid （建议自己服务端的用户唯一uid） （WuKongIMSDK需要）
    token: string; // 校验的token，随机uuid（建议使用自己服务端的用户的token）（WuKongIMSDK需要）
    device_flag: 0 | 1; // 设备标识  0.app 1.web （相同用户相同设备标记的主设备登录会互相踢，从设备将共存）
    device_level: 0 | 1; // 设备等级 0.为从设备 1.为主设备
  }): Promise<{ status: 200 | number }> {
    return await request('http://127.0.0.1:5001/user/token', {
      method: 'post',
      data: params,
    });
  }

  /**
   * 获取客户端连接悟空 IM的地址
   * @param uid
   */
  async getWuKongAddress(uid: string) {
    return await request('http://127.0.0.1:5001/route', {
      method: 'get',
      params: { uid: uid },
    });
  }
}
