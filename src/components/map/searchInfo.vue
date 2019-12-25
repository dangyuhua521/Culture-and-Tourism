
<template>
	<div class="graphicbox" v-show="isShow">
		<i class="iconfont icon-guanbi Close" @click="close" ></i>
		<div class="graphic-box__title" style="margin-bottom:20px">
			<p style="font-size: 18px;font-weight: bold;">{{gra.attributes.NAME}}</p>
		</div>
		<div class="graphic-box__title">
			<p style="font-size: 14px;color:#7C7C7C">{{gra.attributes.TYPE}}</p>
		</div>
		<div class="graphic-box__title">
			<p style="font-size: 14px;color:#7C7C7C">暂无地址</p>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				gra:{
					attributes:{
						NAME:""
					}
				},
				isShow: false,
			}
		},
		methods:{
			showAddInfo(gra){
				this.gra=gra;
				this.isShow=true;
			},
			close(){
				this.isShow=false;
				this.$parent.popupPoint.search=null;
			}
		}
	}
</script>

<style scoped>
	.graphicbox {
			position: absolute;
			margin:-40px 0px 0px 17px;
			min-width: 200px;
			padding: 30px 0px 10px 0px;
			vertical-align: middle;
			background-color: #fff;
			border-radius: 4px;
			font-size: 18px;
			box-shadow:  0px 0px 1px 1px rgba(215, 219, 224, 1);
			text-align: left;
			backface-visibility: hidden;
			z-index: 2008;
			
		
		}
		.graphic-box__title {
			padding-left: 35px;
			padding-right: 35px;
			margin-bottom: 10px;
			height:15px;
			font-size: 14px;
			line-height: 1;
			color: #303133;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-align: left;
			-webkit-align-items: left;
			align-items: left;
			-webkit-box-pack: left;
			-webkit-justify-content: left;
			justify-content: left;
		}
		.graphic-box__btns {
			padding: 0px 15px 0;
			text-align: left;
		}
		.graphic-box__title span{
			width:94px;
			height:14px;
			text-align: left;
		}
		p{
			margin:0px;
		}
		.aphicbox:after,.graphicbox:before {
			position: absolute;
			left:-19px;
			top:25px;
			content: url(../../../static/images/三角形1.png);
			display:block;
			pointer-events: none;
		}
		.Close{
			
			cursor: pointer;
			position:absolute;
			top:10px;
			right:10px;
			font-size: 12px;
		}
</style>
