<template>
	<div class="information">
		<subBanner></subBanner>
		<div class="nav-bg">
			<div class="nav-animate">
				<div class="circle circle1"></div>
				<div class="circle circle2"></div>
				<div class="circle circle3"></div>
				<div class="circle circle4"></div>
				<div class="circle circle5"></div>
			</div>
			<ul class="nav">
				<li :class="actIndex==2?'active':''" @click="changIndex(2)"><i class="iconfont icon-code"></i><span>热点新闻</span></li>
				<li :class="actIndex==0?'active':''" @click="changIndex(0)" ><i class="iconfont icon-gaishu"></i><span>网站新闻</span></li>
				<li :class="actIndex==1?'active':''" @click="changIndex(1)"><i class="iconfont icon-Bulletin"></i><span>更新公告</span></li>			
			</ul>
		</div>
		<div class="new-list animated fadeInRight"  v-show="actIndex==0">
			<div class="new-care" v-for="item in tableData" @click="routesTo('/news?id='+item.KEYID)">
				<div class="new-date">
					<h3>{{item.PUBDATE.split(" ")[0].substr(8,2)}}</h3>
					<p>{{item.PUBDATE.split(" ")[0].substr(0,7)}}</p>
				</div>
				<div class="new-content">
					<!-- <i class="add-more el-icon-plus"></i> -->
					<el-tooltip class="item" effect="dark" :content="item.TITLE" placement="top" v-if="item.TITLE.length>15">
						<h2>{{item.TITLE | titles}}</h2>
					</el-tooltip>
					<h2 v-else="">{{item.TITLE | titles}}</h2>
					<p>{{item.ABSTRACT}}</p>
				</div>
			</div>
			<!-- <el-pagination class="new-page" background layout="prev, pager, next" :total="parseInt(total)"></el-pagination> -->
		</div>
		<div class="new-list animated fadeInRight" v-show="actIndex==1">
			<div class="new-care" v-for="item in tableData" @click="routesTo('/news?id='+item.KEYID)">
				<div class="new-date">
					<h3>{{item.PUBDATE.split(" ")[0].substr(8,2)}}</h3>
					<p>{{item.PUBDATE.split(" ")[0].substr(0,7)}}</p>
				</div>
				<div class="new-content">
					<!-- <i class="add-more el-icon-plus"></i> -->
					<el-tooltip class="item" effect="dark" :content="item.TITLE" placement="top">
						<div class="new-title">{{item.TITLE | titles}}</div>
					</el-tooltip>
					<p>{{item.ABSTRACT}}</p>
				</div>
			</div>
			<!-- <el-pagination class="new-page" background layout="prev, pager, next" :total="parseInt(total)"></el-pagination> -->
		</div>
		<div class="new-list animated fadeInRight" v-show="actIndex==2">
			<div class="new-care" v-for="item in tableData" @click="routesTo('/news?id='+item.KEYID)">
				<div class="new-date">
					<h3>{{item.PUBDATE.split(" ")[0].substr(8,2)}}</h3>
					<p>{{item.PUBDATE.split(" ")[0].substr(0,7)}}</p>
				</div>
				<div class="new-content">
					<!-- <i class="add-more el-icon-plus"></i> -->
					<el-tooltip class="item" effect="dark" :content="item.TITLE" placement="top">
						<div class="new-title">{{item.TITLE | titles}}</div>
					</el-tooltip>
					<p>{{item.ABSTRACT}}</p>
				</div>
			</div>
			
		</div>
		<el-pagination class="new-page" background layout="total,prev, pager, next" :total="parseInt(total)" :page-size="10" :current-page.sync="PAGE" @current-change="handleCurrentChange"></el-pagination>
	</div>
</template>

<script>
	import subBanner from './../model/subBanner.vue'
	export default{
		data(){
			return{
				actIndex:2,
				form:{
					INFOTYPE: "",
					SOURCE: "",
					TITLE: "",
					ISPUBLIC: "",
					PUBDATE1:"",
					PUBDATE2:"",
				},
				tableData:[],
				total:0,
				PAGE:1,
				PAGESIZE:10
			}
		},
		components:{
			subBanner
		},
		filters:{
			titles(val){			
				if(val.length>21){
					val=val.substr(0,21)
				}
				return val
			}
		},
		methods:{
			changIndex(index){
				if(this.actIndex!=index){
					this.PAGE=1;
					this.actIndex=index;
					this.queryData();
				}
			},
			handleCurrentChange(val){
				this.PAGE=val;
				this.queryData();
			},
			queryData(){
				var data=this.form;
				data.INFOTYPE=this.actIndex+1,
				data.PAGE=this.PAGE;
				data.PAGESIZE=this.PAGESIZE;
				this.$fetch('/P_InformationBulletinWS.asmx/GetBulletinInfoData',data).then(res => {
					this.total=res.total;
					this.tableData=res.data;
				})
			},
			routesTo(path){
				this.$router.push(path)
			}
		},
		watch:{
			
		},
		created(){
			this.queryData();
		},
		mounted(){


		},
		destoryed(){
			
		}
	}
</script>
<style scoped="scoped">
	.item {
      margin: 4px;
    }
	.information{
		background: #FFFFFF;
		overflow-x: hidden;
	}
	.new-list{
		width: 960px;
		margin: 0 auto;
		padding-bottom: 10px;
	}
	.new-page{
		margin-top: 70px;
		padding-bottom: 70px;
    	text-align: center;
	}
	.new-care:hover .add-more,.new-care:hover .new-date{
		background: #108ee9;
	}
	.new-care:hover .new-date h3{
		color: #FFFFFF;
	}
	.new-care{
		width: 44%;
		cursor: pointer;
		position: relative;
		margin-left: -4px;
		margin: 0 3%;
		margin-top: 70px;
		
		display: inline-block;
	}
	.add-more{
		position: absolute;
		background: #969696;
		color: #FFFFFF;
		right: 10px;
		font-size: 14px;
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;
	}
	.new-date{display: inline-block;width: 60px;height: 60px;border: 1px solid #108ee9;padding:10px 0;}
	.new-date h3{
		color: #108ee9;
		font-size: 20px;
		text-align: center;
	}
	.new-date p{
		line-height: 2em;
		color: #9fc2e9;
		font-size: 13px;
		text-align: center;
	}
	.new-content{
		display: inline-block;
		vertical-align: top;
		margin-left: 30px;
		width: calc(100% - 100px);
	}
	.new-title{
		font-size:18px;
		color: #333333;
		margin-bottom: 1.5em;
		position: relative;
	}
	.new-title::after{
		position: absolute;
		bottom: -0.7rem;
		height: 1px;
		width: 30px;
		content: "";
		left: 0;
		background: #0080FF;
	}
	.new-content p{
		color: #999999;
		font-size: 14px;
		line-height: 1.6em;
	}
	.nav{
		position: absolute;
		z-index: 999;
		height: 72px;
		line-height: 72px;
		top: 0;
		left: 50%;
		margin-left: -223px;
	}
	.nav li{
		padding: 0 35px;
		display: inline-block;
		border-left: 1px solid #e7edf2;
		cursor: pointer;
		margin-left: -5px;
	}
	.nav li.active{
		background: #e7edf2;
	}
	.nav li.active i{
		color: #409bf6;
	}
	.nav li:last-of-type{
		border-right: 1px solid #e7edf2;
	}
	.nav li span{
		padding-left: 10px;
	}
	.nav-animate,.nav-bg{
		position: relative;
		width: 100%;
		height: 72px;
		overflow: hidden;
		border-bottom: 1px solid #e7edf2;
	}
	.circle{
		position: absolute;
		border-radius: 100px;
		background: #61efa6; /* For browsers that do not support gradients */
        background: -webkit-linear-gradient(#1da299, #61efa6); /* For Safari 5.1 to 6.0 */
	    background: -o-linear-gradient(#1da299, #61efa6); /* For Opera 11.1 to 12.0 */
	    background: -moz-linear-gradient(#1da299, #61efa6); /* For Firefox 3.6 to 15 */
	    background: linear-gradient(#1da299, #61efa6); /* Standard syntax */
		opacity: 0.1;
	}
	.circle1{
		width: 50px;
		height: 50px;
		left: 400px;
		top: 20px;
		animation: circles1 20s infinite linear;
	}
	.circle2{
		width: 20px;
		height:20px;
		left: 280px;
		top: 50px;
		animation: circles2 10s infinite linear;
	}
	.circle3{
		width: 120px;
		height: 120px;
		left: 320px;
		top: -60px;
		animation: circles3 15s infinite linear;
	}
	.circle4{
		width: 50px;
		height: 50px;
		top: 10px;
		right: 300px;
		animation: circles4 15s infinite linear;
	}
	.circle5{
		width: 20px;
		height:20px;
		top: 10px;
		right: 250px;
		animation: circles5 20s infinite linear;
	}
	
	@keyframes circles1 {
		0% {
			left: 400px;
			top: 20px;
		}
		/*25% {
			top: 10px;
			left: 420px;
		}*/
		50%{
			top: -20px;
			left: 480px;
		}
		75%{
			top: 00px;
			left: 460px;
		}
		
		100%{
			left: 400px;
			top: 30px;
		}
	}
	@keyframes circles2 {
		0% {
			left: 280px;
			top: 50px;
		}
		/*25% {
			top: 10px;
			left: 420px;
		}*/
		50%{
			left: 320px;
			top: -20px;
		}
		75%{
			top: -30px;
			left:300px;
		}
		
		100%{
			left: 280px;
			top: 50px;
		}
	}
	@keyframes circles3 {
		0% {
			left: 320px;
			top: -60px;
		}
		25% {
			left: 200px;
			top: 0px;
		}
		50%{
			left: 300px;
			top: 20px;
		}
		75%{
			top: 60px;
			left:350px;
		}
		
		100%{
			left: 320px;
			top: -60px;
		}
	}
	@keyframes circles4 {
		0% {
			top: 10px;
			right: 300px;
		}
		25% {
			right: 200px;
			top: -10px;
		}
		50%{
			right: 150px;
			top: 20px;
		}
		75%{
			top: 40px;
			right:350px;
		}
		
		100%{
			top: 10px;
			right: 300px;
		}
	}
	@keyframes circles5 {
		0% {
			top: 10px;
			right: 250px;
		}
		25% {
			right: 350px;
			top: 50px;
		}
		50%{
			right: 100px;
			top: 10px;
		}
		75%{
			top: 40px;
			right:200px;
		}
		
		100%{
			top: 10px;
			right: 250px;
		}
	}
</style>