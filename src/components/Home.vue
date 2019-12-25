<template>
	<el-container class="container">
		<el-header id="header" class="header" height="80px" style="position: fixed;left: 0;min-width:1200px;top: 0;z-index: 2000;">
			<img src="../../static/images/logo2.png" />

			<div class="f-r" v-if="!$route.meta.token">
				<el-button type="primary" class="radius" size="small" @click="routeNav('/register')">注册</el-button>
				<el-button class="radius" size="small" @click="routeNav('/login')">登录</el-button>
			</div>
			<div class="f-r" v-else>
				<span style="font-size:14px;color:#84878d;line-height:45px;">欢迎您 ，<span style="color:#0090ff;cursor: pointer;text-decoration: underline;" @click.stop="$router.push('/center')">{{userInfo.CARDNAME}}</span></span>
				<!-- 版本控制 -->
				<!-- 'cdkc','tfxq_zw' -->
				<el-popover  placement="bottom-end" v-model="showMsgs" width="200" trigger="click"   v-if="this.vCode=='tfxq_net'||this.vCode=='cdkc'">
					<div slot="reference" style="display: inline-block;">
					    <el-badge :is-dot="msgList.PortalAPIMyServerApproval&&msgList.PortalAPIMyServerApproval!=''" class="item" style="line-height: 15px;margin: 0 10px;">
							<i class="iconfont icon-msg" style="margin: 0;font-size: 30px;cursor:pointer;vertical-align: middle;"></i>	
						</el-badge>	
					</div>
					
					<div class="msgList">

						<ul v-if="msgList.PortalAPIMyServerApproval">

							<li v-if="msgList.PortalAPIMyServerApproval" @click="routerTo('PortalAPIMyServerApproval','/myApply')">{{msgList.PortalAPIMyServerApproval}}</li>
						</ul>
						<p v-else style="text-align: center;color: #999;">暂无消息通知</p>
					</div>
			    </el-popover>
				<span style="font-size: 14px;color:#84878d;margin-left: 2vw;cursor: pointer;" @click="exit">
					<img src="../../static/images/exit.png" style="width: 18px;vertical-align:sub;cursor: pointer;"/>
					退出
				</span>
			</div>
			<ul class="f-r nav">
				<li :class="$route.name=='首页'?'active':''" @click="routeNav('/')">首页</li>
				<li :class="$route.name.indexOf('信息公告')>=0?'active':''" @click="routeNav('/information')">信息公告</li>
				<li :class="$route.name=='电子地图'?'active':''" @click="routeNav('/map')">电子地图</li>
				<!-- 版本控制 政务版服务资源先使用公众版数据 2019年5月26日 13:55:06-->
				<!-- 政务版 无服务资源 -->
				<!-- <li :class="$route.name=='服务资源'?'active':''" @click="routeNav('/serve')" v-if="this.vCode!='tfxq_zw'">服务资源</li> -->
				<li :class="$route.name=='服务资源'?'active':''" @click="routeNav('/serve')" >服务资源</li>
				<!-- 政务版 无服务资源 -->
				<li :class="$route.name=='地图API'?'active':''" @click="routeNav('/API')">地图API</li>
				<li :class="$route.name=='标准规范'?'active':''" @click="routeNav('/specification')">标准规范</li>
				<li :class="$route.name.indexOf('典型应用')>=0?'active':''" @click="routeNav('/application')" v-if="this.vCode=='tfxq_zw'||this.vCode=='cdkc'">典型应用</li>
			</ul>
		</el-header>
		<!--<div style="height: 80px;"></div>-->
		<div id="target"></div>
		<el-main class="main" :class="$route.name!='电子地图'?'hasFooter':''" id="main">
			<div class="scrollTop" @click="backTop" v-if="$route.name!='电子地图'&&topBol!=false" title="回到顶部">
				<i class="iconfont icon-up"></i>
			</div>
				<keep-alive>
					<router-view v-if="$route.meta.keepAlive" ref="main" >
						<!-- 这里是会被缓存的视图组件 -->
					</router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.keepAlive" ref="main" >
					<!-- 这里是不被缓存的视图组件 -->
				</router-view>
			<!--<router-view ref="main" />-->
		</el-main>

		<el-footer class="footer" v-if="$route.name!='电子地图'">
			<div class="footer-content">
				<el-row>
					<el-col :span="24">
						<img src="../../static/images/dibu.png" style="width:100%;height:auto"/>
					<!-- 	<h4>关于我们</h4>
						<p>提供专业的地图、定位、搜索、分析服务，支持基于API形式的地图应用二次开发提供专业的地图、定位、搜索、分析服务，支持基于API形式的地图应用二次开发</p>
					</el-col> -->
					<!-- <el-col :span="2">
						<h4>服务条款</h4>
						<div class="serve">
							<router-link to="/">服务条款</router-link>
						</div>
						<div class="serve">
							<router-link to="/">版权声明</router-link>
						</div>
						<div class="serve">
							<router-link to="/">更新日志</router-link>
						</div>
						<div class="serve">
							<router-link to="/">意见反馈</router-link>
						</div>
					</el-col> -->
					<!-- <el-col :span="8" class="contact">
						<h4>联系我们</h4>
						<div class="tel">
							<i class="iconfont icon-tel"></i> +86 817-8326XXXX
						</div>
						<p>传真: 654415XXXXXXX</p>
						<p>邮箱: 654415XX@qq.com</p>
						<p>地址: 成都市天府新区</p>
					</el-col> -->
					<!-- <el-col :span="6">
						<h4>版权</h4>
						<p style="padding-right: 0;">主办: 天府新区规划建设国土局</p> -->
						<!--<p style="padding-right: 0;">甲测资字:XXXXXXX 备案号:XXXXXXX </p>-->

						<!-- <p>审图号: 成S【2019】003号</p>
						<p>审图号: 成S【2019】004号</p>
						<p style="margin-top: 0;">技术支持: 成都市勘察测绘研究院</p> -->
						<!-- <i class="iconfont icon-deng"></i> -->
						<!--<p style="margin-top: 2em;">版权声明 合作条款</p>-->
					</el-col>
				</el-row>
			</div>
		</el-footer>
	</el-container>
</template>

<script>
	export default {
		data() {
			return {
				user: {},
				scrollTop: "",
				istoken: false,
				username: "",
				userInfo:{},
				topBol: false,
				msgList:{},
				showMsgs:false
			};
		},
		components: {},
		methods: {
			handleScroll(e) {
				if(e.target.scrollTop>=e.target.clientHeight){
					this.topBol = true;
				}else{
					this.topBol = false
				}

			},
			routeNav(path) {
				this.topBol = false;
				this.$router.push(path);
				document.getElementById("target").scrollIntoView();
			},
			exit() {
				localStorage.setItem("userInfo", "");
				localStorage.setItem("token", "");
				this.istoken = false;
				this.user = {};
				this.$router.push("/login");
			},
			backTop() {
				document.getElementById("target").scrollIntoView();
				var _this = this;
				window.setTimeout(function() {
					_this.topBol = false;
				}, 200)
			},
			initSignalR(){
				let _this=this;
				 $.connection.hub.url = this.signalRUrl;
	            // Declare a proxy to reference the hub.
	            this.chat = $.connection.myHub;
	            var msg={}
	            // 接收消息
	            this.chat.client.PushMessage = (message)=> {

					msg=JSON.parse(message);
	            	for(var item in msg){
	            		if(msg[item]){
	            			_this.msgList[item]=msg[item]
	            		}
	            	}
	            };
				var connectionStateChanged=(state)=>{
	                if(state.newState==4){
	                    setTimeout(function(){
	                        $.connection.hub.start();
	                    },2000);
	                }
	                var stateConversion = {0: 'connecting', 1: 'connected', 2: 'reconnecting', 4: 'disconnected'};
	                
	            }
				$('#message').focus();
				

				$.connection.hub.stateChanged(connectionStateChanged);


					$.connection.hub.qs={"userId":this.userInfo.USERID,"userModel":JSON.stringify(this.userInfo)};

			
	            $.connection.hub.start().done(()=> {
//	            	let msg={data:"xiaoxi2",url:'/serverManager/myService',FuncCode:"userCheck"}//模拟数据，要删掉
//	            	//发送消息
//	               this.chat.server.sendMessage('1',JSON.stringify(msg) );
	            });
			},
			routerTo(funcCode,path){

				this.showMsgs=false;
				
				this.readMsg(funcCode);
				

				this.$router.push(path)

			},
			getHistoryMsg(){
				this.$fetch('/LoginWS.asmx/DealMessagePushInfo',{
							dealWay:'get',
							FuncCode:JSON.stringify(['PortalAPIMyServerApproval'])
					}).then(res=>{						
					this.msgList=res.data||{}
				})
			},
			readMsg(funcCode){
				
				this.$fetch('/LoginWS.asmx/DealMessagePushInfo',{
						dealWay:'read',
						FuncCode:JSON.stringify([funcCode])
				}).then(res=>{
					this.msgList[funcCode]=null
				})
			},
		},

		watch: {
			user(data) {
				console.log(data);
			}
		},
		created() {

			console.log(localStorage);
			var data = localStorage.getItem("token");
			if (data) {
				this.istoken = true;
			} else {
				this.istoken = false;
			}
			try{
				this.username = JSON.parse(localStorage.getItem("userInfo")).USERNAME;
				this.user = JSON.parse(localStorage.getItem("userInfo")) || {};
				this.userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
			}catch(e){
				this.username=""
				this.user={}
				this.UserInfo={}
			}
			
		},
		mounted() {
			console.log("vCode(Home.vue):"+this.vCode);
			document.getElementById('app').addEventListener('scroll', this.handleScroll, true);
			
			 var _userInfo = localStorage.getItem("userInfo");
			 if (_userInfo) {
				 this.msgList=[];
		debugger;
				this.getHistoryMsg();
				setTimeout(()=>{
					this.initSignalR();
				},2000)
			 }
			//   this.username = JSON.parse(localStorage.getItem("userInfo")).USERNAME;
			//   this.user = JSON.parse(localStorage.getItem("userInfo")) || {};
			//   this.userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
			// } else {
			//   this.username = "";
			//   this.user = "";
			//   this.userInfo = "";
			// }
		}
	};
</script>

<style scoped>
.el-footer{
  padding:0px;
  
}
	.container {
		width: 100%;
		height: 100%;
		display: block;
		position: relative;
	}

	.header {
		display: block;
		width: 100%;
		line-height: 40px;
		background: #fff;
		padding: 17px 50px;
		vertical-align: middle;
		box-sizing: border-box;
		box-shadow: 0 0 15px rgba(0, 80, 147, 0.2);
		z-index: 99;
		position: relative;
	}

	.main {
		background: #ffffff;
		height: 100%;
		display: block;
		padding: 0;
	}

	.hasFooter {
		min-height: calc(100% - 347px);
		height: auto;
		position: relative;
	}

	.footer {
		display: block;
		background: #e5e5e5;
		width: 100%;
	}

	.radius {
		border-radius: 50px;
		padding: 8px 20px;
		text-align: center;
	}

	.f-r {
		float: right;
	}

	.header ul {
		display: inline-block;
		float: right;
		margin-right: 30px;
		line-height: 30px;
		margin-top: 8px;
	}

	.header li {
		display: inline-block;
		margin: 0 15px;
		padding: 0 10px;
		cursor: pointer;
	}

	.header li.active {
		border-bottom: 2px solid #238df6;
	}

	.footer-content {
		/* width: 1200px; */
		padding: 25px 0 6px;
		margin: 0 auto;
		top:20px;
	}

	.footer-content h4 {
		color: #999;
		margin: 25px 0;
		font-size: 16px;
	}

	.footer-content p {
		line-height: 1.6em;
		font-size: 14px;
		color: #666;
		padding-right: 5em;
	}

	.footer-content .serve {
		line-height: 2em;
		height: 2em;
		font-size: 14px;
	}

	.footer-content .serve a {
		color: #666666;
		font-size: 14px;
		text-decoration: none;
	}

	.footer-content .tel {
		font-size: 18px;
		color: #238df6;
		line-height: 20px;
		vertical-align: middle;
		height: 1.6em;
	}

	.tel i {
		font-size: 28px;
	}

	.contact p {
		line-height: 2em;
	}

	.footer-content .icon-deng {
		font-size: 60px;
		color: #666;
		position: absolute;
		right: 7rem;
		top: 7rem;
	}

	.scrollTop {
		width: 55px;
		height: 55px;
		background: #238df6;
		color: #ffffff;
		text-align: center;
		position: fixed;
		z-index: 9999;
		right: 40px;
		bottom: 200px;
		cursor: pointer;
	}

	.scrollTop i {
		line-height: 55px;
		font-size: 30px;
	}

	@media (max-width: 1600px) {
		.header li {
			margin: 0;
			padding: 0 8px;
			font-size: 14px;
		}

		.header {
			padding: 17px;
		}

		.header img {
			width: 400px;
		}
	}

	.icon-shutdown {
		display: inline-block;
		vertical-align: middle;
		width: 24px;
		height: 24px;
		cursor: pointer;
		background-image: url(../../static/images/shutdown_24px.png);
	}
	.msgList li{
		padding: 8px;
		cursor: pointer;
	}
	.msgList li:hover{
		background: rgba(0,0,0,.1);
	}
</style>


<style lang="less">
    
	.el-dialog{
		    border-radius: 7px;
	}
	.has-scrollbar .el-dialog__body {
		padding-right: 0;
		padding-bottom: 10px;
	}
	
	.has-scrollbar .el-dialog__body .el-scrollbar__view {
		padding-right: 30px;
	}
	
	.myover .el-scrollbar__wrap {
		overflow-x: hidden;
	}
	
	.el-dialog__header {
		background: #0096ff url(/static/images/dialog-title-bg.png) center center;
		padding: 16px 20px 10px;
		height: 60px;
		border-radius: 7px 7px 0 0;
	}
	
	.el-dialog__headerbtn .el-dialog__close,.el-dialog__headerbtn .el-dialog__close:hover,
	.el-dialog__title {
		color: #ffffff;
	}	
	
	.detail {
		li {
			padding: 3px 0;
			box-sizing: border-box;
			display: table;
			line-height: 2em;
			text-align: left;
			label {
				width: 6em;
				text-align: right;
				display: table-cell;
				margin-right: 8px;
				vertical-align: top;
				font-size: 15px;
				line-height: 2em;
			}
			span {
				font-size: 15px;
				text-align: left;
				display: table-cell;
				/*width: 440px;*/
				padding-left: 10px;
				line-height: 2em;
				word-break: normal;
				display: inline-block;
				white-space: pre-wrap;
				word-wrap: break-word;
			}
			img {
				vertical-align: middle;
			}
		}
	}
</style>