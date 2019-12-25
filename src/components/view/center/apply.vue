<template>
	<div>
		<div class="searchs">
			<el-input placeholder="输入服务资源名称" v-model="queryData.SEARCHNAME">
			    <el-button slot="append" @click="searchDepartment">搜索</el-button>
			</el-input>
		</div>
		<div class="searchs-content">
			<p class="search-total">共找到{{total||0}}个</p>
			<div class="search-list">
				  <el-table
			      :data="tableData" size="small"
			      style="width: 100%" border class="tables" header-cell-class-name="my-table-head">
			      <el-table-column type="index" label="序号" fixed="left"> </el-table-column>
			      <el-table-column  prop="TITLE"  label="服务名称" fixed="left"  width="160" show-overflow-tooltip> </el-table-column>

			      <el-table-column  prop="ABSTRACT"  label="摘要信息"  width="200" show-overflow-tooltip> </el-table-column>
			      <el-table-column  prop="APPROVALSTATUSNAME"  label="审批状态" width="70"> </el-table-column>
			      <el-table-column  prop="DLURL"  label="地址"></el-table-column>


			      <el-table-column  prop="GETTIME"  label="申请时间" width="140"> </el-table-column>
   				  <el-table-column  prop="ABORTTIME"  label="有效时间" width="140"> </el-table-column>
						<el-table-column label="操作" width="60" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" @click="delService(scope.row)">删除</el-button>
			
						</template>
						</el-table-column> 
			    </el-table>
					<el-pagination class="new-page" background layout="total,prev, pager, next" style="margin-top: 30px;text-align: center;" :total="parseInt(total)" :page-size="PAGESIZE" @current-change="handleCurrentChange"></el-pagination>
			</div>

		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				actIndex:0,
				treeData:[],
				searchInput:'',
				openeds:['1','2'],
				tableData:[],
				 PAGE:1,
				 PAGESIZE:10,
				 total:0,	
				queryData:{
					"PAGE":1,//页数
					"PAGESIZE":10,//每页条数
					"SEARCHNAME":"",//搜索名称	

				},
			}
		},
		methods:{
			handleCurrentChange(val){
				this.PAGE=val;
				this.queryDatas();
			},
			queryDatas(){
				var data={};
				data.PAGE=this.PAGE;
				data.PAGESIZE=this.PAGESIZE;
				data.SEARCHNAME=this.queryData.SEARCHNAME;
				this.$fetch('/MyHomeWS.asmx/GetApplyServiceData',data).then(res => {
					this.tableData=res.data;
					this.total=res.total||0;
				})
			},
			searchDepartment(){
				this.PAGE=1;
				this.queryData={
					SEARCHNAME:this.queryData.SEARCHNAME,
					PAGE:1,//页数
					PAGESIZE:10//每页条数
				}
			// debugger
			this.$fetch("/MyHomeWS.asmx/GetApplyServiceData",this.queryData).then((res)=>{
				this.tableData=res.data
				this.total=parseInt(res.total)||0
			})
		},
			delService(data) {
								
				this.$confirm("此操作将永久删除该服务, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.$fetch("/MyHomeWS.asmx/DeleteMyService", {								
								KEYID: data.KEYID
							})
							.then(res => {
								this.$message({
									type: "success",
									message: "删除成功！"
								});								
								this.searchDepartment();
							})
							.catch(e => {
								this.$message({
									type: "error",
									message: "删除失败，请重试！"
								});
							});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},
		},
		watch:{
			
		},
		created(){
			this.searchDepartment();
		},
		mounted(){
			this.userInfo=JSON.parse(localStorage.getItem('userInfo'));
			this.userInfo.img='/static/images/user-default.png'
			document.getElementById("target").scrollIntoView();
		},
		destoryed(){
			
		}
	}
</script>

<style>
</style>