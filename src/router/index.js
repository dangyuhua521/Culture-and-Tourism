/**
 * 版本控制
 * cdkc 市堪院版
 * tfxq_zw 天府新区政务版
 * tfxq_net 天府新区互联网版
 */
var vCode="tfxq_zw";

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'


Vue.use(Router)

const router =new Router({
    routes: [{
        path: '/',
        name: 'Home',
        component: Home,
        children: [{
                path: '',
                name: '首页',
                component: resolve => { require(['@/components/Home/index'], resolve) },
            },
            {
                path: '/information',
                name: '信息公告',
                meta:{
                	keepAlive:true
                },
                component: resolve => { require(['@/components/Information/news'], resolve) },
            },
            {
                path: '/news',
                name: '信息公告详情',
                component: resolve => { require(['@/components/Information/news-detail'], resolve) }
            },
            {
                path: '/typical',
                name: '典型应用详情',
                component: resolve => { require(['@/components/view/typical-detail'], resolve) }
            },
            {
                path: '/login',
                name: '登录',
                component: resolve => { require(['@/components/login'], resolve) },
            },
            {
            	path: '/register',
                name: '注册',
                component: resolve => { require(['@/components/register'], resolve) },
            },
            {
                path: '/map',
                name: '电子地图',
                component: resolve => { require(['@/components/map/map'], resolve) },
            },
            {
                path: '/API',
                name: '地图API',
                component: resolve => { require(['@/components/Information/API'], resolve) },
            }, {
                path: '/serve',
                name: '服务资源',
                component: resolve => { require(['@/components/view/serve'], resolve) },
            }, {
                path: '/specification',
                name: '标准规范',
                component: resolve => { require(['@/components/view/specification'], resolve) },
            }, {
                path: '/sInfo',
                name: '标准规范详情',
                component: resolve => { require(['@/components/view/specification-detail'], resolve) },
            },
            //版本控制
            // 'cdkc','tfxq_zw'
             {
                path: '/application',
                name: '典型应用',
                meta:{
                	keepAlive:true
                },
                component: resolve => { require(['@/components/view/application'], resolve) },
                FUNCCODE: ['cdkc','tfxq_zw'],
            },
             {
                path: '/center',
                name: '个人中心',
                component: resolve => { require(['@/components/view/center'], resolve) },
                children:[
                {
	               	path: '/center',
	                name: '个人信息',
	                component: resolve => { require(['@/components/view/center/userInfo'], resolve) },
                },
                //版本控制
                // //'cdkc','tfxq_net'
                // {
	            //    	path: '/myApply',
	            //     name: '我的申请',
                //     component: resolve => { require(['@/components/view/center/apply'], resolve) },
                //     FUNCCODE: ['cdkc','tfxq_net'],
                // }
                ]
            },
        ]
    },
    {
        path: '/check',
        name: '典型应用',
        component: resolve => { require(['@/components/loginCheck'], resolve) },
    },
    ]
})

	export default router
	router.beforeEach((to,from,next) => {
	if(to.path=='/login'){
		localStorage.clear()
	}else{
		
	}
	var data = localStorage.getItem("token");
	if (data) {
		to.meta.token=true
		to.meta.username= JSON.parse(localStorage.getItem("userInfo")).USERNAME;
	} else {
		to.meta.token = false;
		to.meta.username=""
		
	}
	next();
})
