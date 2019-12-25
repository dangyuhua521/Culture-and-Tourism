<template>
	<div class="information white">
		<subBanner></subBanner>
		<div class="submain">
			<div class="left-nav">
				<div class="nav-border">
					<el-menu :default-openeds="openeds" :default-active="saveData.KEYID" unique-opened class="el-menu-vertical-demo">
						<el-submenu v-for="(item,index) in ServiceTree" :index="item.KEYID" :key="item.KEYID">
							<template slot="title"><span>{{item.NAME}}</span></template>
							<el-menu-item v-if="item.children.length>0" v-for="(child,indexs) in item.children" :index="child.KEYID" :key="child.KEYID" @click="queryTable(child)">{{child.NAME}}</el-menu-item>
						</el-submenu>
					</el-menu>
				</div>

				<!-- <el-menu :default-openeds="openeds" class="el-menu-vertical-demo">
				      <el-submenu index="1">
				        <template slot="title"><span>服务类型</span></template>
				          <el-menu-item index="1-1">OGC WMS(18)</el-menu-item>
				          <el-menu-item index="1-2">选项2</el-menu-item>
				      </el-submenu>
				       <el-submenu index="2">
				        <template slot="title"><span>服务类型</span></template>
				          <el-menu-item index="2-1">OGC WMS(18)</el-menu-item>
				          <el-menu-item index="2-2">选项2</el-menu-item>
				      </el-submenu>
				    </el-menu> -->
				<!-- <div class="nav-border" id="nav-border">
				<el-scrollbar style="height: 100%;" id="serveTree">
					<el-tree :data="ServiceTree" @node-click="clickNodeTreeNode" @check-change="checkChange" ref="ServiceTree" node-key="KEYID" default-expand-all
					    :default-checked-keys="checkedSevice" :expand-on-click-node="false" :check-on-click-node="true">
						<span class="custom-tree-node" slot-scope="{ node, data }">
                            <el-radio v-model="saveData.KEYID" :label="data.KEYID">&nbsp;</el-radio>
							<span>{{data.NAME}}</span>
                            <span class="radio-full"></span>
						</span>
					</el-tree>
				</el-scrollbar>
				</div> -->
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
					<img src="../../../static/images/qrcode.jpg" />
					<p>天府新区地理信息公共服务</p>
				</div> -->
			</div>
			<div class="nav-content">
				<div class="searchs">
					<el-input placeholder="请输入标题、关键字、摘要" v-model="saveData.SEARCHNAME">
						<el-button slot="append" @click="searchDepartment">高级搜索</el-button>
					</el-input>
					<!-- <div class="keyword">
						<p class="search-total">共找到{{total}}个</p>
						关键字推荐：<span>机关单位</span><span>国土资源</span><span>规划建设</span>
					</div> -->
				</div>
				<div class="searchs-content">
					<!-- <p class="search-total">共找到五个</p> -->
					<!-- <div class="search-tag">
						已选择：<span>{{form.NAME}}</span>
					</div> -->
					<p class="search-total">共找到{{total||0}}个</p>
					<!--<div class="search-tag" v-if="form.NAME">
						<span>
						已选择：<el-tag :closable="true" @close="closeTag" size="small" type="success">
								{{form.NAME}}
							</el-tag>
						</span>
					</div>-->
					<div class="search-list">
						<!-- <el-row :gutter="30" class="search-care" v-for="i in 10" :key="i.id">
							<el-col :span="6">
								<div class="img">
									<img src="http://125.70.229.8:6080/arcgis/rest/services/KGXC/JY_JX_CDDD/MapServer/info/thumbnail"/>
								</div>	
							</el-col>
							<el-col :span="18">
								<h2>全国行政区划面（线）</h2>
								<el-row>
									<el-col :span="12">
										<p>提供单位：国家基础地理信息中心 </p>
									</el-col>
									<el-col :span="12">
										<p>摘要信息：全国行政区划面（线）数据服务</p>
									</el-col>
									<el-col :span="24">
										<p>关键字：全国、中国、行政区划、数据</p>
									</el-col>
								</el-row>
								<div class="list-msg">
									<i class="iconfont icon-shijian"></i>发布时间：2016-02-23&nbsp;&nbsp;&nbsp;&nbsp;<i class="iconfont icon-eye"></i>5837 次浏览
								</div>
								<div class="list-more">
									显示更多 >>
								</div>
							</el-col>
						</el-row> -->
						<el-row :gutter="30" class="search-care" v-for="i in conData" :key="i.id">
							<el-col :span="6">
								<div class="img" style="height: 160px;">
									<img :src="i.PICURL||'../../../static/images/moreng.png'" />
								</div>
							</el-col>
							<el-col :span="18">
								<el-tooltip class="item" effect="dark" :content="i.TITLE" placement="top" v-if="i.TITLE.length>15">
									<h2>{{i.TITLE | titles}}</h2>
								</el-tooltip>
								<h2 v-else="">{{i.TITLE}}</h2>
								<el-row>
									<el-col :span="12">
										<p>提供单位：{{i.PROVIDEUNIT}}</p>
									</el-col>
									<!--<el-col :span="12">
										<p>摘要信息：{{i.ABSTRACT}}</p>
									</el-col>-->
									<el-col :span="12">
										<p>关键字：{{i.KEYWORD}}</p>
									</el-col>
								</el-row>
								<div class="list-msg">
									<i class="iconfont icon-shijian"></i> 发布时间：{{i.PUBLISHTIME}}&nbsp;&nbsp;&nbsp;&nbsp;
									<i class="iconfont icon-eye"></i>
									<span v-if="i.VIEWS!=''">{{i.VIEWS}} 次浏览</span>
									<span v-else="">0次浏览</span>
								</div>
								<el-row>
									<el-col :span="12">
								<div class="list-more">
									<el-button type="text" @click="showMore(i)">显示更多>></el-button>
								</div>
								</el-col>
								<el-col :span="12">
								<div class="list-more" >
									<el-button type="text" v-if="i.INDEXID!=''" @click="routesTo('/API?id='+i.INDEXID)">查看实例代码>></el-button>
								</div>
								</el-col>
								</el-row>
							</el-col>
						</el-row>
					</div>
					<div class="page" style="text-align: center;">
						<el-pagination id="userPage" background layout="total,prev, pager, next" :total="total" :page-size="queryData.PAGESIZE" @current-change="changePage" :current-page="queryData.PAGE" class="page"></el-pagination>
					</div>
				</div>
			</div>
		</div>
		<el-dialog title="详细信息" :visible.sync="dialogVisible" class="has-scrollbar" width="1000px" height="300px">
			<el-scrollbar class="myover" style="height: 400px;">
				
				<ul class="detail">
					
					<el-col :span="24">
						<li><label>标题 :</label><span>{{this.condiaData.TITLE}}</span></li>
						<li><label>摘要 :</label><span>{{this.condiaData.ABSTRACT}}</span></li>
						<li><label>关键字 : </label><span>{{this.condiaData.KEYWORD}}</span></li>
						<li><label>提供单位 : </label><span>{{this.condiaData.PROVIDEUNIT}}</span></li>
						<li><label>发布时间 : </label><span>{{this.condiaData.PUBLISHTIME}}</span></li>
						<li v-if="this.condiaData.ISAPPLY==0"><label>服务地址 :</label><span>{{this.condiaData.SERVICEURL}}</span></li>
					</el-col>
				<el-col :span="24"  v-if="this.condiaData.SHOWSEVER">
						<!-- <li><label>服务关键字 :</label><span>{{this.condiaData.SERVICEKEYWORD}}</span></li> -->
						<li><label>服务简介 :</label><span>{{this.condiaData.SERVICEABSTRACT}}</span></li>
						<li><label>主题分类 :</label><span>{{this.condiaData.THEME}}</span></li>
						<li><label>覆盖区域 :</label><span>{{this.condiaData.AREA}}</span></li>
						<li><label>坐标系 :</label><span>{{this.condiaData.COORD}}</span></li>
						<!-- <li><label>投影类型 :</label><span>{{this.condiaData.PROJECTEDTYPE}}</span></li> -->
						<li><label>服务类型 :</label><span>{{this.condiaData.SERVICETYPE}}</span></li>
						
					</el-col>
			<!-- 		<el-col :span="12">
						<li><label>左上角经度 :</label><span>{{this.condiaData.WESTBOUNDLONGITUDE}}</span></li>
						<li><label>左上角纬度 :</label><span>{{this.condiaData.NORTHBOUNDLATITUDE}}</span></li>
						<li><label>右下角经度 :</label><span>{{this.condiaData.EASTBOUNDLONGITUDE}}</span></li>
						<li><label>右下角纬度 :</label><span>{{this.condiaData.SOUTHBOUNDLATITUDE}}</span></li>
						 -->
						<!-- <li><label>联系人 :</label><span>{{this.condiaData.CONTACT}}</span></li>
						<li><label>联系人电话 :</label><span>{{this.condiaData.TEL}}</span></li>
						<li><label>联系人邮箱 :</label><span>{{this.condiaData.EMAIL}}</span></li>
						<li><label>地址 :</label><span>{{this.condiaData.ADDRESS}}</span></li> -->
						<!-- <li><label>发布机构 :</label><span>{{this.condiaData.COMPANY}}</span></li>
						<li><label>更新周期 :</label><span>{{this.condiaData.UPDATECYCLE}}</span></li>
					</el-col> -->
					<el-col :span="24">
						<li><label>服务接口说明 :</label></li>
						<div v-html="condiaData.EXPLAIN" class="edui-autotypesetpicker-body"></div>
					</el-col>
				</ul>
			</el-scrollbar>
			<!-- <el-row>
			<div class="showMoreDia">标题：{{this.condiaData.TITLE}}</div>
			<div class="showMoreDia">摘要：{{this.condiaData.ABSTRACT}}</div>
			<div class="showMoreDia">关键字：{{this.condiaData.KEYWORD}}</div>
			<div class="showMoreDia">提供单位：{{this.condiaData.PROVIDEUNIT}}</div>
			<div class="showMoreDia">发布时间：{{this.condiaData.PUBLISHTIME}}</div>
			<div class="showMoreDia"></div> 
			<div style="word-wrap: break-word">服务地址：<p style="line-height: 25px;">{{this.condiaData.SERVICEURL}}</p></div>
		</el-row> -->
		<span slot="footer" class="dialog-footer" style="padding-right:40px; " v-if="condiaData.ISAPPLY==1&&this.vCode!='tfxq_zw'">
			<el-button @click="openApply()" class="el-button el-button--primary el-button--small">申请</el-button>
			<!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
		</span>
			<span slot="footer" class="dialog-footer">
			<el-button @click="dialogVisible = false">关闭</el-button>
			<!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
		</span>
		  
		
		<el-dialog :title="'申请服务资源：'+condiaData.TITLE" :visible.sync="dialogApply"  append-to-body width="576px" @close="applyDialogClose">
			<el-form :model='applyData' label-width="120px" :rules="rules" ref="applyData">
				<el-form-item label="申请理由" prop="REASON">
					<el-input type="textarea" rows="3" v-model="applyData.REASON"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" rows="3" v-model="applyData.REMARK"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogApply = false">取 消</el-button>
				<el-button type="primary" @click="apply()">确 定</el-button>
			</span>
		</el-dialog>

		</el-dialog>
	</div>
</template>
<script>
	import subBanner from "./../model/subBanner.vue";
	export default {
		data() {
			return {
				actIndex: 0,
				openeds: ["1", "2"],
				searchInput: "",
				ServiceTree: [],
				checkedSevice: [],
				saveData: {
					KEYID: "",
					PAGE: "", //页数
					PAGESIZE: "", //每页条数
					SEARCHNAME: "" //搜索名称
				},
				dataForm: {
					KEYID: "",
					PAGE: "", //页数
					PAGESIZE: "", //每页条数
					SEARCHNAME: "" //搜索名称
				},
					applyData: {
					REASON: "",
					REMARK: ""
				},
				queryData: {
					KEYID: "",
					PAGE: 1, //页数
					PAGESIZE: 10, //每页条数
					SEARCHNAME: "" //搜索名称
				},
				conData: [],
				dialogVisible: false,
				condiaData: {
					ABSTRACT: "", //摘要
					KEYWORD: "", //关键字
					PROVIDEUNIT: "", //提供单位
					PUBLISHTIME: "", //发布时间
					SORT: "", //排序
					TITLE: "", //标题
					SERVICEURL: ""
				},
				total: 0,
				form: {
					KEYWORD: "",
					TREEID: "",
					NAME: ""
				},
					actTableData: {},
						dialogApply: false,
								rules: {
					REASON: [{
						required: true,
						message: '请输入申请理由',
						trigger: 'blur'
					}, ]
				},
				tfxq_zw_to_net_url:'http://171.221.172.166:7100/API/PortalAPI',
			};
		},
		components: {
			subBanner
		},
		filters: {
			titles(val) {
				if(val.length > 15) {
					val = val.substr(0, 15)
				}
				return val
			}
		},
		methods: {
				openApply() {    	
				let token=localStorage.getItem('token');
				if(token){
					this.dialogApply = true;
					this.actTableData.KEYID=this.condiaData.KEYID;
					this.applyData.REASON="";
					this.applyData.REMARK="";
				}else{
					this.$message({
						type:'info',
						message:'请登录系统后再申请！'
					})
					return false;
				}

				
			},
			apply(){
			
				// this.$refs["applyData"].validate((valid) => {
				// 	if(valid) {		
						var url="/p_ServiceResourcesWS.asmx/ApplyService";
					if(this.vCode=='tfxq_zw')
					url=this.tfxq_zw_to_net_url+url;		
						if(this.applyData.REASON != "") {
							this.$fetch(url, {
									KEYID: this.actTableData.KEYID,
									REASON: this.applyData.REASON,
									REMARK: this.applyData.REMARK
								})
								.then(res => {
									if(res.code == 20000) {
										this.dialogApply = false;
										this.$message({
											type: "success",
											message: "申请成功,请等待管理员审核！"
										});
									}else{
										this.$message({
											type: "error",
											message: res.message
										});
									}
									
									// this.queryData.PAGE = 1;
									// this.searchData();
								})
								.catch(e => {
									if(e.code != 404) {
										this.$message({
											type: "error",
											message: e.message||"申请失败，请重试！"
										});
									}

								});
						} else {
							this.$message({
								type: "error",
								message: "请输入申请理由！"
							})
						}
				// 	}

				// })



				// // demo
				// 	this.$confirm("申请服务, 是否继续?", "提示", {
				// 		confirmButtonText: "确定",
				// 		cancelButtonText: "取消",
				// 		type: "warning"
				// 	})
				// 	.then(() => {	
				// 		this.$message({
				// 					type: "success",
				// 					message: "申请成功,请等待管理员审核！"
				// 				});
				// 	})
				// 	.catch(() => {
				// 		this.$message({
				// 			type: "info",
				// 			message: "已取消删除"
				// 		});
				// 	});
			},
			searchDepartment() {
				this.queryData = {
					SEARCHNAME: this.saveData.SEARCHNAME || "",
					PAGE: 1, //页数
					PAGESIZE: 10, //每页条数
					KEYID: "",
					TREEID: ""
				};
				// debugger
					var url="/p_ServiceResourcesWS.asmx/GetResourcesInfoData";
					if(this.vCode=='tfxq_zw')
					url=this.tfxq_zw_to_net_url+url;
				this.$fetch(
					url,
					this.queryData
				).then(res => {
					this.conData = res.data;
					this.total = parseInt(res.total)||0;
				});
			},
			showMore(data) {
				// debugger
				this.dialogVisible = true;
				let smData = {
					KEYID: data.KEYID
				};
				this.condiaData = data;
				var url="/p_ServiceResourcesWS.asmx/ViewResourcesInfo";
					if(this.vCode=='tfxq_zw')
					url=this.tfxq_zw_to_net_url+url;
				this.$fetch(url, smData).then(
					res => {}
				);
			},
			applyDialogClose() {
				this.applyData = {
					REASON: "",
					REMARK: ""
				};
			},
			queryTable(datas) {
				
				this.checkedSevice = [];

				if(this.saveData.KEYID==datas.KEYID){
					this.form.TREEID=""
					this.form.NAME = ""
					
					this.saveData={
						KEYID:'',						
					}
					$('.el-menu-vertical-demo .is-active').removeClass('is-active')
				}else{
					this.form.TREEID = datas.KEYID;
					this.form.NAME = datas.NAME;
					this.saveData = datas;				
				}

				this.PAGE = 1;
				this.hqtable();
			},
			clickNodeTreeNode(data, node) {
				// debugger
				this.checkedSevice = [];
				this.saveData = data;
				this.hqtable();
			},
			changePage(page) {
				this.queryData.PAGE = page;
				this.hqtable();
			},
			hqtable() {
				// debugger
				this.dataForm = {
					PAGE: this.queryData.PAGE, //页数
					PAGESIZE: 10, //每页条数
					SEARCHNAME: "", //搜索名称
					KEYID: this.saveData.KEYID //服务资源树KEYID（KEYID为空，执行搜索；否则，执行点击）
				};
					var url="/p_ServiceResourcesWS.asmx/GetResourcesInfoData";
					if(this.vCode=='tfxq_zw')
					url=this.tfxq_zw_to_net_url+url;
				this.$fetch(
					url,
					this.dataForm
				).then(res => {
					// debugger
					this.conData = res.data;
					this.total = parseInt(res.total)||0;
					// debugger
				});
			},
			checkChange() {},
			init() {
				var url="/p_ServiceResourcesWS.asmx/GetResourcesTree";
				if(this.vCode=='tfxq_zw')
					url=this.tfxq_zw_to_net_url+url;
				this.$fetch(url).then(res => {
					this.ServiceTree = res.data;
				});
			},
			closeTag(){
				this.form.NAME='';
				this.saveData={KEYID:''};
				this.queryData.PAGE=1;
				this.hqtable();
				$('.el-menu-vertical-demo .is-active').removeClass('is-active')
			},
			routesTo(path){			
				this.$router.push(path)
			}
		},
		watch: {},
		created() {
			this.searchDepartment();
			this.init();
		},
		mounted() {
			document.getElementById("target").scrollIntoView();
		},
		destoryed() {}
	};
</script>

<style scoped="scoped">
	.page {
		text-align: center;
	}
	
	.showMoreDia {
		font-size: 14px;
		line-height: 30px;
	}
	
	#nav-border {
		height: 500px;
	}
	.detail li label{
		width: 7em;
	}
</style>