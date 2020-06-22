
const chalk = require('chalk');

const BASE_URL = process.env.NODE_ENV === 'development' ? '/' : './';
const serverIP = require('./server-ip.js')
const PROXY_URL = serverIP || 'http://192.168.1.225'
console.log(`server ip is:${chalk.blue(PROXY_URL)}`);
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