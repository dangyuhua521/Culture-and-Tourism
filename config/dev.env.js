'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
/**
 * 版本控制
 * cdkc 市堪院版
 * tfxq_zw 天府新区政务版
 * tfxq_net 天府新区互联网版
 */
var versionCode = "tfxq_zw";//版本控制
var dev_api = {}
switch (versionCode) {
  case "cdkc": //市堪院版 api dev.env.js  (调试)
    dev_api = {
      NODE_ENV: '"development"',
      VCode:'"cdkc"',
      BASE_API: '"http://172.18.0.18:7100/API/PortalAPI"', //gp发布接口 7100端口
      DOWN_API: '"http://172.18.0.18:7100/pp/action/api"', //下载api
      SIGNALR_URL: '"http://172.18.0.18:7101/signalr"', //signalR 服务地址
    }
    break;
  case "tfxq_zw": //天府新区政务版 api dev.env.js  (调试)
    dev_api = {
      NODE_ENV: '"development"',
      VCode:'"tfxq_zw"',
      BASE_API: '"http://172.18.0.18:27100/API/PortalAPI"', //gp发布接口 7100端口
      DOWN_API: '"http://172.18.0.18:27100/pp/action/api"', //下载api
      SIGNALR_URL: '"http://172.18.0.18:7101/signalr"', //signalR 服务地址
    }
    break;
  case "tfxq_net": //天府新区互联网版 api dev.env.js  (调试)
    dev_api = {
      NODE_ENV: '"development"',
      VCode:'"tfxq_net"',

      BASE_API: '"http://172.18.0.18:27100/API/PortalAPI"', //gp发布接口 7100端口
      DOWN_API: '"http://172.18.0.18:27100/pp/action/api"', //下载api
      SIGNALR_URL: '"http://172.18.0.18:7101/signalr"', //signalR 服务地址

      // BASE_API: '"http://localhost:11907/API/PortalAPI"', //gp发布接口 7100端口
      // DOWN_API: '"http://localhost:11907/pp/action/api"', //下载api
      // SIGNALR_URL: '"http://172.18.0.18:7101/signalr"', //signalR 服务地址
    }
    break;
  default: //市堪院版 api dev.env.js  (调试)
    dev_api = {
      NODE_ENV: '"development"',
      VCode:'"cdkc"',
      BASE_API: '"http://172.18.0.18:7100/API/PortalAPI"', //gp发布接口 7100端口
      DOWN_API: '"http://172.18.0.18:7100/pp/action/api"', //下载api
      SIGNALR_URL: '"http://172.18.0.18:7101/signalr"', //signalR 服务地址
    }
    break;
}
module.exports = merge(prodEnv, dev_api)
