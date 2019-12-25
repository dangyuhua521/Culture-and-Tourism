<template>
	<div class="information">
		<subBanner></subBanner>
		<div class="maxWidth">
			<div class="msg">
				<div class="msg-title">
					案例基本信息
				</div>
				<el-form label-width="8em" v-loading="loading" >
					<div style="width:900px;margin: 0 auto;">
					<el-form-item label="案例名称："><span class="msg-con">{{HtmlData.TITLE}}</span></el-form-item>
					<el-form-item label="应用类型："><span class="msg-con">{{HtmlData.TREEIDNAME}}</span></el-form-item>
					<el-form-item label="应用领域："><span class="msg-con">{{HtmlData.APPAREA}}</span></el-form-item>
					<el-form-item label="案例类型："><span class="msg-con">{{HtmlData.CASETYPE}}</span></el-form-item>
					<el-form-item label="浏览次数："><span class="msg-con">{{HtmlData.VIEWS}}</span></el-form-item>
					<el-form-item label="关键字："><span class="msg-con">{{HtmlData.KEYWORD}}</span></el-form-item>
					<!-- <el-form-item label="访问地址："><span class="msg-con">{{HtmlData.APPURL}}</span></el-form-item> -->
					<el-form-item label="访问地址："><a :href="'/#/check?href='+HtmlData.APPURL" target="_blank">{{HtmlData.APPURL}}</a></el-form-item>
					<el-form-item label="简要介绍："><span class="msg-con">{{HtmlData.ABSTRACT}}</span></el-form-item>
					<el-form-item label="案例图片：">
						<div class="msg-con">
							<img :src="'data:image/jpeg;base64,'+item.url" v-for="(item,index) in HtmlData.PICS" :key="index"/>
						</div>
					</el-form-item>
					<el-form-item label="案例详情："><div class="msg-con" v-html="HtmlData.CONTENT"></div></el-form-item>
					</div>
				</el-form>
				<!-- <div class="backBtn_typical">
					<el-button type="primary" size="small" @click="goback">返回上一页</el-button> -->
								<div class="backBtn" @click="goback" title="返回">
				<i class="el-icon-arrow-left"></i>
				</div>
			</div>
			
		</div>

	</div>
</template>

<script>
	import subBanner from './../model/subBanner.vue'
	export default {
		data() {
			return {
				actIndex: 0,
				form: {
					INFOTYPE: "",
					SOURCE: "",
					TITLE: "",
					ISPUBLIC: "",
					PUBDATE1: "",
					PUBDATE2: "",
				},
				HtmlData:{},
				loading:false
			}
		},
		components: {
			subBanner
		},
		methods: {
			changIndex(index) {
				if(this.actIndex != index) {
					this.actIndex = index;
					this.queryData();
				}

			},
			handleCurrentChange(val) {
				this.PAGE = val;
				this.queryData();
			},
			queryData() {

				var data = {
					KEYID: this.$route.query.id
				}
				this.loading=true;
				this.$fetch('/P_TypicalAppWS.asmx/ViewInfo', data).then(res => {
					this.HtmlData = res.data;
					this.loading=false
				})
			},
			goback(){
				this.$router.go(-1)
			}
		},
		watch: {

		},
		created() {

			this.queryData();
		},
		mounted() {

		},
		destoryed() {

		}
	}
</script>
<style scoped="scoped" lang="less">
	.maxWidth{
		width: 960px;
		margin: 0 auto;
	}
	.msg{
		margin: 50px 0;
		border: 1px solid #ECECEC;
		border-radius: 5px;
		padding:5px 30px 30px;
	}
	.msg-title{
		border-bottom: 1px solid #ECECEC;
		line-height: 40px;
		margin-bottom: 15px;
	}
	.msg-con{
		display:block;
		vertical-align: top;
		color: #606266;
		img{
			width: 240px;
			height: 180px;
			border: 8px solid #ECECEC;
			border-radius: 5px;
			margin-right: 15px;
		}
	}
	.el-form-item{margin-bottom: 0;}
	.backBtn_typical{
		text-align: right;
		margin-top: 20px;
	}
		.backBtn {
  width: 55px;
  height: 55px;
  background: #238df6;
  color: #ffffff;
  text-align: center;
  position: fixed;
  z-index: 9999;
  cursor: pointer;
  position: fixed;
   left: 5%;
  top: 245px;
}
.backBtn i {
  line-height: 55px;
  font-size: 30px;
}
</style>