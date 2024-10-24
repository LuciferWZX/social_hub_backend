import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { exec } from 'child_process';
import os from 'node:os';
@Injectable()
export class ShutdownService implements OnApplicationShutdown {
  onApplicationShutdown(signal?: string) {
    console.log('应用程序停止', signal);
    const platform = os.platform();
    let defaultName = '';
    if (platform === 'darwin') {
      defaultName = 'wukongim-darwin-amd64';
    }
    if (defaultName) {
      exec(
        `cd ./third-part-lib/wukongim && chmod +x ${defaultName} && ./${defaultName} stop`,
        (error, stdout, stderr) => {
          console.info('[停止wukong]', stderr);
          if (error) {
            console.error(`[停止wukong]命令出错: ${error}`);
            return;
          }
          console.log(`[停止wukong]命令输出:\n${stdout}`);
        },
      );
    }
  }
}
