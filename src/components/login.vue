<template>
	<div class="login-bg" id="logintoto">
		<!--<div class="login-logo"><img src="/static/img/login/logo-.png"></div>-->
		<div class="login-box" >
			<div class="login-header">
				<!-- <img src="/static/img/login/login-box-img.png"> -->
				<span>用户登录</span>
			</div>
			<el-form class="login-main" :model="loginForm" :rules="loginRules" ref="loginForm">
				
				<div style="margin-top: 40px; height: 48px;background-color: rgba(255,255,255,.8);border-radius: 5px;line-height: 48px;">
					<div style="width: 20%;height: 100%;float: left;background-color: rgba(255,255,255,.8);border-bottom-left-radius: 5px;border-top-left-radius: 5px;text-align: center;">
						<img src="../../static/images/user.png" style="margin-top: 15px;"/>
					</div>
					<div class="inputt" style="width: 80%;float: left;height: 92%;">
						<input v-on:keyup.enter="handleLogin" v-model="loginForm.username" placeholder="用户名" type="text" style="text-indent:5px;padding-bottom:2px;border: none;border-bottom-right-radius: 5px;border-top-right-radius: 5px;height: 43px;width: 100%;background-color: rgba(255,255,255,.8);"/>
					</div>
				</div>
				
				<div style="margin-top: 20px;height: 48px;background-color: rgba(255,255,255,.8);border-radius: 5px;line-height: 48px;">
					<div style="width: 20%;height: 100%;float: left;background-color: rgba(255,255,255,1);border-bottom-left-radius: 5px;border-top-left-radius: 5px;text-align: center;">
						<img src="../../static/images/password.jpg" style="margin-top: 15px;"/>
					</div>
					<div class="inputt" style="width: 80%;float: left;height: 92%;">
						<input v-on:keyup.enter="handleLogin"  v-model="loginForm.password" placeholder="密码" type="password" style="text-indent:5px;border: none;border-bottom-right-radius: 5px;border-top-right-radius: 5px;height: 44px;width: 100%;background-color: rgba(255,255,255,.8);"/>
					</div>
				</div>
				
				<el-form-item>
				<el-button type="primary" class="login-btn" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			const validateUsername = (rule, value, callback) => {
// 				if(!isvalidUsername(value)) {
// 					callback(new Error('请输入正确的用户名'))
// 				} else {
					callback()
				// }
			}
			const validatePass = (rule, value, callback) => {
				if(value.length < 5) {
					callback(new Error('密码不能小于5位'))
				} else {
					callback()
				}
			}
			return {
				loginForm: {
					username: '',
					password: ''
				},
				loginRules: {
					userName: [{ required: true, trigger: 'blur', validator: validateUsername }],
					password: [{ required: true, trigger: 'blur', validator: validatePass }]
				},
				loading: false,
				pwdType: 'password',
				AssmmenuList:[],
				userId:"",
				userName:""
			}
		},
		methods: {
		// 	enterToLogin (ev) {
        // ev.keyCode === 13 && this.handleLogin()
		// 	},//@keyup.enter.native="handleLogin"
			showPwd() {
				if(this.pwdType === 'password') {
					this.pwdType = ''
				} else {
					this.pwdType = 'password'
				}
			},
		 	intRouter(data) {
		 		this.$router.options.routes=[]
       		 let routerOption = this.AllRoutes;
       		 // routerOption[2].children=[];
       		 this.AssmmenuList = [];
                /*登录页面的路由信息默认加入*/
  
                this.AssmmenuList.push(routerOption[2]);
                /*加入配置路由信息*/
                this.SetAssemMenuList(data, this.AssmmenuList);
                this.AssmmenuList.push(this.AllRoutes[0])
                this.AssmmenuList.push(this.AllRoutes[1])
                this.$router.options.routes = this.AssmmenuList;                
                this.$router.addRoutes(this.AssmmenuList);
                console.log(this.$router.options)
                console.log(this.AssmmenuList)
                // this.setItem('routers', this.AssmmenuList)

                /*保存菜单，页面刷新的时候还是显示对应角色能够看到的页面*/
                this.$nextTick(()=>{
	                this.$router.push('/')
                })
     		 },
     		SetAssemMenuList(data, menuList) {
              //拼装菜单
              // for (var item of data) {
	             //  	var menuData = item;
	             //  	if(!menuData.meta){
	             //        menuData.meta={}
	             //    }
              // 		menuData.meta.menu=menuData.menu||''
              // 		menuData.meta.keepAlive=menuData.keepAlive;
              // 		menuData.meta.isBack= false
              //     let menuItem = {
              //         path: menuData.path,
              //         meta: menuData.meta,
              //         name:menuData.name,
              //         //level: (menuData.level - 1),
              //         iconCls: menuData.iconCls,
              //         component:  resolve => {
              //             require(['@/components'+menuData.component], resolve)
              //         }
              //     }
              //     menuItem.children = [];
              //     if (item.children != undefined) {
              //     	  menuItem.leaf= false
              //         this.SetMenuChildren(item.children, menuItem);
              //     } else {
              //         menuItem.meta.leaf = true
              //     }
              //     menuList.push(menuItem);
              // }
             
               for (var item of data) {
                       for(var routerItem of menuList){
                            if(routerItem.name==item.name){
                            	console.log(routerItem.name)
                            	console.log(item.name)
                   				routerItem.hidden=false
                                routerItem.meta.role=[this.userInfo.username];
                                if(item.children&&item.children.length>0&&routerItem.children){
                                    this.SetAssemMenuList(item.children,routerItem.children)
                                }
                            }else{

                            }
                       }
                  }
          },
          SetMenuChildren(children, menuList) {
              if (children.length > 0) {
                  for (var item of children) {
                      var menuData = item;
                      if(!menuData.meta){
		                    menuData.meta={}
		                }
                         menuData.meta.menu=menuData.menu||''
			                menuData.meta.keepAlive=menuData.keepAlive=="1"?true:false;
			                menuData.leaf=menuData.leaf=="1"?true:false;
			                menuData.meta.isBack= false
			            let menuItem = {
			                path: menuData.path,
			                meta: menuData.meta,
			                name: menuData.name,
			                leaf:menuData.leaf,
			                //level: (menuData.level - 1),
			                iconCls: menuData.iconCls,
			                component: resolve =>{
			                    require(['@/components' + menuData.component], resolve)
			                }
			            }
                      if (menuItem.children == undefined) {
                          if (item.children != undefined) {
                              if (item.children.length > 0) {
                                  menuItem.children = [];
                              }else{
                              	menuItem.leaf=false
                              }
                          }
                      }
                      menuList.children.push(menuItem);
                      if (item.children != undefined) {
                          this.SetMenuChildren(item.children, menuItem);
                      }
                  }

              }
          },
			handleLogin() {
debugger
				let _this=this;
				if(!this.loginForm.username){
					this.$message({
			          message: '请输入用户名',
			          type: 'warning'
			        });
				}else if(!this.loginForm.password){
					this.$message({
			          message: '请输入密码',
			          type: 'warning'
			        });
				}else{
					this.$fetch('/LoginWS.asmx/Login',this.loginForm).then((res)=>{
					localStorage.clear();
					if(res.code==20000){
					localStorage.setItem('token',res.token);
					localStorage.setItem('userInfo',JSON.stringify(res.data))
					_this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
					_this.userId=JSON.parse(localStorage.getItem('userInfo')).USERID;
					_this.userName=JSON.parse(localStorage.getItem('userInfo')).CARDNAME;
					_this.$parent.$parent.$parent.userInfo=res.data;
					_this.$router.push('/')}
				})
				}
				

			},
			
			
		},
		created(){
			// var lett = this;
			// 	document.onkeydown = function(e) {
			// 	var key = window.event.keyCode;
			// 	if (key == 13) {
			// 	lett.handleLogin();
			// 	}
			// }
			
		},
		mounted(){
			localStorage.clear();
			this.userInfo={}

		}
	}
</script>
<style scoped="scoped" lang="less">
	.inputt{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top:2px;
	}
	input:focus{
		outline: none;
	}
	.login-bg{
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background-image: url(../../static/images/bg.jpg);
		background-size: 100% 100%;
		.login-logo{
			// padding-left: 3%;
			position: absolute;
			top: 50%;
			margin-top: -280px;
			left: 50%;
			margin-left: -235px;
			text-align: center;
			width: 470px;
			height: 400px;
		}
		.login-box{
			width: 420px;
			height: 380px;
			position: absolute;
			background-color: rgba(255,255,255,.2);
			// background: #ffffff;
			top: 50%;
			margin-top: -210px;
			left: 50%;
			margin-left:-235px;
			border-radius: 10px;
			padding:44px 37px;
			box-sizing: border-box;
			.login-header{
				text-align: center;
				height: 35px;
    			line-height: 20px;
				img{
					vertical-align: middle;
				}
				span{
					font-size: 26px;
					color:#fff;
					vertical-align: middle;
				}
			}
			.login-main{
				padding: 0 30px;
				
			}
		}
	}
</style>
<style lang="less">
	.el-icon-loading {
	    -webkit-animation: rotating 2s linear infinite;
	    animation: rotating 2s linear infinite;
	    height: 15px;
	    line-height: 15px;
	    width: 15px;
	}
	.login-main{
		.el-form-item {
		    margin-bottom: 0;
			.el-input{
				margin-top: 15px;
				.el-input-group__append, .el-input-group__prepend{
					padding: 0 11px;
					background: #fff;
					width: 45px;
					box-sizing: border-box;
				}
				.el-input__inner{
					position: relative;
					height: 35px;
				    border-radius: 0;
				}
				.el-input__inner:focus,.el-input__inner:hover{
					border: 1px solid #dcdfe6;

				}
				.el-input-group__prepend::before{
					position: absolute;
					content:'';
					height: 30px;
					width: 1px;
					background: #dcdfe6;
					top: 4px;
					right: 0;
				}
			}
			.login-btn{
				width: 100%;
				margin-top: 20px;
				letter-spacing: 8px;
				height: 50px;
				line-height: 50px;
				padding: 0;
				font-size:16px;
				border:none;
				border-radius: 5px
			}
		}
		
	}
</style>