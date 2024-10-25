import { OnApplicationBootstrap } from '@nestjs/common';
import * as os from 'node:os';
import { exec } from 'child_process';

export class BootstrapService implements OnApplicationBootstrap {
  onApplicationBootstrap(): any {
    console.log('应用程序启动');
    const platform = os.platform();
    let defaultName = '';
    if (platform === 'darwin') {
      defaultName = 'wukongim-darwin-amd64';
    }
    if (platform === 'linux') {
      defaultName = 'wukongim-linux-amd64';
    }
    if (defaultName) {
      exec(
        `cd ./third-part-lib/wukongim && chmod +x ${defaultName} && ./${defaultName} --config wk.yaml -d`,
        // `cd ./third-part-lib/wukongim && chmod +x wukongim-amd64 && ./wukongim-amd64 --config wk.yaml -d`,
        (error, stdout, stderr) => {
          console.info('[启动wukong]', stderr);
          if (error) {
            console.error(`[启动wukong]命令出错: ${error}`);

            return;
          }
          console.log(`[启动wukong]命令输出:\n${stdout}`);
        },
      );
    }
  }
}
