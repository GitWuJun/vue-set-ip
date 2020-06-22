### Vue项目开发中优雅的切换服务端ip

> 在进行Vue开发的时候，需要配置项目对应服务端的ip地址，但如果需要在多个服务端间进行切换，通常的做法是:手动修改`vue.config.js`配置文件中的服务端ip并保存，然后重启前端服务。如果一个前端项目所有接口都由同一个服务端提供的情况下，现在提供一个非常简单而且也很优雅的切换服务端ip的方法以供参考。

#### 解析获取命令行中输入的服务端ip

需要在项目的中创建一个`server-ip.js`文件，用于解析命令行中输入的参数，目前主要是为了获取命令行中输入的服务端ip,并将获取得到的ip暴露出去。

```javascript
/**
* server-ip.js
**/
const configArgv = JSON.parse(process.env.npm_config_argv)

const original = configArgv.original.slice(1);

const ip = original[1] ? original[1].replace(/-/g,''):''

module.exports = ip;
```
#### 配置vue.config.js

`vue.config.js`文件中引用`server-ip.js`即可:

```javascript
/**
* vue.config.js
**/

const BASE_URL = process.env.NODE_ENV === 'development' ? '/' : './';
//引用server-ip.js文件获取命令行中输入的ip地址
const serverIP = require('./server-ip.js')
//不破坏原项目的启动方式，如果命令行中没有相关参数，则还是以原来的启动方式进行启动
const PROXY_URL = serverIP || 'http://192.168.1.225'

module.exports = {
    publicPath: BASE_URL,
    lintOnSave:false,
    productionSourceMap:false,
    devServer:{
        host:'0.0.0.0',
        port:8000,
        proxy:{
            '/api/upms':{
                target:PROXY_URL + ':6000/api/upms',
                changeOrigin:true,
                pathRewrite:{
                    '^/api/upms':''
                }
            },
            '/api':{
                target:PROXY_URL + ':3000/api',
                changeOrigin:true,
                pathRewrite:{
                    '^/api':''
                }
            }
            
        }
    }
}
```

#### 使用

使用就非常方便了，如果项目中`package.json`中添加了一个脚本`"serve": "vue-cli-service serve"`，那么现在启动直接在命令行中输入`npm run serve -http://192.168.1.113`,即可启动前端服务并将相应后端ip地址设置为`http://192.168.1.113`

![20200622165738.png](https://gitee.com/GitWuJun/MyPicBed/raw/master/images/20200622165738.png)

#### what's more

如果在开发的时候经常会来回在几个后端服务中进行切换，那么我们还可以使用[inquirer](https://www.npmjs.com/package/inquirer)写一个可以与命令行交互的服务端ip选择列表，当我们在命令行中输入`npm run server:selectip`时效果如下，我们可以移动选择我们要连接的后端服务器地址：

![20200622170659.png](https://gitee.com/GitWuJun/MyPicBed/raw/master/images/20200622170659.png)

只需要在项目根目录添加一个`select-ip.js`文件并在`package.json`中添加一个脚本`serve:selectip": "node select-ip.js`即可：

```javascript
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



```

#### 项目地址
[vue-set-ip](https://github.com/GitWuJun/vue-set-ip)


