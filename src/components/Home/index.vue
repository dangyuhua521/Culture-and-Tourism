<template>
	<div class="">
		<div class="banner">
			<el-carousel height="720px">
					<el-carousel-item>
					<img src="../../../static/images/banner/12.jpg" />
				</el-carousel-item>
				<el-carousel-item>
					<img src="../../../static/images/banner/6.jpg" />
				</el-carousel-item>
				<el-carousel-item>
					<img src="../../../static/images/banner/1.jpg" />
				</el-carousel-item>
				<el-carousel-item>
					<img src="../../../static/images/banner/2.jpg" />
				</el-carousel-item>
				<el-carousel-item>
					<img src="../../../static/images/banner/5.jpg" />
				</el-carousel-item>
			</el-carousel>
			<div class="mouse">
				<img src="../../../static/images/mouse.png" />
				<p><i class="iconfont icon-down"></i></p>
				<p><i class="iconfont icon-down"></i></p>
			</div>
		</div>
		<div class="resource">
			<div class="whiteBg">
				<div class="title">
					电子地图服务
				</div>
				<p class="text">提供专业的地图、定位、搜索、专题服务，支持注册用户进行地图标绘保存</p>
				<div class="grid">

					<!-- <div class="cell" v-for="i in 8">
						<div class="grid-content" :class="'border'">
							<img :src="'../../../static/images/index1.jpg'" />
							<p>电子地图</p>
						
						</div></div> -->

					<div class="cell">
						<div class="grid-content">
							<img class="imgHand" :src="'../../../static/images/imgcell/imgcell11.png'" title="电子地图" />
							<!-- <p>电子地图</p> -->
						</div>
					</div>
					<div class="cell">
						<div class="grid-content">
							<img class="imgHand" :src="'../../../static/images/imgcell/imgcell12.png'" title="地名地址" />
							<!-- <p>地名地址</p> -->
						</div>
					</div>
					<div class="cell">
						<div class="grid-content">
							<img class="imgHand" :src="'../../../static/images/imgcell/imgcell13.png'"  title="空间搜索" />
							<!-- <p>空间搜索</p> -->
						</div>
					</div>
					<div class="cell">
						<div class="grid-content">
							<img class="imgHand" :src="'../../../static/images/imgcell/imgcell14.png'" title="地图标绘" />
							<!-- <p>地图标绘</p> -->
						</div>
					</div>
					<div class="cell">
						<!-- <div class="grid-content border7"  href="http://218.6.244.251:7002/#/login" target="_blank"> -->
						<div class="grid-content border7">
							<img class="imgHand" :src="'../../../static/images/imgcell/imgcell21.png'" title="区域定位" />
							<!-- <p>区域定位</p> -->
						</div>
					</div>
					<div class="cell">
						<div class="grid-content border7">
							<img class="imgHand" :src="'../../../static/images/imgcell/imgcell22.png'" title="专题叠加" />
							<!-- <p>专题叠加</p> -->
						</div>
					</div>
					<div class="cell">
						<div class="grid-content border7">
							<img class="imgHand" :src="'../../../static/images/imgcell/imgcell23.png'" title="全景街景" />
							<!-- <p>全景街景</p> -->
						</div>
					</div>
					<div class="cell">
						<div class="grid-content border8">
							<img class="imgHand" :src="'../../../static/images/imgcell/imgcell24.png'" title="地图工具" />
							<!-- <p>地图工具</p> -->
						</div>
					</div>
				</div>	
				
			</div>
			<div class="more" style="text-align: center;">
				<el-button  @click="HomePageGoto(pageMap)">进入地图</el-button>
			</div>
		</div>
		<div class="quickly">
			<div class="maxWidth">
				<el-row style="height: 100%;">
					<el-col :span="8" class="card-white" v-if="this.vCode!='tfxq_net'">
							<!-- <div @click="HomePageGoto('http://218.6.244.251:7002/#/login')" style="cursor: pointer;"> -->
						<div @click="HomePageGoto('http://10.1.235.129:7002/#/login')" style="cursor: pointer;">
						<img src="../../../static/images/mr共享交换.png" />
						<h2>共享交换</h2>
						<p>Shared exchange</p>
						<span>查看</span></div>
					</el-col>
					<el-col :span="8" class="card-blue" v-if="this.vCode!='tfxq_net'">
						<div @click="HomePageGoto(specification)" style="cursor: pointer;">
						<img src="../../../static/images/jg标准规范.png" />
						<h2>标准规范</h2>
						<p>Standard Specification</p>
						<span>查看</span></div>
					</el-col>
					<el-col :span="8" class="card-white" v-if="this.vCode=='tfxq_net'">
						<div @click="HomePageGoto(pageMap)" style="cursor: pointer;">
						<img src="../../../static/images/icon-map.png" />
						<h2>电子地图</h2>
						<p>Electronic map</p>
						<span>查看</span></div>
					</el-col>
					<el-col :span="8" class="card-blue" v-if="this.vCode=='tfxq_net'">
						<div @click="HomePageGoto(pageServer)" style="cursor: pointer;">
						<img src="../../../static/images/mr资源共享.png" />
						<h2>服务资源</h2>
						<p>Resource service</p>
						<span>查看</span></div>
					</el-col>
					<el-col :span="8" class="card-white"  @click="HomePageGoto(pageAPI)">
						<div @click="HomePageGoto(pageAPI)" style="cursor: pointer;">
						<img src="../../../static/images/icon-mapApi.png" />
						<h2>地图API</h2>
						<p>Map API</p>
						<span>查看</span></div>
					</el-col>
				</el-row>
			</div>
		</div>
		<div class="example" v-if="this.vCode=='tfxq_zw'||this.vCode=='cdkc'">
			<div class="maxWidth">
				<div class="title">
					典型应用
				</div>
				<p class="text">提供专业的地图、定位、搜索、分析服务，支持基于API形式的地图应用二次开发</p>
				<el-row :gutter="24">
					<el-col :span="8">
						<div class="ex-border" @click="HomePageGetSingleLoginToken('http://10.1.235.22:9101/#/login')" v-if="this.vCode=='tfxq_zw'">					
							<img class="imgHandDXYY" src="../../../static/images/index_map1_1.png" title="前往“质量安全辅助办公系统”页面" />
							<div class="circle">
								质安
							</div>
							<h5>质量安全辅助办公系统</h5>
							<p>质量安全辅助办公系统</p>
						</div>
						<div class="ex-border" @click="HomePageGetSingleLoginToken('http://125.70.229.65:8099/#/login')" v-if="this.vCode=='cdkc'">				
							<img class="imgHandDXYY" src="../../../static/images/index_map1_1.png" title="前往“质量安全辅助办公系统”页面" />
							<div class="circle">
								质安
							</div>
							<h5>质量安全辅助办公系统</h5>
							<p>质量安全辅助办公系统</p>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="ex-border" @click="HomePageGetSingleLoginToken('http://10.1.235.22:9100/#/login')" v-if="this.vCode=='tfxq_zw'">						
							<img class="imgHandDXYY" src="../../../static/images/index_map2_1.png" title="前往“国土用地辅助办公系统”页面"/>
							<div class="circle">
								国土  
							</div>
							<h5>国土用地辅助办公系统</h5>
							<p>国土用地辅助办公系统</p>
						</div>
						<div class="ex-border" @click="HomePageGetSingleLoginToken('http://125.70.229.65:8069/#/login')"  v-if="this.vCode=='cdkc'">						
							<img class="imgHandDXYY" src="../../../static/images/index_map2_1.png" title="前往“国土用地辅助办公系统”页面"/>
							<div class="circle">
								国土  
							</div>
							<h5>国土用地辅助办公系统</h5>
							<p>国土用地辅助办公系统</p>
						</div>
					</el-col>
					<el-col :span="8">
						<div class="ex-border" @click="HomePageGetSingleLoginToken('http://10.1.235.22:9103/gpj/account/index')" v-if="this.vCode=='tfxq_zw'">						
							<img class="imgHandDXYY" src="../../../static/images/index_map3_1.png" title="前往“公建配套信息管理系统”页面" />
							<div class="circle">
								公建
							</div>
							<h5>公建配套信息管理系统</h5>
							<p>公建配套信息管理系统</p>
						</div>
						<div class="ex-border" @click="HomePageGetSingleLoginToken('http://125.70.229.8:8080/gpj/account/index')"  v-if="this.vCode=='cdkc'">					
							<img class="imgHandDXYY" src="../../../static/images/index_map3_1.png" title="前往“公建配套信息管理系统”页面" />
							<div class="circle">
								公建
							</div>
							<h5>公建配套信息管理系统</h5>
							<p>公建配套信息管理系统</p>
						</div>
					</el-col>

				</el-row>

				<div class="more" title="前往“典型应用”页面">
					<el-button @click="HomePageGoto(pageApplication)">更多应用</el-button>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				pageMap: '/map',
				pageServer: '/serve',
				pageAPI: '/API',
				pageApplication: '/application',
				specification:'/specification'
				
			}
		},
		methods: {
			HomePageGoto(val) {
				let _this = this;
				if(val.indexOf('http')>=0){
					window.open(val,'_blank')
				}else{
					_this.$router.push({
						path: val
					});
				}
				
			},
			HomePageGetSingleLoginToken(val) {
				if(val != "") {
					let _this = this;
					window.open('/#/check?href='+val);
				}
			}
		},
		watch: {

		},
		created() {

		},
		mounted() {
			document.getElementById("target").scrollIntoView();
		},
		destoryed() {

		}
	}
</script>

<style scoped="scoped">
	/*资源与服务*/
	.grid-content {
		color: #333;
		text-decoration: none;
	}
	.resource {
		/*background: #f8fbfe;*/
		background: #ffffff;
		padding: 40px;
	}
	
	.whiteBg {
		background: #FFFFFF;
		border-radius: 5px;
		padding: 40px 50px;
		width: 1300px;
		margin: 0 auto;
		/* box-shadow: 0 0 20px rgba(0, 0, 0, .04); */
	}
	
	.grid {
		/* border: 1px solid #E5E5E5; */
		border-radius: 5px;
		overflow: hidden;
	}
	
	.title {
		font-size: 36px;
		color: #000000;
		text-align: center;
		line-height: 36px;
		height: 45px;
		position: relative;
		margin-bottom: 20px;
	}
	
	.title::after {
		content: "";
		width: 72px;
		position: absolute;
		left: 50%;
		margin-left: -36px;
		height: 2px;
		background: #238DF6;
		bottom: 0;
	}
	
	.text {
		font-size: 16px;
		color: #666666;
		text-align: center;
		margin-bottom: 50px;
	}
	
	.grid-content {
		text-align: center;
		padding: 20px 0;
		display: table;
		width: 100%;
		position: relative;
	}
	
	.grid-content::after {
		content: "";
		width: 1px;
		height: 101%;
		position: absolute;
		right: 0;
		bottom: 0;
		/* background: #E5E5E5; */
		top: 0px;
	}
	
	.grid-content::before {
		content: "";
		width: 100%;
		height: 1px;
		position: absolute;
		bottom: 0;
		/* background: #E5E5E5; */
		left: 0;
	}
	
	.grid-content img {
		width: 100px;
	}
		.grid-content p {
		    margin-top: 20px;
			font-size: 24px;
	}
	.border8::after,
	.border4::after {
		background: transparent;
	}
	
	.border5::before,
	.border6::before,
	.border7::before,
	.border8::before {
		background: transparent;
	}
	/*鼠标*/
	
	.imgHand {
		
	}
		.imgHandDXYY {
		width: 306px;
		height: 197px;
	}
	.banner {
		position: relative;
	}
	
	.mouse {
		position: absolute;
		left: 50%;
		bottom: 0;
		z-index: 99;
		width: 50px;
		height: 100px;
		text-align: center;
		margin-left: -25px;
	}
	
	.mouse p {
		color: #fff;
	}
	
	.mouse p:first-of-type {
		animation: arrw 1s infinite;
	}
	
	.mouse img {
		animation: mymove 1s infinite;
	}
	
	.mouse p:last-of-type {
		margin-top: -10px;
		animation: mymove 1s infinite;
	}
	
	.cell {
		width: 25%;
		display: inline-block;
		margin-top: -3px;
		margin-right: -4px;
		position: relative;
	}
	
	@keyframes mymove {
		from {
			margin-top: -10px;
		}
		to {
			margin-top: -3px;
			opacity: 0;
		}
	}
	
	@-webkit-keyframes mymove
	/*Safari and Chrome*/
	
	{
		from {
			margin-top: -10px;
		}
		to {
			margin-top: -3px;
			opacity: 0;
		}
	}
	
	@keyframes arrw {
		from {
			margin-top: 0;
		}
		to {
			margin-top: 10px;
			opacity: .1;
		}
	}
	
	@-webkit-keyframes arrw
	/*Safari and Chrome*/
	
	{
		from {
			margin-top: 0;
		}
		to {
			margin-top: 10px;
			opacity: .1;
		}
	}
	/*经典案例*/
	
	.example {
		background: #fff;
		text-align: center;
		padding: 40px;
	}
	
	.maxWidth {
		width: 1200px;
		margin: 0 auto;
		padding: 0 72px;
	}
	
	.ex-border {
		border: 1px solid #E5E5E5;
		padding: 15px;
		position: relative;
		cursor: pointer;
	}
	
	.circle {
		background: #0080ff;
		width: 65px;
		height: 65px;
		margin: 0 auto;
		display: block;
		line-height: 65px;
		color: #fff;
		margin-top: -33px;
		z-index: 99;
		position: absolute;
		left: 50%;
		margin-left: -33px;
		border-radius: 100px;
	}
	
	.ex-border h5 {
		margin-top: 50px;
	}
	
	.ex-border p {
		color: #999;
		font-size: 14px;
		line-height: 3em;
	}
	
	.more .el-button {
		background: #0080FF;
		color: #FFFFFF;
		font-size: 24px;
		border-radius: 50px;
		padding: 15px 50px;
		margin: 80px 0;
	}
	
	@media (max-width: 1400px) {
		.resource {
			padding: 40px;
		}
		.grid-content {
			padding: 20px 28px;
			cursor: default;
		}
		.whiteBg {
			width: auto;
		}
	}
	
	.quickly {
		background: url(../../../static/images/card-bg.jpg)no-repeat;
		height: 600px;
	}
	
	.quickly .maxWidth {
		padding: 0;
		display: block;
		height: 100%;
		text-align: center;
	}
	
	.card-blue {
		background: url(../../../static/images/index-card-bg.png)repeat-x;
		height: 100%;
		padding-top: 140px;
	}
	
	.card-white {
		background: url(../../../static/images/index-card-bg1.png)repeat-x;
		padding-top: 140px;
		height: 100%;
	}
	
	.quickly h2 {
		font-weight: normal;
		font-size: 30px;
		color: #000000;
		margin-top: 30px;
	}
	
	.quickly p {
		font-size: 18px;
		margin-bottom: 30px;
		color: #000000;

	}
	
	.quickly span {
		cursor: pointer;
		border-radius: 20px;
		padding: 5px 25px;
		background: #005fdc;
		color: #fff;
		margin-top: 22px;
		display: inline-block;
		font-size: 14px;
		position: relative;
	}
	.quickly span:hover{
		text-decoration: none;
	}
	.quickly span::before {
		content: "";
		height: 2px;
		width: 100px;
		position: absolute;
		display: inline-block;
		left: -10px;
		top: -20px;
		background: #005FDC;
	}
	
	.card-blue h2,
	.card-blue p {
		color: #FFFFFF;
		text-shadow: 1px 2px 2px rgba(30,38,49,.69);
		
	}
	
	.card-blue span {
		color: #005FDC;
	}
	
	.quickly span:hover {
		opacity: .9;
		text-decoration: underline;
	}
	
	.card-blue span::before,
	.card-blue span {
		background: #FFFFFF;
	}
</style>