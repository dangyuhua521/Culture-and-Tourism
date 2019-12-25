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
				<span>文章类型：{{HtmlData.INFOTYPENAME}}</span>

			</div>

			<div class="news-content edui-autotypesetpicker-body" v-html="HtmlData.CONTENT">

			</div>

			<div class="backBtn" @click="goback" title="返回">
				<i class="el-icon-arrow-left"></i>
				<!-- <el-button type="primary" size="small" @click="goback">返回上一页</el-button> -->
			</div>
		</div>

	</div>
</template>

<script>
	import subBanner from "./../model/subBanner.vue";
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
					PUBDATE2: ""
				},
				HtmlData: {}
			};
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
				};
				this.$fetch("/P_InformationBulletinWS.asmx/ViewInfo", data).then(res => {
					this.HtmlData = res.data[0];
				});
			},
			goback() {
				this.$router.push({
					path: '/information'
				});
			}
		},
		watch: {},
		created() {
			this.queryData();
		},
		mounted() {},
		destoryed() {}
	};
</script>
<style  lang="less">
	.edui-autotypesetpicker-body{
			table.sortEnabled tr.firstRow th,
			table.sortEnabled tr.firstRow td {
				padding-right: 20px;
				background-repeat: no-repeat;
				background-position: center right;
				background-image: url(/static/ueditor1_4_3_3/themes/default/images/sortable.png);
			}
			
			.selectTdClass {
				background-color: #edf5fa !important
			}
			
			table.noBorderTable td,
			table.noBorderTable th,
			table.noBorderTable caption {
				border: 1px dashed #ddd !important
			}
			
			table {
				margin-bottom: 10px;
				border-collapse: collapse;
				display: table;
			}
			
			td,
			th {
				padding: 5px 10px;
				border: 1px solid #DDD;
			}
			
			caption {
				border: 1px dashed #DDD;
				border-bottom: 0;
				padding: 3px;
				text-align: center;
			}
			
			th {
				border-top: 1px solid #BBB;
				background-color: #F7F7F7;
			}
			
			table tr.firstRow th {
				border-top-width: 2px;
			}
			
			.ue-table-interlace-color-single {
				background-color: #fcfcfc;
			}
			
			.ue-table-interlace-color-double {
				background-color: #f7faff;
			}
			
			td p {
				margin: 0;
				padding: 0;
			}
	}
</style>
<style scoped="scoped" lang="less">
	.maxWidth {
		width: 960px;
		margin: 0 auto;
	}
	
	.news-header {
		font-size: 24px;
		text-align: center;
		line-height: 1.4em;
		margin-top: 30px;
		padding: 10px 0 20px;
	}
	
	.news-msg {
		font-size: 14px;
		text-align: center;
		margin-bottom: 40px;
		span {
			margin-right: 15px;
		}
	}
	
	.news-content {
		border-top: 1px solid #ececec;
		padding-top: 40px;
		padding-bottom: 40px;
		p {
			line-height: 1.5em;
		}
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