<template>
	<div class="information">
		<subBanner></subBanner>
		<div class="maxWidth">
			<div class="news-header">
				{{HtmlData.TITLE}}
			</div>
			<div class="news-msg">
				<span>来源：{{HtmlData.SOURCE}}</span>
				<span>发布时间：{{HtmlData.PUBDATE}}</span>
				<span>浏览次数 ：{{HtmlData.VIEWS}}</span>			
			</div>
			<div class="news-content" v-html="HtmlData.CONTENT">
				
			</div>
			<el-button type="primary" @click="download(HtmlData)" style="float: right;">下载<i class="el-icon-download el-icon--right"></i></el-button>
			
			<!-- <div class="backBtn_sinfo"> -->
							<div class="backBtn" @click="goback" title="返回">
				<i class="el-icon-arrow-left"></i>
				<!-- <el-button type="primary" size="small" @click="goback">返回上一页</el-button> -->
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
				this.$fetch('/P_StandardNormWS.asmx/ViewInfo', data).then(res => {

					this.HtmlData = res.data[0];
				})
			},
			goback(){
				this.$router.go(-1)
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
	.news-header{

		font-size: 24px;
		text-align: center;
		line-height: 1.4em;
		margin-top: 30px;    padding: 10px 0 20px;
	}
	.news-msg{
		font-size: 14px;
		text-align: center;
		margin-bottom: 40px;
		span{
			margin-right: 15px;
		}	
	}
	.news-content{
	    border-top: 1px solid #ececec;
    	padding-top: 40px;
    	padding-bottom: 40px;
    	 p{
			line-height: 1.5em;
		}
	}
	.backBtn_sinfo{
		text-align: right;
		margin-bottom:40px;
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