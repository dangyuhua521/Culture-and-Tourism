<template>
	<div class="information white">
		<subBanner></subBanner>
		<div class="submain">
			<div class="left-nav">	
				<div class="nav-border">
					<div class="head-portrait">
						<img :src="userInfo.img"/>
					</div>
						<div class="username">{{userInfo.USERNAME}}</div>
					<el-menu class="center-menu" router :default-active="actMenu">
						<el-menu-item index="/center">个人信息</el-menu-item>
						<!-- 版本控制 -->
						<!-- 'cdkc','tfxq_net' -->
						<el-menu-item index="/myApply"  v-if="this.vCode=='tfxq_net'||this.vCode=='cdkc'">我的申请</el-menu-item>
			   		 </el-menu>
				</div>
				<!-- <div class="nav-border">
					<el-row class="chat">
						<el-col :span="6"><i class="iconfont icon-chat"></i></el-col>
						<el-col :span="18">
							<h4>联系我们</h4>
							<p>电话：182548***456</p>
						</el-col>
					</el-row>
				</div>
				<div class="nav-border qrcode">
					<img src="../../../static/images/qrcode.jpg"/>
					<p>天府新区地理信息公共服务</p>
				</div> -->
			</div>
			<div class="nav-content nav-border">
				<div class="nav-tag"><img src="../../../static/images/location.png"/>个人中心<i class="iconfont icon-right"></i><span>{{$route.name}}</span></div>
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
	import subBanner from './../model/subBanner.vue'
	export default{
		data(){
			return{
			
				userInfo:{
					name:"",
					img:'/static/images/user-default.png'
				},
				actMenu:"/center"
			}
		},
		components:{
			subBanner
		},
		methods:{
		
			
		},
		watch:{
			
		},
		created(){
		},
		mounted(){

			this.actMenu=this.$route.path
			if(localStorage.getItem('userInfo')){
				this.userInfo=JSON.parse(localStorage.getItem('userInfo'));

			}else{
				this.userInfo={}
			}
			this.userInfo.img='/static/images/user-default.png'
			
			document.getElementById("target").scrollIntoView();
			
		},
		destoryed(){
			
		}
	}
</script>
<style scoped="scoped">
.new-page{
		margin-top: 70px;
    	text-align: center;
	}
	.center-menu{
		margin-top: 40px;
	}
	.center-menu .el-menu-item{
		height: 45px;
		line-height: 45px;
		border-top: 1px solid #f1f1f1;
		border-left: 4px solid transparent;
		
	}
	.center-menu .el-menu-item.is-active{
		border-left: 4px solid #0084ff;
		background: rgba(136,216,255,.2);
	}
	.head-portrait{
		width: 136px;
		height: 136px;
		margin: 40px auto 10px;
		border-radius: 100px;
		overflow: hidden;
	}
	.username{
		font-size: 16px;
		color: #999;
		text-align: center;
	}
	.head-portrait img{
		width: 100%;
		height: 100%;
	}
	.nav-content{
		width: 1040px;
		height: 100%;
		padding: 20px;
		min-height: 625px;
		margin-left: 15px;
	}
	.nav-tag{
		padding: 20px 0;
		border-bottom: 1px solid #f1f1f1;
		color: #666666;
		font-size: 16px;
		margin-bottom: 40px;
	}
	.nav-tag img{
		vertical-align: middle;
		margin-right: 5px;
	}
	.nav-tag span{
		color: #333;
	}
	.nav-tag i{
		color: #999;
		margin: 0 5px;
	}
</style>