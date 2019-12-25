<template>
	<div class="information white">
		<subBanner></subBanner>
		<div class="submain">
			<div class="left-nav">
				<div class="nav-border">
					<el-menu :default-openeds="openeds" unique-opened class="el-menu-vertical-demo"  :default-active="form.TREEID" >
							<el-submenu v-for="(item,index) in treeData" :index="item.KEYID" :key="item.KEYID">
							<template slot="title"><span>{{item.NAME}}</span></template>
									<el-menu-item v-if="item.children.length>0" v-for="(child,indexs) in item.children" :index="child.KEYID" :key="child.KEYID" @click="queryTable(child)">{{child.NAME}}</el-menu-item>
							</el-submenu>
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
			<div class="nav-content">
				<div class="searchs">
					<el-input placeholder="输入关键字" v-model="saveData.KEYWORD">
					    <el-button slot="append" @click="searchDepartment">高级搜索</el-button>
					</el-input>
					<!-- <div class="keyword">
						关键字推荐：<span>机关单位</span><span>国土资源</span><span>规划建设</span>
					</div> -->
				</div>
				<div class="searchs-content">
				<!-- 	<p class="search-total">共{{total}}条数据</p> -->
				
					<p class="search-total">共找到{{total||0}}个</p>
					<!--<div class="search-tag" v-if="form.NAME">
						已选择：<el-tag :closable="true" @close="closeTag" size="small" type="success">
								{{form.NAME}}
							</el-tag></span>	
					</div>-->
					<div class="search-list">
						  <el-table
					      :data="tableData"
					      style="width: 100%" border class="tables" size="small" header-cell-class-name="my-table-head">

 						<el-table-column label="规范名称" >
		        			<template slot-scope="scope">
		              			<el-button type="text"  size="small" @click="routesTo('/sInfo?id='+scope.row.KEYID)">{{scope.row.TITLE}}</el-button>		                
		        			</template>
		   				</el-table-column>

					      <!-- <el-table-column prop="TITLE"  label="规范名称">
					      	<template slot-scope="scope">
					      		<span style="margin-left: 10px" v-if="scope.row.title" class="table-title">{{ scope.row.name }}</span>
					      		<span style="margin-left: 10px" v-else>{{ scope.row.name }}</span>
					      	</template>
					      </el-table-column> -->
					      <el-table-column  prop="PUBDATE"  label="发布时间"> </el-table-column>
					      <el-table-column  prop="PUBDATE"  label="操作" width="100">
					      	<template slot-scope="scope">
					      	<el-button type="text" @click="download(scope.row)" size="small">下载</el-button>
					      	<el-button type="text" @click="routesTo('/sInfo?id='+scope.row.KEYID)" size="small">详请</el-button>
					      	</template>
					      </el-table-column>
						  		   
					    </el-table>
							<el-pagination class="new-page" background layout="total,prev, pager, next" :total="parseInt(total)" :page-size="PAGESIZE" @current-change="handleCurrentChange"></el-pagination>
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
				treeData:[],
				searchInput:'',
				openeds:['1','2'],
				tableData:[],
				form:{
					KEYWORD:"",
					TREEID:"",
					NAME:""
				 },
				 PAGE:1,
				 PAGESIZE:10,
				 total:0,	
				 saveData: {
					"KEYID":"",
					"PAGE":1,//页数
					"PAGESIZE":10,//每页条数
					"KEYWORD":""//搜索名称
					},
				queryData:{
				"KEYID":"",
				"PAGE":1,//页数
				"PAGESIZE":10,//每页条数
				"KEYWORD":"",//搜索名称	
				"TREEID":""
			},
			}
		},
		components:{
			subBanner
		},
		methods:{
			queryTable(datas){
				this.PAGE=1;
				if(this.form.TREEID==datas.KEYID){
					this.form.TREEID='';
					this.form.NAME="";
					$('.el-menu-vertical-demo .is-active').removeClass('is-active')
				}else{
					this.form.TREEID=datas.KEYID;
					this.form.NAME=datas.NAME;
				}
				this.queryDatas();
			},
			handleCurrentChange(val){
				this.PAGE=val;
				this.queryDatas();
			},
			queryDatas(){
				var data=this.form;
				data.PAGE=this.PAGE;
				data.PAGESIZE=this.PAGESIZE;
				this.$fetch('/P_StandardNormWS.asmx/GetSTANDARDNORMInfoData',data).then(res => {
					this.tableData=res.data;
					this.total=res.total||0;
				})
			},
			searchDepartment(){
				this.PAGE=1;
				this.queryData={
					KEYWORD:this.saveData.KEYWORD,
					PAGE:1,//页数
					PAGESIZE:10,//每页条数
					KEYID:this.saveData.KEYID,
					TREEID:""
				}
			// debugger
			this.$fetch("/P_StandardNormWS.asmx/GetSTANDARDNORMInfoData",this.queryData).then((res)=>{
				this.tableData=res.data
				this.total=parseInt(res.total)||0
			})
		},
			queryTree(){
				this.$fetch('/P_StandardNormWS.asmx/GetSTANDARDNORMTree').then(res => {
					this.treeData=res.data;
				})
			},
			routesTo(path){
				this.$router.push(path)
			},
			download(data){
			      var form = $("<form>");
			
			      //设置表单状态为不显示
			      form.attr("style", "display:none");
				  form.attr('target','downloadForm')
			
			      //method属性设置请求类型为post
			      form.attr("method", "get");
			
			      //action属性设置请求路径,
			      //请求类型是post时,路径后面跟参数的方式不可用
			      //可以通过表单中的input来传递参数
			      form.attr(
			        //数据接口
			        //   "action","http://172.18.0.18:7100/pp/action/api/SystemFile/DownTaskDataFile"
			        "action", this.BaseDownURL + "/SystemFile/DownStandardnormInfoFile"
			      );
			
			      $("body").append(form); //将表单放置在web中
			
			      //在表单中添加input标签来传递参数
			      //如有多个参数可添加多个input标签
			       var input1 = $("<input>");
			       input1.attr("type", "hidden"); //设置为隐藏域
			       input1.attr("name", "KEYID"); //设置参数名称
			       input1.attr("value", data.KEYID); //设置参数值
			       form.append(input1); //添加到表单中
			
			      form.submit();
			      this.$nextTick(() => {
			        form.remove();
			      });
		   },
		   closeTag(){
				this.form.NAME='';
				this.saveData={KEYID:''};
				data.PAGE=1;
				this.queryDatas();
				
				$('.el-menu-vertical-demo .is-active').removeClass('is-active')
			}
			
		},
		watch:{
			
		},
		created(){
			this.searchDepartment();
			this.queryTree();
		},
		mounted(){
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
	.el-button--small{
		padding: 6px 3px;
	}
</style>