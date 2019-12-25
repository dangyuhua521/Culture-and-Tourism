<template>
	<div class="information white">
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
				<li :class="actIndex==0?'active':''" @click="actIndex=0"><i class="iconfont icon-gaishu"></i><span>概述</span></li>
				<li :class="actIndex==1?'active':''" @click="actIndex=1"><i class="iconfont icon-Bulletin"></i><span>快速入门</span></li>
				<li :class="actIndex==2?'active':''" @click="actIndex=2"><i class="iconfont icon-code"></i><span>实例代码</span></li>
			</ul>
		</div>
		<div class="new-list" v-show="actIndex==0">
			<el-row>
				<el-col :span="16">
					<div class="gaishu">
						<p>提供了丰富的地图服务API，它能够帮助您在网站中构建功能丰富、交互性强的电子地图应用。</p>
						<p> API for JavaScript不仅包含丰富的数据服务，还包含构建地图服务功能的基本接口，地图API的服务经授权后均可使用。</p>
						<p>JavaScript API是提供给那些具有一定HTML和JavaScript编程经验的用户使用的，此外读者还应该对地图产品有一定的了解。</p>
						<p>JavaScript API会尽量将复杂的地图内部处理逻辑进行隐藏和封装，以一种便于您理解的方式提供。您在使用中遇到任何问题，都可以反馈给我们。</p>
					</div>
				</el-col>
				<el-col :span="8">
					<img src="../../../static/images/API1.png" class="gaishu-img" />
				</el-col>
			</el-row>
			<el-row :gutter="15" style="margin-bottom: 50px;">
				<el-col :span="6">
					<div class="borders">
						<img src="../../../static/images/index_map1.jpg" />
					</div>
				</el-col>
				<el-col :span="6">
					<div class="borders">
						<img src="../../../static/images/index_map3.jpg" />
					</div>
				</el-col>
				<el-col :span="6">
					<div class="borders">
						<img src="../../../static/images/index_map2.jpg" />
					</div>
				</el-col>
				<el-col :span="6">
					<div class="borders">
						<img src="../../../static/images/index_map1.jpg" />
					</div>
				</el-col>
			</el-row>
			<el-row class="javascript">
				<el-col :span="7">
					<h1>为什么选择JavaScript</h1>
					<img src="../../../static/images/javascript.jpg" />
				</el-col>
				<el-col :span="17">
					<p>JavaScript是一项能增强网页交互性的脚本语言。当页面上的某些事件被触发后，该脚本语言直接通过浏览器将效果传递给用户。例如：单击一个按钮或漫游一幅地图，</p>
					<p>由于指令不传递给服务器，您不必等上一段时间，而且整个页面也不会闪烁或刷新。因此，使用JavaScript在您的应用程序中发布地图是一个明智的选择。</p>
					<p>使用JavaScript编译程序，您不必特地下载或安装任何东西。网络浏览器会自动解译JavaScript代码。在许多情况下，JavaScript代码可以直接被嵌入HTML页面中。</p>
					<p>JavaScript对于初学编程的人很容易上手。哪怕您从来没有使用过JavaScript进行编程，您也可以通过将示例中的代码复制和粘贴到您的HTML页面中，学习如何生成JavaScript应用程序。</p>
				</el-col>
			</el-row>
			<el-row class="circel2" :gutter="60">
				<el-col :span="10">
					<h2>借助于JavaScript API 您能为自己的网络应用程序添加哪些功能？</h2>
					<p>发布一份属于您自己的地图</p>
					<p>在线地图的基础上显示您自己的数据</p>
					<p>查询地图中的某些要素或属性并显示查询结果</p>
					<p>查询各类地址并显示结果</p>
				</el-col>
				<el-col :span="14" class="circel3">
					<h2>JavaScript API包括哪些内容？</h2>
					<p>加载地图——API支持显示动态和静态的地图服务。借助 JavaScript API，您可以在自己的网站中加入的地图服务。</p>
					<p>浏览地图——借助 JavaScript API 您可以放大、缩小、漫游、缩放您所加入的地图。</p>
					<p>地图工具—— JavaScript API允许用户实现距离量算、面积量算、POI模糊查询、精确查询等GIS功能。</p>
					<p>查询搜索——查询搜索基于JavaScript的地图数据检索计算接口，所有搜索结果都可以展现在电子地图上。</p>
				</el-col>
			</el-row>

		</div>
		<div class="new-list" v-show="actIndex==1">
			<div style="position: absolute;left: 70%;">
				<el-button type="primary" @click="clickDownload(1)">下载开发包<i class="el-icon-download el-icon--right"></i></el-button>
			</div>
			<div class="hh">
				<h2>1、在页面头部添加地图API引用地址，一般情况我们会把它添加到&lt;head&gt;区域中。</h2>
				<p> &lt;script type="text/javascript" src="./js/ol.js"&gt;&lt;/script&gt;</p>
				<p>&lt;link ref="stylesheet" type="text/css" href="./css/ol.css" &gt;</p>
			</div>
			<div class="hh">
				<h2>2、在页面中添加一个用于装载地图的容器：</h2>
				<p> &lt;div id="mapDiv" style="width:800px; height:600px; border:1px solid #000;"&gt;&lt;/div&gt;</p>
			</div>
				<div  class="hh">
				<h2>3、使用Javascript语言，创建地图对象：</h2>
				<p> var myMap;</p>
				<p>  function init() { myMap = new ol.Map({
					target:"mapDiv",
					view:new ol.View({
						center:[102.94701545650005, 30.182670725500117]
					})
					}); }</p>
			</div>
			<div  class="hh">
				<h2>4、使用addOnLoad方法执行init函数，创建地图：</h2>
				<p> &lt;body onload="init()" &gt;&lt;/body&gt;</p>
				<h2>5、完整代码示例如下：</h2>
			</div>
			<el-col>
				<pre class="htmledit_views" style=" background: #eef6fd;   border: #999 solid 2px;padding: 21px;">
		&lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;
		 &lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
		 &lt;head&gt;
		 &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
		 &lt;title&gt;mymap&lt;/title&gt;
		 &lt;link ref="stylesheet" type="text/css" href="./css/ol.css" &gt;
		 &lt;script type="text/javascript" src="./js/ol.js" &gt;&lt;/script&gt;
		 &lt;script type="text/javascript"&gt;
		 &lt;/head&gt;
		 &lt;body onload="init()"&gt;
		 var myMap;
		 function int(){
		 	myMap = new ol.Map({
			target:"mapDiv",
			view:new ol.View({
			center:[102.94701545650005, 30.182670725500117]})
			}); 
		}
		 var source=new ol.source.OSM();
		 var layer=new ol.layer.Tile({source:source});
		 myMap.addLayer(layer);
		 &lt;/script&gt;
		&lt;div id="mapDiv" style="width:800px; height:600px; border:1px solid #000;"&gt;&lt;/div&gt;
		 &lt;/body&gt;
		 &lt;/html&gt;
		
				</pre>
			</el-col>
		</div>
		<div class="new-list" v-show="actIndex==2">
			<div style="position: absolute;left: 70%;">
				<el-button type="primary" @click="clickDownloadCode(1)">下载实例代码<i class="el-icon-download el-icon--right"></i></el-button>
			</div>
			<div class="left-nav">
				<div class="nav-border">
					<el-menu  :default-active="actmenuid" unique-opened class="el-menu-vertical-demo" @select="handselect">
						<el-submenu v-for="(item ,i) in menuData" :key="i" :index="item.index" v-if="item.children&&item.children.length>0">						
								<template slot="title"><span><i class="iconfont icon-wenjianjia"></i>{{item.name}}</span></template>
							<el-menu-item  v-for="(child,j) in item.children" :key="j" :index="child.index">
								<i class="iconfont icon-wenjian"></i>{{child.name}}
							</el-menu-item>						
						</el-submenu> 
						<el-menu-item v-else :index="item.index">
							<i class="iconfont icon-wenjian"></i>{{item.name}}
						</el-menu-item>
						<!-- <el-submenu index="1">
							<template slot="title"><span><i class="iconfont icon-wenjianjia"></i>地图服务</span></template>
							<el-menu-item index="1-1"><i class="iconfont icon-wenjian"></i>OGC WMS</el-menu-item>
				          <el-menu-item index="1-2"><i class="iconfont icon-wenjian"></i>OGC WMTS服务</el-menu-item>
						</el-submenu> -->
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
					<img src="../../../static/images/qrcode.jpg" />
					<p>天府新区地理信息公共服务</p>
				</div> -->
			</div>
			<ogcwms v-if="actmenuid=='1-1'"></ogcwms>
			<ogcwmts v-if="actmenuid=='1-2'"></ogcwmts>
			<ogcwfs v-if="actmenuid=='1-3'"></ogcwfs>
			<ogckml v-if="actmenuid=='1-4'"></ogckml>
			<ogcwfsg v-if="actmenuid=='1-5'"></ogcwfsg>
			<featuressearch v-if="actmenuid=='2-1'"></featuressearch>
			<measure v-if="actmenuid=='2-2'"></measure>
			<buffer v-if="actmenuid=='2-3'"></buffer>
			<union v-if="actmenuid=='2-4'"></union>
			<spacestatistics v-if="actmenuid=='2-5'"></spacestatistics>
			<drawfearure v-if="actmenuid=='3-1'"></drawfearure>
			<editfeature v-if="actmenuid=='3-2'"></editfeature>
			<TheamticChart v-if="actmenuid=='4'"></TheamticChart>
			<muiltkeywordssearch v-if="actmenuid=='5-1'"></muiltkeywordssearch>
			<typesearch v-if="actmenuid=='5-2'"></typesearch>
			<getCapabilities v-if="actmenuid=='6'"></getCapabilities>
		</div>
	</div>
</template>

<script>
	import subBanner from './../model/subBanner.vue'
	//  版本控制
	//默认
	// import ogcwms from './examples/ogcwms'
	// import ogcwmts from './examples/ogcwmts'
	// import ogcwfs from './examples/ogcwfs'
	// import ogckml from './examples/ogckml'
	// import featuressearch from './examples/featuressearch'
	// import measure from './examples/measure'
	// import drawfearure from './examples/drawfearure'
	// import editfeature from './examples/editfeature'
	// import buffer from './examples/buffer'
	// import union from './examples/union'
	// import spacestatistics from './examples/spacestatistics'
	// import muiltkeywordssearch from './examples/muiltkeywordssearch'
	// import typesearch from './examples/typesearch'
	// import getCapabilities from './examples/getCapabilities'
	// import ogcwfsg from './examples/ogcwfsg'
	// import TheamticChart from './examples/TheamticChart'

	//政务版
	// import ogcwms from './examples_政务版/ogcwms'
	// import ogcwmts from './examples_政务版/ogcwmts'
	// import ogcwfs from './examples_政务版/ogcwfs'
	// import ogckml from './examples_政务版/ogckml'
	// import featuressearch from './examples_政务版/featuressearch'
	// import measure from './examples_政务版/measure'
	// import drawfearure from './examples_政务版/drawfearure'
	// import editfeature from './examples_政务版/editfeature'
	// import buffer from './examples_政务版/buffer'
	// import union from './examples_政务版/union'
	// import spacestatistics from './examples_政务版/spacestatistics'
	// import muiltkeywordssearch from './examples_政务版/muiltkeywordssearch'
	// import typesearch from './examples_政务版/typesearch'
	// import getCapabilities from './examples_政务版/getCapabilities'
	// import ogcwfsg from './examples_政务版/ogcwfsg'
	// import TheamticChart from './examples_政务版/TheamticChart'

	//公众版
	import ogcwms from './examples_公众版/ogcwms'
	import ogcwmts from './examples_公众版/ogcwmts'
	import ogcwfs from './examples_公众版/ogcwfs'
	import ogckml from './examples_公众版/ogckml'
	import featuressearch from './examples_公众版/featuressearch'
	import measure from './examples_公众版/measure'
	import drawfearure from './examples_公众版/drawfearure'
	import editfeature from './examples_公众版/editfeature'
	import buffer from './examples_公众版/buffer'
	import union from './examples_公众版/union'
	import spacestatistics from './examples_公众版/spacestatistics'
	import muiltkeywordssearch from './examples_公众版/muiltkeywordssearch'
	import typesearch from './examples_公众版/typesearch'
	import getCapabilities from './examples_公众版/getCapabilities'
	import ogcwfsg from './examples_公众版/ogcwfsg'
	import TheamticChart from './examples_公众版/TheamticChart'

	export default {
		data() {
			return {
				actIndex: 0,
				openeds: ['1', '2'],
				actmenuid:'1-1',
				code: '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">',
				menuData:[{
					name:"地图服务",
					index:"1",
					children:[
						{
							name:"OGC WMS服务",
							index:"1-1",
						},
						{
							name:"OGC WMTS服务",
							index:"1-2",
						},
// 						{
// 							name:"OGC WFS服务",
// 							index:"1-3",
// 						},
						{
							name:"OGC KML",
							index:"1-4",
						},
// 						{
// 							name:"OGC WFS-G",
// 							index:"1-5",
// 						}
					]
				},
				{
					name:"空间分析",
					index:"2",
					children:[
// 						{
// 							name:"图属查询",
// 							index:"2-1",
// 						},
// 						{
// 							name:"地图测量",
// 							index:"2-2",
// 						},
						{
							name:"缓冲分析",
							index:"2-3",
						}
						,
						{
							name:"叠加分析",
							index:"2-4",
						}
// 						,
// 						{
// 							name:"空间统计分析",
// 							index:"2-5",
// 						}
					]
				},
// 				{
// 					name:'空间处理接口',
// 					index:'3',
// 					children:[
// 						{
// 							name:'在线标注',
// 							index:'3-1'
// 						},{
// 							name:'图形编辑',
// 							index:'3-2'
// 						}
// 					]
// 				},
// 				{
// 					name:'专题图接口',
// 					index:'4'
// 				},
// 				{
// 					name:'搜索服务接口',
// 					index:'5',
// 					children:[
// 						{
// 							name:'多关键字查询',
// 							index:'5-1'
// 						},
// 						{
// 							name:'分类检索',
// 							index:'5-2'
// 						}
// 					]
// 				},
// 				{
// 					name:'元数据接口获取',
// 					index:'6',
// 
// 				}
				],

			}
		},
		components: {
			subBanner,
			ogcwms,
			ogcwmts,
			ogcwfs,
			ogckml,
			featuressearch,
			measure,
			drawfearure,
			editfeature,
			buffer,
			union,
			spacestatistics,
			muiltkeywordssearch,
			typesearch,
			getCapabilities,
			ogcwfsg,TheamticChart
		},
		methods: {
			handselect(index){
				this.actmenuid=index;
			},
			clickDownloadCode(val) {
    //   var token = getToken();
      console.log(val);
      var form = $("<form>");

      //设置表单状态为不显示
      form.attr("style", "display:none");
	  form.attr('target','downloadForm')
      // form.attr('target','myIframe')

      //method属性设置请求类型为post
      form.attr("method", "get");

      //action属性设置请求路径,
      //请求类型是post时,路径后面跟参数的方式不可用
      //可以通过表单中的input来传递参数
      form.attr(
        //数据接口
        //   "action","http://172.18.0.18:7100/pp/action/api/SystemFile/DownTaskDataFile"
        "action",
        this.BaseDownURL + "/SystemFile/DownApiHelpFileCode"
      );

      $("body").append(form); //将表单放置在web中
   
      form.submit();
      //表单提交
      this.$nextTick(() => {
        form.remove();
      });
    },	clickDownload(val) {
    //   var token = getToken();
      console.log(val);
      var form = $("<form>");

      //设置表单状态为不显示
      form.attr("style", "display:none");
	  form.attr('target','downloadForm')
      // form.attr('target','myIframe')

      //method属性设置请求类型为post
      form.attr("method", "get");

      //action属性设置请求路径,
      //请求类型是post时,路径后面跟参数的方式不可用
      //可以通过表单中的input来传递参数
      form.attr(
        //数据接口
        //   "action","http://172.18.0.18:7100/pp/action/api/SystemFile/DownTaskDataFile"
        "action",
        this.BaseDownURL + "/SystemFile/DownApiHelpFile"
      );

      $("body").append(form); //将表单放置在web中

      //在表单中添加input标签来传递参数
      //如有多个参数可添加多个input标签
    //   var input1 = $("<input>");
    //   input1.attr("type", "hidden"); //设置为隐藏域
    //   input1.attr("name", "token"); //设置参数名称
    //   input1.attr("value", token); //设置参数值
    //   form.append(input1); //添加到表单中

    //   var input2 = $("<input>");
    //   input2.attr("type", "hidden"); //设置为隐藏域
    //   input2.attr("name", "TASKFILEID"); //设置参数名称
    //   input2.attr("value", val); //设置参数值
    //   form.append(input2); //添加到表单中

      // window.open(window.location. origin + '/a/b/c')
      form.submit();
      //表单提交
      this.$nextTick(() => {
        form.remove();
      });
    }
		},
		watch: {

		},
		created() {

		},
		mounted() {
			if(this.$route.query.id){
				this.actIndex=2
				this.actmenuid=this.$route.query.id
			}
			document.getElementById("target").scrollIntoView();
		},
		destoryed() {

		}
	}
</script>
<style scoped="scoped">
	.icon-wenjianjia{
		color: #fdb14e;
		margin-right: 5px;
	}
	.htmledit_views{line-height: 2em;}
	.introduce {
		padding: 20px 50px;
		background: #dcefff;
		margin-top: 50px;
	}
	
	.introduce p {
		line-height: 2.5em;
	}
	
	.codes {
		background: #eef6fd;
		padding: 50px;
	}
	
	.information {
		background: #FFFFFF;overflow-x: hidden;
	}
	
	.new-list {
		width: 1270px;
		margin: 0 auto;
		padding-bottom: 70px;
	}
	
	.new-page {
		margin-top: 70px;
		text-align: center;
	}
	
	.new-care:hover .add-more,
	.new-care:hover .new-date {
		background: #108ee9;
	}
	
	.new-care:hover .new-date h3 {
		color: #FFFFFF;
	}
	
	.new-care {
		width: 44%;
		cursor: pointer;
		position: relative;
		margin-left: -4px;
		margin: 0 3%;
		margin-top: 70px;
		display: inline-block;
	}
	
	.add-more {
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
	
	.new-date {
		display: inline-block;
		width: 60px;
		height: 60px;
		border: 1px solid #108ee9;
		padding: 10px 0;
	}
	
	.new-date h3 {
		color: #108ee9;
		font-size: 20px;
		text-align: center;
	}
	
	.new-date p {
		line-height: 2em;
		color: #9fc2e9;
		font-size: 13px;
		text-align: center;
	}
	
	.new-content {
		display: inline-block;
		vertical-align: top;
		margin-left: 30px;
		width: calc(100% - 100px);
	}
	
	.new-title {
		font-size: 18px;
		color: #333333;
		margin-bottom: 1.5em;
		position: relative;
	}
	
	.new-title::after {
		position: absolute;
		bottom: -0.7rem;
		height: 1px;
		width: 30px;
		content: "";
		left: 0;
		background: #0080FF;
	}
	
	.new-content p {
		color: #999999;
		font-size: 14px;
		line-height: 1.6em;
	}
	
	.nav {
		position: absolute;
		z-index: 999;
		height: 72px;
		line-height: 72px;
		top: 0;
		left: 50%;
		margin-left: -223px;
	}
	
	.nav li {
		padding: 0 35px;
		display: inline-block;
		border-left: 1px solid #e7edf2;
		cursor: pointer;
		margin-left: -5px;
	}
	
	.nav li.active {
		background: #e7edf2;
	}
	
	.nav li.active i {
		color: #409bf6;
	}
	
	.nav li:last-of-type {
		border-right: 1px solid #e7edf2;
	}
	
	.nav li span {
		padding-left: 10px;
	}
	
	.nav-animate,
	.nav-bg {
		position: relative;
		width: 100%;
		height: 72px;
		overflow: hidden;
		border-bottom: 1px solid #e7edf2;
	}
	
	.circle {
		position: absolute;
		border-radius: 100px;
		background: #61efa6;
		/* For browsers that do not support gradients */
		background: -webkit-linear-gradient(#1da299, #61efa6);
		/* For Safari 5.1 to 6.0 */
		background: -o-linear-gradient(#1da299, #61efa6);
		/* For Opera 11.1 to 12.0 */
		background: -moz-linear-gradient(#1da299, #61efa6);
		/* For Firefox 3.6 to 15 */
		background: linear-gradient(#1da299, #61efa6);
		/* Standard syntax */
		opacity: 0.1;
	}
	
	.circle1 {
		width: 50px;
		height: 50px;
		left: 400px;
		top: 20px;
		animation: circles1 20s infinite linear;
	}
	
	.circle2 {
		width: 20px;
		height: 20px;
		left: 280px;
		top: 50px;
		animation: circles2 10s infinite linear;
	}
	
	.circle3 {
		width: 120px;
		height: 120px;
		left: 320px;
		top: -60px;
		animation: circles3 15s infinite linear;
	}
	
	.circle4 {
		width: 50px;
		height: 50px;
		top: 10px;
		right: 300px;
		animation: circles4 15s infinite linear;
	}
	
	.circle5 {
		width: 20px;
		height: 20px;
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
		50% {
			top: -20px;
			left: 480px;
		}
		75% {
			top: 00px;
			left: 460px;
		}
		100% {
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
		50% {
			left: 320px;
			top: -20px;
		}
		75% {
			top: -30px;
			left: 300px;
		}
		100% {
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
		50% {
			left: 300px;
			top: 20px;
		}
		75% {
			top: 60px;
			left: 350px;
		}
		100% {
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
		50% {
			right: 150px;
			top: 20px;
		}
		75% {
			top: 40px;
			right: 350px;
		}
		100% {
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
		50% {
			right: 100px;
			top: 10px;
		}
		75% {
			top: 40px;
			right: 200px;
		}
		100% {
			top: 10px;
			right: 250px;
		}
	}
	
	.new-list {
		width: 1270px;
		margin: 50px auto 0;
		overflow: hidden;
	}
	
	.gaishu {
		display: inline-block;
		vertical-align: bottom;
		padding-top: 100px;
	}
	
	.gaishu p {
		line-height: 1.5em;
		color: #333333;
		font-size: 16px;
		margin-bottom: 2em;
		padding-left: 30px;
		background: url(../../../static/images/cirle.png)left 8px no-repeat;
	}
	
	.gaishu-img {
		vertical-align: bottom;
		display: inline-block;
	}
	
	.white {
		background: #FFFFFF;
	}
	
	.borders {
		padding: 10px;
		border: 1px solid #E7EDF2;
	}
	
	.borders img {
		width: 100%;
	}
	
	.javascript {}
	
	.javascript h1 {
		font-size: 30px;
	}
	
	.javascript p {
		line-height: 1.5em;
		margin-bottom: 20px;
	}
	
	.circel2 {
		margin-top: 30px;
	}
	
	.circel2 h2 {
		font-size: 24px;
		line-height: 1.4em;
		margin-bottom: 30px;
	}
	
	.circel2 p {
		background: url(../../../static/images/cirle2.png)no-repeat left 8px;
		padding-left: 20px;
		line-height: 1.5em;
		margin-bottom: 20px;
	}
	
	.circel3 p {
		background: url(../../../static/images/cirle3.png)no-repeat left 8px;
	}
	.left-nav .el-menu-item:focus, .left-nav .el-menu-item:hover{
		text-decoration: none;
	} 
	.hh p{
		font-size: 18px;
		line-height: 1.4em;
		padding-left: 30px;
		margin-top: 15px
	}
	.hh h2{
		font-size: 20px;
		line-height: 1.5em;
		padding-left: 30px;
		background: url(../../../static/images/cirle.png)left 8px no-repeat;
		margin-top: 15px;
		font-weight: bold
	}
</style>