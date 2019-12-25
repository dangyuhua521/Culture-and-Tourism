'use strict'
/**
 * 版本控制
 * cdkc 市堪院版218.6.244.251
 * tfxq_zw 天府新区政务版 10.1.235.129
 * tfxq_net 天府新区互联网版 171.221.172.166  172.25.9.9
 */
var versionCode = "tfxq_zw";//版本控制
var prod_api = {}
switch (versionCode) {
  case "cdkc": //市堪院版 api dev.env.js  (调试)
    prod_api = {        
      NODE_ENV: '"production"',
      BASE_API: '"http://47.107.104.211:7100/API/PortalAPI"', //客户接口 7100端口
      DOWN_API: '"http://47.107.104.211:7100/pp/action/api"', //客户接口 7100端口
      SIGNALR_URL: '"http://47.107.104.211:7101/signalr"',
      // BASE_API: '"http://218.6.244.251:7100/API/PortalAPI"', //客户接口 7100端口
      // DOWN_API: '"http://218.6.244.251:7100/pp/action/api"', //客户接口 7100端口
      // SIGNALR_URL: '"http://218.6.244.251:7101/signalr"',
      VCode:'"cdkc"',
    }
    break;
  case "tfxq_zw": //天府新区政务版 api dev.env.js  (调试)
    prod_api = {      
      NODE_ENV: '"production"',
      VCode:'"tfxq_zw"',
      // BASE_API: '"http://10.1.235.129:7100/API/PortalAPI"', //客户接口 7100端口
      // DOWN_API: '"http://10.1.235.129:7100/pp/action/api"', //客户接口 7100端口
      // SIGNALR_URL: '"http://10.1.235.129:7101/signalr"',

      BASE_API: '"http://172.18.0.18:7100/API/PortalAPI"', //客户接口 7100端口
      DOWN_API: '"http://172.18.0.18:7100/pp/action/api"', //客户接口 7100端口
      SIGNALR_URL: '"http://172.18.0.18:7101/signalr"',  
    }
    break;
  case "tfxq_net": //天府新区互联网版 api dev.env.js  (调试)
    prod_api = {     
      NODE_ENV: '"production"',
      VCode:'"tfxq_net"',
      // BASE_API: '"http://171.221.172.166:7100/API/PortalAPI"', //客户接口 7100端口
      // DOWN_API: '"http://171.221.172.166:7100/pp/action/api"', //客户接口 7100端口
      // SIGNALR_URL: '"http://171.221.172.166:7101/signalr"',  

      BASE_API: '"http://172.18.0.18:27100/API/PortalAPI"', //客户接口 7100端口
      DOWN_API: '"http://172.18.0.18:27100/pp/action/api"', //客户接口 7100端口
      SIGNALR_URL: '"http://172.18.0.18:7101/signalr"',  
    }
    break;
  default: //市堪院版 api dev.env.js  (调试)
    prod_api = {     
      NODE_ENV: '"production"',
      VCode:'"cdkc"',
      BASE_API: '"http://218.6.244.251:7100/API/PortalAPI"', //客户接口 7100端口
      DOWN_API: '"http://218.6.244.251:7100/pp/action/api"', //客户接口 7100端口
      SIGNALR_URL: '"http://218.6.244.251:7101/signalr"',
    }
    break;
}
module.exports = prod_api;
