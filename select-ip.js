const inquirer = require('inquirer');
const chalk = require('chalk');
const process = require('child_process');
const ipList = [
    {
        owner: '129',
        ip: 'http://192.168.1.129'
    },
    {
        owner: '118',
        ip: 'http://192.168.1.118'
    },
    {
        owner: '外网',
        ip: 'http://192.168.1.130'
    },
    {
        owner: '测试',
        ip: 'http://192.168.1.113'
    },
    {
        owner:'113',
        ip:'http://192.168.1.113'
    }
];

let ip = null

const promptList = [
    {
        type: 'list',
        message: '选择要连接的服务器ip和端口号:',
        name: 'ips',
        choices: ipList.map(item => {
            return `${item.owner}(${item.ip})`;
        }),
    }
];
inquirer.prompt(promptList).then(answers => {
   let regex = /\((.+?)\)/g;
   ip = regex.exec(answers.ips)[1];
   console.log(`${chalk.green('选择的服务器ip和端口号是:')}${chalk.red(ip)}`);

   process.spawn(`npm`, ['run', 'serve', `-${ip}`], {
       stdio: 'inherit',
       // 仅在当前运行环境为 Windows 时，才使用 shell
       shell: process.platform === 'win32'
   });
});


