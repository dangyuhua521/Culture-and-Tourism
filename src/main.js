import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/components/store/Store'
import { post, fetch, patch } from './connect/axios'
//import { baseDownURL } from '../static/js/axiosBaseURL'
Vue.use(ElementUI);
import App from './App'
import router from './router'
Vue.prototype.$fetch = fetch;
Vue.prototype.BaseDownURL = process.env.DOWN_API;
Vue.prototype.signalRUrl=process.env.SIGNALR_URL
Vue.prototype.userInfo = {};
Vue.prototype.vCode=process.env.VCode;
Vue.use(fetch)
import { Loading } from 'element-ui';
Vue.config.productionTip = false;
Vue.use(ElementUI);
console.log("vCode(main.js):"+this.vCode);
var NewVuew=new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})