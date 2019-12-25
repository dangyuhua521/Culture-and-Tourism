<template>
	<div class="information white">
		<subBanner></subBanner>
		<div class="submain">
			<div class="left-nav">
				<div class="nav-border"  v-loading="loadding1">
					<el-menu :default-openeds="openeds" class="el-menu-vertical-demo">
				      <el-submenu index="1">
				        <template slot="title"><span>应用分类</span></template>
				          <el-menu-item :index="item.KEYID"  v-for="item in treeData" :key="item.KEYID" @click="changeType(item.KEYID)">
				          	<!--<el-checkbox @change="changeType" :label="item.NAME" v-model="type" :value="item.KEYID"></el-checkbox>-->
				          	{{item.NAME}}
				          </el-menu-item>
				      </el-submenu>
				    </el-menu>
				</div>
				<div class="nav-border">
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
				</div>
			</div>
			<div class="nav-content">
				<div class="searchs">
					<el-input placeholder="请输入标题、关键字、摘要" v-model="searchData.KEYWORD">
					    <template slot="append"><span @click="getInfoList(1)" style="cursor: pointer;">搜索</span></template>
					</el-input>
					<!-- <div class="keyword">
						
						关键字推荐：<span>机关单位</span><span>国土资源</span><span>规划建设</span>
					</div> -->
				</div>
				<div class="searchs-content">
					<p class="search-total">共找到{{total||0}}个</p>
					<!--<div class="search-tag" v-if="type.length>0">
						已选择：<span v-for="item in type">{{item}}</span>	
					</div>-->
					<div class="search-list">
						<div style="margin-top: 30px;display: flex;flex-wrap:wrap"  v-loading="loadding">
							
							<div class="search-care" style="width: 50%;" v-for="item in infoList" :key="item.KEYID" >
								<el-row :gutter="30">
									<el-col :span="10">
										<a class="img" style="height: 180px;display: block;" target="_blank" :href="'/#/check?href='+item.APPURL">
											<img v-if="item.HOMEPIC" :src="'data:image/jpeg;base64,'+item.HOMEPIC"/>
											<img v-else :src="'/static/images/index_map2.jpg'"/>
										</a>	
									</el-col>
									<el-col :span="14">
										<a :href="'/#/check?href='+item.APPURL"  target="_blank" style="text-decoration: none;">
											<el-tooltip class="item" effect="dark" :content="item.TITLE" placement="top" v-if="item.TITLE.length>15">
												<h2>{{item.TITLE | titles}}</h2>
											</el-tooltip>
											<h2 v-else="">{{item.TITLE}}</h2>
										</a>
										<el-row>
											<el-col :span="24">
												<p>关键字：{{item.KEYWORD}}</p>
											</el-col>
										</el-row>
										<div class="list-msg">
											<i class="iconfont icon-shijian"></i>发布时间：{{item.LASTTIME}}
										</div>
										<div class="list-msg">
											<i class="iconfont icon-eye"></i>{{item.VIEWS}} 次浏览
										</div>
										<div class="list-more" @click="more(item)">
											显示更多 >>
										</div>
									</el-col>
								</el-row>
							</div>
						</div>
						
					</div>
					<div class="page" v-if="total>0" style="text-align: center;">
						<el-pagination background layout="total,prev, pager, next" :current-page="page" @current-change="getInfoList" :page-size="6" :total="total"> </el-pagination>
						
					</div>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import subBanner from './../model/subBanner.vue'
	export default{
		data(){
			return{
				actIndex:0,
				openeds:['1','2'],
				searchInput:'',
				infoList:[],
				total:0,
				searchData:{
					PAGE:1,
					PAGESIZE:6,
					KEYWORD:"",
					TREEID:""
				},
				loadding:true,
				loadding1:true,
				treeData:[],
				type:[],
				typeIds:[],
				page:1
			}
		},
		components:{
			subBanner
		},
		filters:{
			titles(val){			
				if(val.length>15){
					val=val.substr(0,15)
				}
				return val
			}
		},
		methods:{
			getInfoList(page){
				let _this=this;
				this.loadding=true
				if(page){
					this.searchData.PAGE=page
				}
				this.page=page;
				this.$fetch('/P_TypicalAppWS.asmx/GetTYPICALAPPInfoData',this.searchData).then(res=>{
					this.infoList=res.data
					this.total=Number(res.total)||0
					this.loadding=false
				}).catch((e)=>{
					this.loadding=false
				})
			},
			getTreeData(){
				this.loadding1=true
				this.$fetch('/P_TypicalAppWS.asmx/GetTYPICALAPPTree').then(res=>{
					this.treeData=res.data

					this.loadding1=false
				})
			},
			changeType(val){
				this.typeIds=[val];
//				if(this.type.length>0){
//					this.treeData.forEach(res=>{
//						if(this.type.indexOf(res.NAME)>=0){
//							this.typeIds.push(res.KEYID)
//						}
//					})
//				}
				this.$nextTick(()=>{
					this.searchData.TREEID=JSON.stringify(this.typeIds);
					this.getInfoList(1)
				})
			},
			more(data){
				this.$router.push('/typical?id='+data.KEYID)
			}
		},
		watch:{
			
		},
		created(){
			
		},
		mounted(){
			this.getTreeData();
			this.getInfoList()
			document.getElementById("target").scrollIntoView();
		},
		destoryed(){
			
		}
	}
</script>
<style scoped="scoped">

</style>