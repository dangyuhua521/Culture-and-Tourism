<template>
	<div id="grainfobox_div" class="graphic-box" v-show="isShow">
		<div class="graphic-box__header">
			<div class="graphic-box__title">
				<span>标注标题</span>
			</div>
			<button type="button" aria-label="Close" class="graphic-box__headerbtn" @click="close_infoBox">
				<i class="el-message-box__close el-icon-close"></i>
			</button>
			<el-input v-model="title" placeholder="请输入标题" size="mini"></el-input>
		</div>

		<div class="graphic-box__content">
			<div class="graphic-box__title">
				<span>标注内容</span>
			</div>
			<div class="el-message-box__message">
				<el-input type="textarea" v-model="textContent"></el-input>
			</div>
		</div>
		<div class="graphic-symbol">
			<div class="graphic-symbol__cont" v-if="type=='point'">
				<span>图钉颜色</span>
				<el-select v-model="attributes.style" placeholder="请选择" size="mini" style="width:80px;">
					<el-option v-for="item in op_point_style" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="graphic-symbol__cont" v-if="type=='gon'||type=='line'">
				<span>内部填充</span>

				<el-color-picker v-model="fillcolor" show-alpha size="mini"></el-color-picker>

			</div>
			<div class="graphic-symbol__cont" v-if="type=='gon'">
				<span>边框颜色</span>

				<el-color-picker v-model="attributes.symbol.outline.color" show-alpha size="mini"></el-color-picker>
			</div>
			<div class="graphic-symbol__cont" v-if="type=='gon'">
				<span>边框粗细</span>

				<el-input size="mini" placeholder="请输入内容" v-model="attributes.symbol.outline.width" style="width:80px;">
				</el-input>

			</div>
			<div class="graphic-symbol__cont" v-if="type=='line'">
				<span>线宽度</span>

				<el-input size="mini" placeholder="请输入内容" v-model="attributes.symbol.width" style="width:100px;">
				</el-input>

			</div>
			<!-- <div class="graphic-symbol__cont">
    				<span>共享范围</span>
    					<el-select v-model="attributes.shareTo" placeholder="请选择" size="mini" style="width:80px;">
    						<el-option label="个人" value="0"></el-option>
    						<el-option label="部门" value="1"></el-option>
    						<el-option label="公开" value="2"></el-option>
    					</el-select>
    				</div> -->
		</div>
		<div class="graphic-box__btns">
			<div style="width:100%;float: right;margin-top:10px;">
				<button style="color:#000000;background-color: #FFFFFF;" size="mini" class="el-button el-button--default el-button--small el-button--primary "
				 @click="del_infoBox">
					取消
				</button>
				<button type="button" size="mini" class="el-button el-button--default el-button--small el-button--primary " @click="save_infoBox">
					确定
				</button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				attributes: {
					symbol: {
						type: "simple-line", // autocasts as SimpleFillSymbol
						color: [255, 0, 0, 1],
						width: "3px",
						style: "solid",
						outline: {
							// autocasts as SimpleLineSymbol
							color: "#EFF1F4",
							width: '1px'
						}
					}
				},
				isShow: false,
				textContent: "",
				title: "",
				type: "",
				fillcolor: null,
				size: null,
				width: null,
				op_point_style: [{
					value: 'green',
					label: '绿色'
				}, {
					value: 'orange',
					label: '橘色'
				}, {
					value: 'zise',
					label: '紫色'
				}, {
					value: 'red',
					label: '红色'
				}, {
					value: 'blue',
					label: '蓝色'
				}, {
					value: 'pink',
					label: '粉色'
				}],
				tuding: {
					green: "../../../static/images/tuding/1.png",
					orange: "../../../static/images/tuding/2.png",
					zise: "../../../static/images/tuding/3.png",
					red: "../../../static/images/tuding/4.png",
					blue: "../../../static/images/tuding/5.png",
					pink: "../../../static/images/tuding/5.png"
				}
			};
		},
		methods: {
			showAddInfo(fe) {
				this.attributes = fe.attributes;
				this.title = this.attributes.title;
				this.textContent = this.attributes.content;
				this.type = this.attributes.type;
				// this.fillcolor=this.attributes.symbol.color;
				// this.outlinecolor=this.attributes.symbol.outline.color;

				this.$nextTick(() => {
					if (this.attributes.type=="gon"||this.attributes.type=="line") {
						this.fillcolor = "rgba(" + this.attributes.symbol.color[0] + "," + this.attributes.symbol.color[
								1] + "," + this.attributes.symbol.color[2] + "," + this.attributes.symbol.color[3] +
							")"
					}

				})

				this.isShow = true;
			},
			close_infoBox() {
				this.isShow = false;
			},
			del_infoBox() {
				this.close_infoBox();
			},
			save_infoBox() {
				if (this.type == "point") {
					this.$parent.savaGraInfo(this.attributes.id, this.title, this.textContent, this.attributes.style,this.attributes.KEYID);
					this.close_infoBox();
				}else	if (this.fillcolor&&this.fillcolor!="" && this.attributes.symbol.outline.color) {
					var datastr = this.fillcolor.slice(5, this.fillcolor.lastIndexOf(")"));
					console.log(datastr);
					this.attributes.symbol.color = [];
					for (var i = 0; i < 4; i++) {
						this.attributes.symbol.color.push(datastr.split(",")[i]);
					}
					console.log("color", this.attributes.symbol.color);
					// this.$emit("savaGraInfo", this.attributes.id, this.title, this.textContent, this.symbol);
					this.$parent.savaGraInfo(this.attributes.id, this.title, this.textContent, this.attributes.symbol,this.attributes.KEYID);
					this.close_infoBox();
				} 
// 				else {
// 					this.$message({
// 						message: '内部填充和边框颜色不能为空',
// 						type: 'warning'
// 					});
// 				}

			}
		}
	};
</script>
<style scoped>
	.graphic-box {
		position: absolute;
		margin: -65px 0px 0px 17px;
		width: 320px;
		padding-bottom: 10px;
		vertical-align: middle;
		background-color: #fff;
		border-radius: 4px;
		font-size: 18px;
		box-shadow: 0px 0px 4px 3px rgba(215, 219, 224, 1);
		text-align: left;
		backface-visibility: hidden;
	}

	.graphic-box__header {
		position: relative;
		padding: 15px;
		padding-bottom: 0px;
	}

	.graphic-box__content {
		position: relative;
		padding: 5px 15px;
		color: #606266;
		font-size: 14px;
	}

	.graphic-box__btns {
		padding: 0px 15px 0;
		width: 100%;
		text-align: right;
		margin-top: 10px;
	}

	.graphic-box__title {
		padding-left: 0;
		margin: 5px;
		font-size: 14px;
		line-height: 1;
		color: #303133;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: left;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: left;
		justify-content: left;
	}

	.graphic-box__headerbtn {
		position: absolute;
		top: 15px;
		right: 15px;
		padding: 0;
		border: none;
		outline: none;
		background: transparent;
		font-size: 12px;
		cursor: pointer;
	}

	.graphic-symbol {

		padding: 5px 10px;
		display: block;
	}

	.graphic-symbol .graphic-symbol__cont {
		width: 150px;
		height: 45px;
		padding: 0px;
		margin: 0;
		float: left;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: left;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: left;
		justify-content: left;
	}

	.graphic-symbol .graphic-symbol__cont span {
		width: 60px;
		height: 20px;
		text-align: right;
		font-size: 14px;
		padding: 0;
		display: inline;
		margin: 0 5px 0 0;

	}

	.graphic-box:after,
	.graphic-box:before {
		position: absolute;
		left: -19px;
		top: 50px;
		content: url(../../../static/images/三角形1.png);
		display: block;
		pointer-events: none;
		/* transform: rotate(90deg); */
		/* border-color: #FFFFFF; */
	}
</style>
