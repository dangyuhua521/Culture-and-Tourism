<template>
	<div id="map">
		<div class="search">

			<el-input placeholder="请输入相关内容" v-show="!search2Bol" prefix-icon="el-icon-search" @focus="inputFocus()" v-model="queryDate1.NAME"
			 @keyup.enter.native="emptySearchMap"></el-input>
			<div class="menhuInput" v-show="search2Bol">
				<span class="menhuInputLabel">在
					<span>{{data.dataName|names}}</span><span v-if='speachBol==false'>附近搜索</span><span v-else>空间范围内搜索</span>
				</span>
				<el-input v-model="queryDate2.NAME" @keyup.enter.native="emptySearchMap"></el-input>
			</div>
			<el-button class="search-btn" @click="emptySearchMap()">搜索</el-button>
			<i class="iconfont icon-guanbi myClose" @click="closeSearch()" v-if="queryDate1.NAME!=''||queryDate1.TYPE1!=''||searchRes.length>0||speachBol==true"></i>
		</div>

		<div class="showBox">
			<div class="search-ad" v-show="actRight=='showData2'">
				<div class="search-back" @click="returnList()">
					<i class="el-icon-arrow-left"></i>
					<span>返回上一级的搜索结果</span>
					<!-- <span v-if="queryDate2.NAME!=''">返回“{{queryDate2.NAME | names}}”的搜索结果</span>
					<span v-else>返回上一级的搜索结果</span> -->
				</div>
				<div class="search-bg">
					<el-row :gutter="10">
						<el-col :span="16">
							<div class="search-detail">
								<h5>{{data2.dataName}}</h5>
								<p>
									<i class="el-icon-location"></i>
									{{data2.dataAddress}}
								</p>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="search-img">
								<!-- <img src="../../../static/images/search-sj-img.jpg" width="102" height="67" /> -->
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<div class="search-ad" v-show="actRight=='showData'">
				<div class="search-back" v-if="speachBol==false&&(queryDate1.NAME!=''||queryDate1.TYPE1!=''||queryDate1.TYPE2!='')"
				 @click="returnList(1)">
					<i class="el-icon-arrow-left"></i>
					<span v-if="queryDate1.NAME!=''">返回“{{queryDate1.NAME | names }}”的搜索结果</span>
					<span v-else>返回上一级的搜索结果</span>
				</div>
				<div class="search-bg">
					<el-row :gutter="10">
						<el-col :span="16">
							<div class="search-detail">
								<h5>{{data.dataName}}</h5>
								<p>
									<i class="el-icon-location"></i>
									{{data.dataAddress}}
								</p>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="search-img">
								<!-- <img src="../../../static/images/search-sj-img.jpg" width="102" height="67" /> -->
							</div>
						</el-col>
					</el-row>
				</div>
				<div class="search-zb" v-if="speachBol==false" @click="searchKuaicha()">周边快查
					<i class="el-icon-arrow-right" style="float: right;"></i>
				</div>
				<div class="search-ad-type">
					<ul>
						<li @click="selectType('政府',3)">
							<i class="map-icon-government"></i>
							<p>政府</p>
						</li>
						<li @click="selectType('企业',3)">
							<i class="map-icon-company"></i>
							<p>企业</p>
						</li>
						<li @click="selectType('交通',3)">
							<i class="map-icon-traffic"></i>
							<p>交通</p>
						</li>
						<li @click="selectType('教育',3)">
							<i class="map-icon-education"></i>
							<p>教育</p>
						</li>
						<li @click="selectType('医疗',3)">
							<i class="map-icon-medical"></i>
							<p>医疗</p>
						</li>
						<li @click="selectType('娱乐',3)">
							<i class="map-icon-entertainment"></i>
							<p>娱乐</p>
						</li>
						<li @click="selectType('餐饮',3)">
							<i class="map-icon-food"></i>
							<p>餐饮</p>
						</li>
					</ul>
					<ul>
						<li @click="selectType('住宿',3)">
							<i class="map-icon-accommodation"></i>
							<p>住宿</p>
						</li>
						<li @click="selectType('购物',3)">
							<i class="map-icon-shopping"></i>
							<p>购物</p>
						</li>
						<li @click="selectType('金融',3)">
							<i class="map-icon-financial"></i>
							<p>金融</p>
						</li>
						<li @click="selectType('服务',3)">
							<i class="map-icon-service"></i>
							<p>服务</p>
						</li>
						<li @click="selectType('景点',3)">
							<i class="map-icon-attractions"></i>
							<p>景点</p>
						</li>
						<li @click="selectType('体育',3)">
							<i class="map-icon-sports"></i>
							<p>体育</p>
						</li>
						<li @click="selectType('其它',3)">
							<i class="map-icon-other"></i>
							<p>其它</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="search-ad" v-show="actRight=='Hover'">
				<div class="search-ad-type">
					<ul>
						<li @click="selectType('政府',1)">
							<i class="map-icon-government"></i>
							<p>政府</p>
						</li>
						<li @click="selectType('企业',1)">
							<i class="map-icon-company"></i>
							<p>企业</p>
						</li>
						<li @click="selectType('交通',1)">
							<i class="map-icon-traffic"></i>
							<p>交通</p>
						</li>
						<li @click="selectType('教育',1)">
							<i class="map-icon-education"></i>
							<p>教育</p>
						</li>
						<li @click="selectType('医疗',1)">
							<i class="map-icon-medical"></i>
							<p>医疗</p>
						</li>
						<li @click="selectType('娱乐',1)">
							<i class="map-icon-entertainment"></i>
							<p>娱乐</p>
						</li>
						<li @click="selectType('餐饮',1)">
							<i class="map-icon-food"></i>
							<p>餐饮</p>
						</li>
					</ul>
					<ul>
						<li @click="selectType('住宿',1)">
							<i class="map-icon-accommodation"></i>
							<p>住宿</p>
						</li>
						<li @click="selectType('购物',1)">
							<i class="map-icon-shopping"></i>
							<p>购物</p>
						</li>
						<li @click="selectType('金融',1)">
							<i class="map-icon-financial"></i>
							<p>金融</p>
						</li>
						<li @click="selectType('服务',1)">
							<i class="map-icon-service"></i>
							<p>服务</p>
						</li>
						<li @click="selectType('景点',1)">
							<i class="map-icon-attractions"></i>
							<p>景点</p>
						</li>
						<li @click="selectType('体育',1)">
							<i class="map-icon-sports"></i>
							<p>体育</p>
						</li>
						<li @click="selectType('其它',1)">
							<i class="map-icon-other"></i>
							<p>其它</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="search-ad" v-show="actRight=='Hover2'||actRight=='Poi'">
				<div v-show="(actRight=='Hover2'||actRight=='Poi')&&search2Bol==false" class="zui-autoH">
					<div class="search-back">
						<span class="huitui" style="cursor: pointer;" @click="returnHover()">分类搜索</span>
						<span @click="returnHover(2)">
							<i class="el-icon-arrow-right"></i>
							{{queryDate1.TYPE1}}
						</span>
						<span v-show="queryDate1.TYPE2!=''">
							<i class="el-icon-arrow-right"></i>
							{{queryDate1.TYPE2}}
						</span>
					</div>
					<div class="search-ad-type">
						<el-button type="text" v-for="(item,index) in typeData2" @click="selectType(item.typeName,2)">{{item.typeName}}</el-button>
					</div>
				</div>
				<div v-if="search2Bol==true" class="zui-autoH">
					<div v-if="speachBol==false" class="search-back" @click="returnList(2)">
						<i class="el-icon-arrow-left"></i>返回一级搜索结果
					</div>
					<div class="search-top">
						<span style="margin-left:10px">你总共搜索到了</span>
						<span style="color:#FF6000">{{dataTotal}}个</span>
						<span style="color:#0072FC">{{queryDateNAME}}</span>
					</div>
				</div>
				<div v-if="actRight=='Poi'">
					<el-scrollbar id="hideX2" class="hideXX">
						<div v-for="(item,index) in searchRes" :class="{message:true,mesHover:hoverIndex==index}" @mouseenter="enter(index,item.geometry)"
						 @mouseleave="leave(index,index,item.geometry)">
							<div class="message-title">
								<!-- <i class="iconfont icon-dingwei" @click="positGoto(data.id)" style="margin-right:10px;"></i> -->
								<img :src="marker.red[index+1]" v-if="hoverIndex!=index" style="margin-right:10px">
								<img :src="marker.blue[index+1]" v-if="hoverIndex==index" style="margin-right:10px">
								<el-button type="text" @click="mapview(item)">{{item.attributes.NAME}}</el-button>
								<!-- <el-button type="text" @click="mapview(item.feature,item.value)" v-if="item.foundFieldName">{{item.feature.attributes[item.foundFieldName]}}</el-button>
                <el-button type="text" @click="mapview(item.feature,item.value)" v-if="!item.foundFieldName">{{item.feature.attributes[item.displayFieldName]}}</el-button>-->
							</div>
							<div class="message-content">
								<span>{{item.attributes.ADDRESS}}</span>
								<!-- <span v-if="!item.foundFieldName">{{item.feature.attributes[item.displayFieldName]}}</span> -->
							</div>
							<hr style="border-color:#F2F2F2 ;border-width:0.72px ;margin-top:16px;margin-bottom: 0px;">
						</div>
					</el-scrollbar>
					<span v-if="searchRes.length==0" class="nodata">暂无数据</span>
					<div style="text-align: center;width:100%;margin:15px 0;">
						<span>
							<el-pagination small background layout="prev,pager,next" :page-size="10" :total="parseInt(this.dataTotal)"
							 :page-count="5" @current-change="handleCurrentChange" :current-page.sync="currentPage"></el-pagination>
						</span>
					</div>
				</div>
			</div>
			<!-- <div class="search-ad" v-show="searchRes.length>0&&actRight=='Poi'">
				<div v-if="search2Bol==true&&speachBol==false" class="search-back" @click="returnList(2)">
					<i class="el-icon-arrow-left"></i>返回一级搜索结果
				</div>
				<div class="search-top">
					<span style="margin-left:10px">你总共搜索到了</span>
					<span style="color:#FF6000">{{dataTotal}}个</span>
					<span style="color:#0072FC">{{queryDateNAME}}</span>
				</div>

				<el-scrollbar class="hideXX">
					<div v-for="(item,index) in searchRes" :class='{message:true,mesHover:hoverIndex==index}' @mouseenter="enter(index,item.geometry)"
					 @mouseleave="leave(index,index,item.geometry)">
						<div class="message-title">
							
							<img :src="marker.red[index+1]" v-if="hoverIndex!=index" style="margin-right:10px" />
							<img :src="marker.blue[index+1]" v-if="hoverIndex==index" style="margin-right:10px" />
							<el-button type="text" @click="mapview(item)">{{item.attributes.NAME}}</el-button>
							</div>
						<div class="message-content">
							<span>{{item.attributes.ADDRESS}}</span>
						
						</div>
						<hr style="border-color:#F2F2F2 ;border-width:0.72px ;margin-top:16px;margin-bottom: 0px;">
					</div>
				</el-scrollbar>
				<span v-if="searchRes.length==0" class="nodata">暂无数据</span>
				<div style="text-align: center;width:100%;margin:15px 0;">
					<span>
						<el-pagination small background layout="prev,pager,next" :page-size="10" :total="parseInt(this.dataTotal)"
						 :page-count="5" @current-change="handleCurrentChange" :current-page.sync="currentPage">
						</el-pagination>
					</span>
				</div>

      </div>-->
			<div class="search-ad" v-show="labelData.length>0&&actRight=='label'">
				<div class="search-top">
					<span style="margin-left:30px;">我的标注</span>
					<el-button size="mini" round style="position:relative;right: -188px;" @click="turnAddLabel()">关闭标注</el-button>
				</div>
				<el-scrollbar class="hideXX">
					<div v-for="(item,index) in labelData" class="message">
						<div class="message-title">
							<!-- <i class="iconfont icon-dingwei" @click="positGoto(data.id)" style="margin-right:10px;"></i> -->
							<img :src="marker.white[1]" style="margin-right:10px">

							<el-button type="text" @click="laebelview(item)" style="width:250px;text-align: left;">{{item.title}}</el-button>
							<!-- <el-button type="text" @click="mapview(item.feature,item.value)" v-if="item.foundFieldName">{{item.feature.attributes[item.foundFieldName]}}</el-button>
              <el-button type="text" @click="mapview(item.feature,item.value)" v-if="!item.foundFieldName">{{item.feature.attributes[item.displayFieldName]}}</el-button>-->
							<i class="iconfont icon-guanbi" @click="delGraInfo(item.keyid)" style="float:right;font-size: 15px;cursor: pointer;float: right;position: relative; right: -39px; top: 1px;"></i>
							<img src="../../../static/images/check.png" class="isCheck2" v-show="item.ischeck">
							<!-- v-show="item.isCheck" -->
						</div>
						<div class="message-content">
							<span>{{item.remark}}</span>
							<!-- <span v-if="!item.foundFieldName">{{item.feature.attributes[item.displayFieldName]}}</span> -->
						</div>
						<hr style="border-color:#F2F2F2 ;border-width:0.72px;">
					</div>
					<el-button size="mini" round style="position:relative;right:-108px;;" @click="allcalLabel()">全部隐藏</el-button>
					<el-button size="mini" round style="position:relative;right:-96px;" @click="allAddLabel()">全部加载</el-button>
				</el-scrollbar>
				<span v-if="labelData.length==0" class="nodata">暂无数据</span>
				<!-- <div style="text-align: center;position: absolute;bottom: 5px;width:100%">
								<span>
									<el-pagination small background layout="prev,pager,next" :page-size="10" :total="parseInt(this.dataTotal)"
									 :page-count="5" @current-change="handleCurrentChange" :current-page.sync="currentPage">
									</el-pagination>
								</span>
        </div>-->
			</div>
			<!-- <ul class="tabCare">
				<li class="right-care" :class="{active:actRight=='图层显示'}" @click="clickRightMenu('图层显示')">图层显示</li>
	
				 <li class="right-care" :class="{active:actRight=='查询显示'}" @click="clickRightMenu('查询显示')">查询显示</li>
      </ul>-->
		</div>
		<el-dialog :visible.sync="dialogPanorama" append-to-body width="80%" :fullscreen="maxWindow" :before-close="handleClosePan"
		 class="dialogPan">
			<div slot="title">
				<i class="iconfont icon-windows iconMax" @click="maxWindow=!maxWindow" style="cursor:pointer"></i>
			</div>
			<iframe :src="panoramaUrl" border="0" style="z-index:99;height: calc(100% - 90px);position:absolute;width:calc(100% - 40px);border: none;"></iframe>
		</el-dialog>
		<div class="right-nav">
			<ul>
				<li>
					<el-popover placement="bottom" trigger="hover" width="250" :offset="55" v-model="rigionBol">
						<!-- <div class="rigionBox" > -->
						<el-button type="text" v-for="(item,index) in reginData" @click="select_rigion(item.ENTIID)">{{item.ENTINAME}}</el-button>
						<!-- </div> -->
						<span style="height: 35px;display: inline-block;" slot="reference">
							<img src="../../../static/images/icon4.jpg">天府新区
							<i v-if="rigionBol==false" class="el-icon-arrow-down"></i>
							<i v-else class="el-icon-arrow-up"></i>
						</span>
					</el-popover>
				</li>

				<!-- <li @click="spaceSearch('polygon')"> -->
				<li @click="spaceSearch('gon')">
					<img src="../../../static/images/icon2.jpg">空间查询
				</li>

				<!-- <el-dropdown @command="select_rigion">
					<span class="el-dropdown-link" style="font-size:16px;color:#000000" @mouseenter="overDrop(1)" @mouseleave="leaveDrop(1)">
						
						
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command=item.ENTIID v-for="(item,index) in reginData">{{item.ENTINAME}}</el-dropdown-item>
					</el-dropdown-menu>
        </el-dropdown>-->
				<li>
					<img src="../../../static/images/icon3.jpg">
					<el-dropdown @command="select_note">
						<span class="el-dropdown-link" style="font-size:16px;color:#000000" @mouseenter="overDrop(2)" @mouseleave="leaveDrop(2)">
							地图标绘
							<i class="el-icon-arrow-down el-icon--right" :class="{'icon-rotate':isrotate2}"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="点">标记点</el-dropdown-item>
							<el-dropdown-item command="线">标记线</el-dropdown-item>
							<el-dropdown-item command="面">标记面</el-dropdown-item>
							<el-dropdown-item command="标注">我的标注</el-dropdown-item>
							<el-dropdown-item command="清除">清除标注</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
				<li class="lastL">
					<img src="../../../static/images/工具箱图标.png">
					<el-dropdown @command="select_tool">
						<span class="el-dropdown-link" style="font-size:16px;color:#000000" @mouseenter="overDrop(3)" @mouseleave="leaveDrop(3)">
							工具箱
							<i class="el-icon-arrow-down el-icon--right" :class="{'icon-rotate':isrotate3}"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="测线">测距</el-dropdown-item>
							<el-dropdown-item command="测面">测面</el-dropdown-item>
							<el-dropdown-item command="上一">前一视图</el-dropdown-item>
							<el-dropdown-item command="下一">后一视图</el-dropdown-item>
							<el-dropdown-item command="全幅">全幅显示</el-dropdown-item>
							<el-dropdown-item command="清除">清除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
			</ul>
		</div>
		<drawInfoBox ref="drawInfoBox" class="drawInfo"></drawInfoBox>
		<searchInfo ref="searchInfo" class="searchinfo"></searchInfo>
		<div class="mear_label" v-show="showStyle!=null">
			<p v-show="showStyle=='mearLine'">总长：{{popupContent.length}}</p>
			<p v-show="showStyle=='mearGon'">总面积：{{popupContent.area}}</p>
			<p v-show="showStyle=='mearLine'||showStyle=='mearGon'||showStyle=='mapLabel'">单击确定，双击结束</p>
			<p v-show="showStyle=='spaceQuery'">拖拽拉框选择范围</p>
			<p v-show="showStyle=='bufferQuery'">选择位置，可输入属性查询</p>
			<p v-show="showStyle=='mearHeight'">右键点击停止</p>
			<p v-show="showStyle=='cutFillTrue'||showStyle=='cutFillFalse'">当前范围面积：{{popupContent.area}}平方米</p>
			<p v-show="showStyle=='cutFillTrue'" style="color:green">正常分析范围</p>
			<p v-show="showStyle=='cutFillFalse'" style="color:red">超出分析范围</p>
		</div>
		<div class="rightBtn" v-show="rightBtnBol">
			<ul>
			  <li class="rightBtnLi" @click="anlyseBuffer()" @mouseenter="showRightBtm='周边查询'" @mouseleave="showRightBtm=''" :class="{activeRight:showRightBtm=='周边查询'}"><img src="../../../static/images/查询.png" alt=""><span>周边查询</span></li>
			  <li class="rightBtnLi" @click="select_tool('测线')" @mouseenter="showRightBtm='测量距离'" @mouseleave="showRightBtm=''" :class="{activeRight:showRightBtm=='测量距离'}"><img src="../../../static/images/测量距离.png" alt=""><span>测量距离</span></li>
			  <li class="rightBtnLi" @click="select_tool('测面')" @mouseenter="showRightBtm='测量面积'" @mouseleave="showRightBtm=''" :class="{activeRight:showRightBtm=='测量面积'}"><img src="../../../static/images/测量面积.png" alt=""><span>测量面积</span></li>
			</ul>
			<!-- <el-button size="mini" @click="anlyseBuffer()">周边查询</el-button>
			<el-button size="mini" @click="select_tool('测线')">测量距离</el-button>
			<el-button size="mini" @click="select_tool('测面')">测量面积</el-button> -->
		</div>
		<div class="tab-map">
			<div class="mapType" @click="selectBaseLayer(1)">
				<span v-show="selectBase">电子地图</span>
			</div>
			<div class="mapType mapType2" @click="selectBaseLayer(2)">
				<span v-show="!selectBase">影像</span>
			</div>
				<!--  版本控制  -->
				<!-- 公众版 无**************************** -->
				<!-- 政务版 **************************** -->
					<div class="mapType mapType3" @click="skyMap()">
						<span>天地图成都</span>
					</div>
				<!-- 政务版 无**************************** -->
		</div>
		<div class="mapNum">
			<p>{{ mapFrom }}</p>
		</div>
		<div class="mapNum2">
			<p>{{ mapNumber }}</p>
		</div>
		<div class="map-searve">
			<div class="searve-top">专题服务</div>
			<!-- <div style="max-height: 250px;"> -->
			<el-scrollbar style="max-height: 250px;overflow-x:hidden;padding-bottom: 20px;" class="hideX">
				<div class="searve-content" style="height: 100%;padding-bottom: 10px">
					<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" :unique-opened="true">
						<el-submenu v-for="(item,index) in MapsTree" :index="item.KEYID" :key="item.KEYID">
							<template slot="title">
								<i class="el-icon-location"></i>
								<span style="color:#5D6371;font-size: 15px;" :title="item.LABLE">{{item.LABLE|lebelss}}</span>
							</template>
							<el-menu-item v-for="(ele,indexs) in item.children" :index="ele.KEYID" :key="ele.KEYID" @click="selecLayer(ele)">
								<span style="color:#30323A;font-size: 12px;" :title="ele.LABLE">{{ele.LABLE|lebelss}}</span>
								<img src="../../../static/images/check.png" v-show="ele.isCheck" class="isCheck">
							</el-menu-item>
						</el-submenu>
					</el-menu>
				</div>
			</el-scrollbar>
			<!-- </div> -->
			<div class="layers" v-if="lableLayers.length>0">
				<div class="layers-top">
					<span style="color:#7C7C7C;">图层显示</span>
				</div>
				<el-scrollbar style="height: 250px;overflow-x:hidden; height: 100%;">
					<div class="right-menu-content">
						<el-tree class="my-tree" empty-text="未加载图层" :data="lableLayers" node-key="id" ref="tree" @check="CheckedTreeData"
						 default-expand-all :expand-on-click-node="true" :draggable="lableLayers.length>1" :allow-drop="allowDrop"
						 :allow-drag="allowDrag" @node-drop="handleDrop">
							<span class="custom-tree-node" slot-scope="{ node, data }">
								<div class="layers-li">
									<span class="my-checkbox" :title="data.LABLE">
										<el-checkbox v-model="data.isSelect" @change="checkLayer(data.id)">{{data.LABLE|lebelss_checkbox}}</el-checkbox>
									</span>
									<el-slider class="my-slider" v-model="data.opacity" @change="slidChange(data.id)"></el-slider>
									<span class="my-text">{{data.opacity}}%</span>
									<!-- <el-button type="text" @click="positGoto(data.id)" size="small">定位</el-button>
                  <el-button type="text" @click="delLayer(data.id,data.PARENTNODE,'btn')" size="small">删除</el-button>-->
									<i class="iconfont icon-dingwei" @click="positGoto(data.id)" style="margin-right:10px;font-size:14px;"></i>
									<i class="iconfont icon-guanbi" style="font-size:10px;" @click="delLayer(data.id,data.PARENTNODE,'btn')"></i>
								</div>
							</span>
						</el-tree>
						<!--专题图层-->
					</div>
				</el-scrollbar>

				<span v-if="lableLayers.length==0" class="nodata">未配置图层</span>
			</div>

		</div>
		<div class="mapPan">
			<div class="dircBox">
				<el-row type="flex" justify="center" align='bottom'>
					<el-col :span="24">
						<div class="dir-btn dir-up" @click="changeZoom('up')"></div>
					</el-col>
				</el-row>
				<el-row type="flex" justify="center">
					<el-col :span="8">
						<div class="dir-btn dir-left" @click="changeZoom('left')"></div>
					</el-col>
					<el-col :span="6">
						<!-- @click="resetCenter" -->
						<div class="dir-btn"></div>
					</el-col>
					<el-col :span="8">
						<div class="dir-btn dir-right" @click="changeZoom('right')"></div>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24" type="flex" justify="center" align='top'>
						<div class="dir-btn dir-down" @click="changeZoom('down')"></div>
					</el-col>
				</el-row>
			</div>

			<el-row>
				<el-col :span="24">
					<div class="dir-btn dir-add" @click="changeZoom('add')"></div>
				</el-col>
			</el-row>
			<el-row type="flex" class="row-bg" justify="center">
				<el-col :span="5">
					<div class="dir-line">
						<div class="panBlock" id="Pan" :style="{top: btnTop + 'px'}" @mousedown="dragPan" @mouseenter="panEnter()" @mouseleave="panLeave()">
							<!--  -->
						</div>
						<div class="panBox" :style="{top: btnTop-5 + 'px'}" v-if="showLevel==true">
							<span style="margin-left:5px;height:16px;width:28px">{{mapLevel}}级</span>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<div class="dir-btn dir-dec" @click="changeZoom('dec')"></div>
				</el-col>
			</el-row>
		</div>
		<div class="buffer-point" v-show="bufferBtn" @mousedown="drag">
			<div class="nearby_drager" id="nearby_drager"></div>
			<div class="nearby_lable" id="nearby_lable"></div>
		</div>
	</div>
</template>

<script>
	import * as esriLoader from "esri-loader";
	import drawInfoBox from "./drawInfoBox";
	import searchInfo from "./searchInfo";
	export default {
		data() {
			return {

				//  版本控制
				// map.vue 电子地图页面 服务配置
				mapURL: {

					// 市堪院
					//  EMAP_TFXQ_CGCS2000 :"http://218.6.244.251:6080/arcgis/rest/services/EMAP_TFXQ_CGCS2000/MapServer",
					//  HP_TFXQ_CGCS2000 :"http://218.6.244.251:6080/arcgis/rest/services/HP_TFXQ_CGCS2000/MapServer",
					//  EAMP_LABEL_TFXQ_CGCS2000 :"http://218.6.244.251:6080/arcgis/rest/services/EAMP_LABEL_TFXQ_CGCS2000/MapServer",
					// dojojs: http://125.70.229.64:4471/arcgis_js_api/library/4.8/dojo/dojo.js"

					// 天府新区 政务版 ,使用了三个原始服务

					// CD_TDT_JD: 'http://10.1.235.129:16080/tfxqghjsgt_tianditucd_basemapvector_0_17_rest',
					// CD_TDT_YXT: 'http://10.1.235.129:16080/tfxqghjsgt_tianditucd_basemapraster_0_17_rest',
					// CD_TDT_YXTZJ:"http://10.1.235.129:16080/tfxqghjsgt_tianditucd_basemaprasterlab_0_17_rest",

					// EMAP_TFXQ_CGCS2000 :"http://10.1.235.129:16080/tfxqghjsgt_EMAP_TFXQ_CGCS2000_zw",
					// HP_TFXQ_CGCS2000 :"http://10.1.235.129:16080/tfxqghjsgt_HP_TFXQ_CGCS2000_zw",
					// EAMP_LABEL_TFXQ_CGCS2000 :"http://10.1.235.129:16080/tfxqghjsgt_EAMP_LABEL_TFXQ_CGCS2000_zw",
					// dojojs:"http://10.1.235.129/arcgis_js_v48_api/arcgis_js_api/library/4.8/dojo/dojo.js",

					//天府新区 公众版 2019年5月22日19:32:07 政务办使用公众版的成都天地图，加载图层一样
					CD_TDT_JD: 'http://171.221.172.166:16080/tfxqghjsgt_tianditucd_basemapvector_0_17_rest',
					CD_TDT_YXT: 'http://171.221.172.166:16080/tfxqghjsgt_tianditucd_basemapraster_0_17_rest',
					CD_TDT_YXTZJ:"http://171.221.172.166:16080/tfxqghjsgt_tianditucd_basemaprasterlab_0_17_rest",

					EMAP_TFXQ_CGCS2000: "http://171.221.172.166:16080/tfxqghjsgt_EMAP_TFXQ_CGCS2000_net",
					Extent_TFXQ:"http://171.221.172.166:16080/extent_tfxq",
					HP_TFXQ_CGCS2000: "http://171.221.172.166:16080/tfxqghjsgt_HP_TFXQ_CGCS2000_net",
					EAMP_LABEL_TFXQ_CGCS2000: "http://171.221.172.166:16080/tfxqghjsgt_EAMP_LABEL_TFXQ_CGCS2000_net",
					dojojs: "http://171.221.172.166:7002/arcgis_js_v48_api/arcgis_js_api/library/4.8/dojo/dojo.js",
				},
				//  版本控制
				// mapNumber:'审图号：成S【2017】003号',//公众版
				//mapFrom:"数据来源：天地图·成都",//公众版
				mapNumber:'审图号：成S【2019】004号',//政务版
				mapFrom:"",//政务版
				
				skyMapShow:true,
				showRightBtm:'',
				showLevel:false,
				btnTop: 0, //滑块高度
				btnHeight: -1,
				mapLevel: 20,
				dialogPanorama: false, //街景图弹框开关
				maxWindow: false, //街景图全屏开关
				panoramaUrl: "", //街景图动态地址
				rightBtnBol: false, //地图右键菜单显示隐藏菜单
				speachBol: false,
				typeData: [], //一级type数据
				typeData2: [], //二级type数据
				search2Bol: false, //第一次查询和第二次查询搜索框,false为第一次查询，true为第二次查询
				showTypeBol: true, //是否显示第一次搜索第一级类型
				data: {
					dataName: "",
					dataType: "",
					dataAddress: "",
					position: null
				},
				data2: {
					dataName: "",
					dataType: "",
					dataAddress: ""
				},
				typeName: "",
				rigionBol: false,
				isrotate1: false,
				isrotate2: false,
				isrotate3: false,
				webmap: null,
				view: null,
				draw: null,
				drawGraphicsLayer: null,
				mearsureLayer: null,
				searchGraphicsLayer: null,
				rigionLayer: null,
				baseLayer: null,
				extentLayer:null,
				CDbaseLayer: null,
				CDrasterLayer: null,
				CDZJrasterLayer: null,
				rasterLayer: null,
				rasterLayer2: null,
				search: "",
				selectBase: true,
				fullextents: [],
				mouseWheel: {
					x: null,
					y: null
				},
				index: null,
				swlayer: null,
				popupPoint: {
					label: null,
					search: null,
					buffer: null
				},
				showStyle: null,
				popupContent: {
					area: 0,
					length: 0
				},
				MapsTree: [],
				lableLayers: [],
				thematicLayers: [],
				actRight: "", //选择名字对应的div显示
				searchTable: "查询显示",
				searchRes: [], //查询获取到的数据列表
				hoverIndex: null,
				loading: null,
				dataTotal: "",
				currentPage: 1,
				bufferPoi: null,
				marker: {
					blue: [
						"../../../static/images/poi_marker/blue_all.png",
						"../../../static/images/poi_marker/blue_1.png",
						"../../../static/images/poi_marker/blue_2.png",
						"../../../static/images/poi_marker/blue_3.png",
						"../../../static/images/poi_marker/blue_4.png",
						"../../../static/images/poi_marker/blue_5.png",
						"../../../static/images/poi_marker/blue_6.png",
						"../../../static/images/poi_marker/blue_7.png",
						"../../../static/images/poi_marker/blue_8.png",
						"../../../static/images/poi_marker/blue_9.png",
						"../../../static/images/poi_marker/blue_10.png"
					],
					red: [
						"../../../static/images/poi_marker/red_all.png",
						"../../../static/images/poi_marker/red_1.png",
						"../../../static/images/poi_marker/red_2.png",
						"../../../static/images/poi_marker/red_3.png",
						"../../../static/images/poi_marker/red_4.png",
						"../../../static/images/poi_marker/red_5.png",
						"../../../static/images/poi_marker/red_6.png",
						"../../../static/images/poi_marker/red_7.png",
						"../../../static/images/poi_marker/red_8.png",
						"../../../static/images/poi_marker/red_9.png",
						"../../../static/images/poi_marker/red_10.png"
					],
					white: [
						"../../../static/images/poi_marker/red_white.png",
						"../../../static/images/poi_marker/blue_white.png"
					]
				},
				drawStyle: false, //判断是否处于绘制状态
				bufferBtn: false, //buffer滑动开关
				searchBtn: false, //判断是不是空间查询
				// 				queryDate1: { //第一次查询的参数
				// 					QUERYTYPE: 1,
				// 					NAME: "",
				// 					CIRCLEMODEL: "",
				// 					RECTANGLEMODEL: "",
				// 					PAGE: 1,
				// 					PAGESIZE: 10,
				// 					TYPE1: "",
				// 					TYPE2: ""
				// 				},
				queryDate1: { //第一次查询的参数
					NAME: "",
					GEOMETRYINFO: {
						GEOMETRYTYPE: 'empty'
					},
					PAGE: 1,
					PAGESIZE: 10,
					TYPE1: "",
					TYPE2: ""
				},
				queryDate2: { //第二次查询的参数
					NAME: "",
					GEOMETRYINFO: {
						GEOMETRYTYPE: 'empty'
					},
					PAGE: 1,
					PAGESIZE: 10,
					TYPE1: "",
					TYPE2: ""
				},
				reginData: [],
				queryDateNAME: "",
				tuding: {
					green: "../../../static/images/tuding/1.png",
					orange: "../../../static/images/tuding/2.png",
					zise: "../../../static/images/tuding/3.png",
					red: "../../../static/images/tuding/4.png",
					blue: "../../../static/images/tuding/5.png",
					pink: "../../../static/images/tuding/6.png"
				},
				labelData: [],
				tableH: 750
			};
		},
		components: {
			drawInfoBox,
			searchInfo
		},
		filters: {
			lebelss(val) {
				if (val.length > 10) {
					val = val.substr(0, 10) + "...";
				}
				return val;
			},
			lebelss_checkbox(val) {
				if (val.length > 6) {
					val = val.substr(0, 6) + "...";
				}
				return val;
			},
			names(val) {
				if (val.length > 5) {
					val = val.substr(0, 3) + "...";
				}
				return val;
			}
		},

		methods: {
			panEnter(){
				this.showLevel=true;
			},
			panLeave(){
				this.showLevel=false;
			},
			
			// 			_this.btnTop=Math.round(heights/11)*11 ;
			// 			 _this.mapLevel=11-Math.round(heights/11)+9
			changeZoom(val) {
				var _this = this;
				switch (val) {
					case 'dec':
						if (this.view.zoom != 0) {
							this.view.zoom--;
							this.mapLevel--;
							this.btnTop += (120 / 11)
						}
						break;
					case 'add':
						if (this.view.zoom != 11) {
							this.view.zoom++;
							this.mapLevel++;
							this.btnTop -= (120 / 11)
						}
						break;
					case 'up':
						var width = _this.view.extent.xmax - _this.view.extent.xmin;
						var height = _this.view.extent.ymax - _this.view.extent.ymin;
						var yy = _this.view.center.y
						viewGoTo(this.view.center.x, this.view.center.y + height / 10)

						break;
					case 'left':
						var width = this.view.extent.xmax - this.view.extent.xmin;
						var height = this.view.extent.ymax - this.view.extent.ymin;
						viewGoTo(this.view.center.x - width / 10,this.view.center.y )
						break;
					case 'right':
						var width = this.view.extent.xmax - this.view.extent.xmin;
						var height = this.view.extent.ymax - this.view.extent.ymin;
						viewGoTo(this.view.center.x + width / 10,this.view.center.y)
						break;
					case 'down':
						var width = this.view.extent.xmax - this.view.extent.xmin;
						var height = this.view.extent.ymax - this.view.extent.ymin;
						viewGoTo(this.view.center.x, this.view.center.y - height / 10)
						break;
				}

				function viewGoTo(x, y) {
					esriLoader.dojoRequire(
						[
							"esri/Graphic",
							"esri/geometry/Point",
							"esri/geometry/Circle",
							"esri/geometry/geometryEngine",
							"dojo/domReady!"
						],
						(Graphic, Point, Circle, geometryEngine) => {
							_this.view.center = new Point({
								x: x,
								y: y,
								spatialReference: {
									wkid: 4490
								}
							})
					})
				}
			},
			emptySearchMap() {
				if (this.search2Bol == false) {
					if (this.queryDate1.NAME == "" && this.queryDate1.TYPE1 == "") {
						this.$message({
							message: "请输入或选择查询信息！",
							type: "warning"
						});
						this.showTypeBol = true;
					} else {
						this.queryDate1.PAGE = 1;
						this.currentPage = 1;
						this.showTypeBol = true;
						this.queryDateNAME = this.queryDate1.NAME;
						this.searchMap();
					}
				} else {
					if (!this.speachBol) {
						this.currentPage = 1;
						this.queryDate2.PAGE = 1;
						this.bufferQuery(1000);
					} else {
						this.currentPage = 1;
						this.queryDate2.PAGE = 1;
						this.view.graphics.removeAll();
						this.searchMap();
					}

				}
			},
			handleOpen(key, keyPath) {},
			handleClosePan() {
				this.dialogPanorama = false;
				this.panoramaUrl = "";
			},
			turnAddLabel() {
				this.actRight = "";
			},
			anlyseBuffer() {
				this.showRightBtm=''
				this.speachBol = false;
				this.search2Bol = true;
				this.queryDate1 = { //第一次查询的参数
						NAME: "",
						GEOMETRYINFO: {
							GEOMETRYTYPE: 'empty'
						},
						PAGE: 1,
						PAGESIZE: 10,
						TYPE1: "",
						TYPE2: ""
					},
					this.queryDate2 = { //第一次查询的参数
						NAME: "",
						GEOMETRYINFO: {
							GEOMETRYTYPE: 'empty'
						},
						PAGE: 1,
						PAGESIZE: 10,
						TYPE1: "",
						TYPE2: ""
					},

					this.actRight = "showData";
				this.rightBtnBol = false;

				this.pointAddress([{
					ADDRESS: this.data.dataAddress,
					JIANPIN: "LNRXH",
					NAME: this.data.dataName,
					OBJECTID: "4926",
					POILEVEL: " ",
					QUANPIN: "Laonianrenxiehui",
					REMARK: " ",
					RN: 1,
					X: this.data.position.x,
					Y: this.data.position.y,
				}]);
			},
			searchKuaicha() {
				// this.queryDate2.TYPE1 = this.data.dataName;
				this.search2Bol = true;
			},
			returnHover(val) {
				this.view.graphics.removeAll();
				this.$refs.searchInfo.isShow = false;
				if (val) {
					this.queryDate1.TYPE2 = "";
					this.searchMap();
				} else {
					this.actRight = "Hover";
					this.queryDate1.TYPE1 = "";
					this.queryDate1.TYPE2 = "";

				}
			},
			inputFocus() {
				this.$refs.searchInfo.isShow = false;
				this.view.graphics.removeAll();
				if (this.queryDate1.TYPE1 == "") {
					this.typeData2 = [];
				}
				if (this.showTypeBol == true) {
					this.actRight = "Hover";
					// this.queryDate1.TYPE1 = '';
					this.queryDate1.TYPE2 = "";
					this.showTypeBol = false;
				}
			},
			returnList(val) {
				this.$refs.searchInfo.isShow = false;
				if (val == 1) {
					this.searchGraphicsLayer.removeAll();
					this.view.graphics.removeAll();
					this.search2Bol = false;
					this.bufferBtn = false;
					this.queryDate2 = {
						NAME: "",
						GEOMETRYINFO: {
							GEOMETRYTYPE: 'empty'
						},
						PAGE: 1,
						PAGESIZE: 10,
						TYPE1: "",
						TYPE2: ""
					};
					this.searchMap();
				} else if (val == 2) {
					this.searchGraphicsLayer.removeAll();
					this.view.graphics.removeAll();
					this.bufferBtn = false;
					this.actRight = "showData";
					this.speachBol = false;

					this.queryDate2 = {
						NAME: "",
						GEOMETRYINFO: {
							GEOMETRYTYPE: 'empty'
						},
						PAGE: 1,
						PAGESIZE: 10,
						TYPE1: "",
						TYPE2: ""
					};
					this.pointAddress([{
						ADDRESS: this.data.dataAddress,
						JIANPIN: "LNRXH",
						NAME: this.data.dataName,
						OBJECTID: "4926",
						POILEVEL: " ",
						QUANPIN: "Laonianrenxiehui",
						REMARK: " ",
						RN: 1,
						X: this.data.position.x,
						Y: this.data.position.y,
					}]);
				} else {
					this.actRight = "Poi";
					this.changeHeight();
				}
			},
			changeHeight() {
				this.$nextTick(() => {
					try {
						this.tableH =
							document.getElementById("main").clientHeight -
							200 -
							document.getElementById("hideX2").offsetTop;
						$("#hideX2").css("height", this.tableH + "px");
					} catch (err) {
						console.log("tabele错误");
					}
				});
			},
			selectType(name, index) {
				this.currentPage = 1;
				this.searchGraphicsLayer.removeAll();
				this.view.graphics.removeAll();
				if (index == 1) {
					this.queryDate1.TYPE1 = name;
					this.actRight = "Hover2";

					this.typeData.forEach(item => {
						if (item.typeName == name) {
							this.typeData2 = item.children;
						}
					});
					this.queryDate1.PAGE = 1;
					this.showTypeBol = true;
					this.queryDateNAME = this.queryDate1.NAME;
					this.searchMap();

				} else if (index == 2) {
					this.queryDate1.TYPE2 = name;
					this.queryDate1.PAGE = 1;
					this.showTypeBol = true;
					this.queryDateNAME = this.queryDate1.NAME;
					this.searchMap();
				} else {
					this.queryDate2.TYPE1 = this.data.dataName;
					this.queryDate2.TYPE1 = name;
					this.queryDate2.PAGE = 1;
					this.search2Bol = true;
					this.showTypeBol = true;
					this.queryDateNAME = this.queryDate2.NAME;
					this.bufferQuery(1000);
				}
				this.changeHeight();
			},
			rigionEnter() {
				setTimeout(() => {
					this.rigionBol = true;
				}, 500);
			},
			rigionLeave() {
				setTimeout(() => {
					this.rigionBol = false;
				}, 500);
			},
			select_rigion(type) {
				this.$fetch("/ThematicMapWS.asmx/GetDistrictDataInfo", {
					ENTIID: type
				}).then(res => {
					var _this = this;
					var type = res.data[0].SPAAREA.split("(")[0];
					esriLoader.dojoRequire(
						["esri/Graphic", "esri/geometry/Polygon", "dojo/domReady!"],
						(Graphic, Polygon) => {
							_this.rigionLayer.removeAll();

							if (type == "POLYGON" || type == "POLYGON ") {
								var wktUtil = new WKTUtil();
								var points = wktUtil.read(res.data[0].SPAAREA);
								var json = {
									rings: points,
									spatialReference: _this.view.spatialReference
								};

								var geo = new Polygon({
									rings: json.rings,
									spatialReference: _this.view.spatialReference
								});
								var gra = new Graphic({
									geometry: geo,
									symbol: {
										type: "simple-fill", // autocasts as SimpleFillSymbol
										color: [47, 180, 245, 0.3],
										style: "solid",
										outline: {
											// autocasts as SimpleLineSymbol
											color: "#3063F2",
											width: 1
										}
									}
								});
								_this.rigionLayer.add(gra);
								_this.view.goTo({
									target: gra,
									zoom: 3
								}, {
									duration: 200,
									easing: "ease-out"
								});
								setTimeout(() => {
									_this.rigionLayer.remove(gra);
								}, 1000);
							} else if (type == "MULTIPOLYGON" || type == "MULTIPOLYGON ") {
								var res1 = res.data[0].SPAAREA.replace(/[(][(]/g, "(");
								var res2 = res1.replace(/[)][)]/g, ")");
								var res3 = res2.replace("MULTIPOLYGON", "POLYGON");

								this.$nextTick(function() {
									var wktUtil = new WKTUtil();
									var points = wktUtil.read(res3);
									var json = {
										rings: points,
										spatialReference: _this.view.spatialReference
									};
									json.rings.forEach(item => {
										var geo = new Polygon({
											rings: item,
											spatialReference: _this.view.spatialReference
										});
										var gra = new Graphic({
											geometry: geo,
											symbol: {
												type: "simple-fill", // autocasts as SimpleFillSymbol
												color: [47, 180, 245, 0.3],
												style: "solid",
												outline: {
													// autocasts as SimpleLineSymbol
													color: "#3063F2",
													width: 1
												}
											}
										});
										_this.rigionLayer.add(gra);
										_this.view.goTo({
											target: _this.rigionLayer.graphics,
											zoom: 3
										}, {
											duration: 200,
											easing: "ease-out"
										});
										setTimeout(() => {
											_this.rigionLayer.remove(gra);
										}, 1000);
									});
								});
							}

						}
					);
				});
			},
			queryLabel() {
				this.labelData = [];
				this.$fetch("/ThematicMapWS.asmx/GetMapLable").then(res => {
					if (res.data.length > 0) {
						res.data.forEach(item => {
							item.ischeck = false;
							this.labelData.push(item);
						});
						if (this.drawGraphicsLayer.graphics.items.length > 0) {
							this.drawGraphicsLayer.graphics.items.forEach(ele => {
								for (var i = 0; i < this.labelData.length; i++) {
									if (this.labelData[i].keyid == ele.attributes.KEYID) {
										this.labelData[i].ischeck = true;
										break;
									}
								}
							});
						}

						this.labelData = JSON.parse(JSON.stringify(this.labelData));
					}
				});
			},
			clickAddLabel(item) {
				if (item.labelType == "point") {
					this.drawcli("point", this.view, this.drawGraphicsLayer, item);
				} else if (item.labelType == "polygon") {
					this.drawcli("gon", this.view, this.drawGraphicsLayer, item);
				} else {
					this.drawcli("line", this.view, this.drawGraphicsLayer, item);
				}
				// })
			},
			dragPan(e) {
				var _this = this;
				if (_this.btnHeight == -1) {
					_this.btnHeight = document.getElementsByClassName('dir-line')[0].getBoundingClientRect().y;
				}
				document.onmousemove = function(evt) {
					var heights = evt.y - _this.btnHeight;
					if (heights > 0 && heights < 120) {
						_this.btnTop = Math.round(heights / 11) * 11;
						_this.mapLevel = 11 - Math.round(heights / 11) + 9;
						console.log(Math.round(heights / 11));
					}
					document.onmouseup = function() {
						document.onmousemove = null;
						_this.view.zoom = _this.mapLevel - 9;
					};
				};
			},
			drag(e) {
				this.queryDate2.PAGE = 1;
				this.currentPage = 1;
				this.actRight = "";
				var _this = this;
				var startX = e.clientX;
				var startY = e.clientY;
				var divofX = e.offsetX;
				var startPoi = this.view.toScreen(_this.bufferPoi);
				_this.searchBtn = true;
				esriLoader.dojoRequire(
					[
						"esri/Graphic",
						"esri/geometry/Point",
						"esri/geometry/Circle",
						"esri/geometry/geometryEngine",
						"dojo/domReady!"
					],
					(Graphic, Point, Circle, geometryEngine) => {
						document.onmousemove = function(evt) {
							// console.log(evt.clientX);
							_this.searchGraphicsLayer.graphics.removeAll();
							// _this.$nextTick(() => {
							$(".buffer-point").css("left", evt.clientX - divofX);
							_this.popupPoint.buffer = _this.view.toMap({
								x: evt.clientX - divofX + 16,
								y: startPoi.y
							});
							var distans = parseInt(
								(_this.popupPoint.buffer.x - _this.bufferPoi.x) *
								111000 *
								Math.cos(_this.bufferPoi.y)
							);
							var distans2 = parseInt(distans * 0.831);
							if (distans2 < 0) {
								distans2 = -1 * distans2;
							}

							_this.queryDate2.GEOMETRYINFO.RADIUS = distans2 * 2;
							$("#nearby_lable").html(distans2 * 2 + "米");
							var ptBuff = geometryEngine.geodesicBuffer(
								new Point({
									x: _this.bufferPoi.x,
									y: _this.bufferPoi.y,
									spatialReference: {
										wkid: 4326
									}
								}),
								distans2 * 2,
								"meters"
							);
							ptBuff.spatialReference = _this.view.spatialReference;
							var Buffgraphic = new Graphic({
								attributes: {
									geoType: "searchInit"
								},
								geometry: ptBuff,
								symbol: {
									type: "simple-fill", // autocasts as SimpleFillSymbol
									color: [64, 164, 255, 0.3],
									style: "solid",
									outline: {
										// autocasts as SimpleLineSymbol
										color: "#1399FF",
										width: 2
									}
								}
							});
							_this.popupPoint.buffer = _this.view.toMap({
								x: evt.clientX - divofX + 16,
								y: startPoi.y
							});
							_this.searchGraphicsLayer.graphics.add(Buffgraphic);
							// })
							document.onmouseup = function() {
								if (_this.searchBtn) {
									_this.view.graphics.removeAll();

									_this.queryDateNAME = _this.queryDate2.NAME == '' ? "数据" : _this.queryDate2.NAME;
									_this.searchBtn = false;
									_this.searchMap();
								}
								document.onmousemove = null;
							};
						};
					}
				);
			},
			handleCurrentChange(val) {
				this.view.graphics.removeAll();
				if (this.search2Bol == false) {
					this.queryDate1.PAGE = val;
					this.searchMap();
				} else {
					this.queryDate2.PAGE = val;
					this.searchMap();
				}
			},
			openFullScreen() {
				this.loading = this.$loading({
					lock: true,
					fullscreen: true,
					text: "正在查询，请稍后!",
					spinner: "el-icon-loading",
					background: "rgba(0, 0, 0, 0.8)"
				});
			},
			closeSearch() {
				// if(this.speachBol==true){
				this.speachBol = false;
				this.rightBtnBol = false;
				this.search2Bol = false;
				this.actRight = "";
				this.showTypeBol = true;
				this.searchRes = [];
				this.typeData2 = [];
				this.bufferBtn = false;
				this.searchGraphicsLayer.removeAll();
				this.queryDate1 = {
					NAME: "",
					GEOMETRYINFO: {
						GEOMETRYTYPE: 'empty'
					},
					PAGE: 1,
					PAGESIZE: 10,
					TYPE1: "",
					TYPE2: ""
				};
				this.$refs.searchInfo.isShow = false;
				this.view.graphics.removeAll();
				this.queryDate2 = {
					NAME: "",
					GEOMETRYINFO: {
						GEOMETRYTYPE: 'empty'
					},
					PAGE: 1,
					PAGESIZE: 10,
					TYPE1: "",
					TYPE2: ""
				};
				// 				}else{
				// 					if (this.search2Bol == false) {
				// 						this.actRight = '';
				// 						this.showTypeBol = true;
				// 						this.searchRes = [];
				// 						this.bufferBtn = false;
				// 						this.searchGraphicsLayer.removeAll();
				// 						this.queryDate1 = {
				// 							QUERYTYPE: 1,
				// 							NAME: "",
				// 							CIRCLEMODEL: "",
				// 							RECTANGLEMODEL: "",
				// 							PAGE: 1,
				// 							PAGESIZE: 10,
				// 							TYPE1: "",
				// 							TYPE2: "",
				// 						};
				// 						this.$refs.searchInfo.isShow = false;
				// 						this.view.graphics.removeAll();
				// 					} else {
				// 						this.searchGraphicsLayer.removeAll();
				// 						this.search2Bol = false;
				// 						this.queryDate2 = {
				// 							QUERYTYPE: 2,
				// 							NAME: "",
				// 							CIRCLEMODEL: "",
				// 							RECTANGLEMODEL: "",
				// 							PAGE: 1,
				// 							PAGESIZE: 10,
				// 							TYPE1: "",
				// 							TYPE2: "",
				// 						};
				// 					}
				// 				}
			},
			select_tool(type) {
				this.showRightBtm='';
				this.rightBtnBol = false;
				if (type == "全幅") {
					this.viewAllOver();
				} else if (type == "清除") {
					this.queryDate1 = {
						NAME: "",
						GEOMETRYINFO: {
							GEOMETRYTYPE: 'empty'
						},
						PAGE: 1,
						PAGESIZE: 10,
						TYPE1: "",
						TYPE2: ""
					};
					this.queryDate2 = {
						NAME: "",
						GEOMETRYINFO: {
							GEOMETRYTYPE: 'empty'
						},
						PAGE: 1,
						PAGESIZE: 10,
						TYPE1: "",
						TYPE2: ""
					};
					this.bufferBtn = false;
					this.searchRes = [];
					this.mearsureLayer.removeAll();
					this.rigionLayer.removeAll();
					this.searchGraphicsLayer.removeAll();
					this.view.graphics.removeAll();
					this.$refs.searchInfo.isShow = false;
					this.actRight = "";
				} else if (type == "测线") {
					this.mearsure("line");
				} else if (type == "测面") {
					this.mearsure("gon");
				} else if (type == "上一") {
					this.viewBefore();
				} else if (type == "下一") {
					this.viewAfter();
				}
			},
			spaceSearch(type) {
				// 				if(this.speachBol==false){
				// 					this.data={
				// 						dataName:"",
				// 						dataType:'',
				// 						position:'',
				// 					};
				// 				}

				var _this = this;
				this.$refs.searchInfo.isShow = false;
				esriLoader.dojoRequire(
					[
						"esri/Graphic",
						"esri/geometry/Point",
						"esri/geometry/Polygon",
						"esri/geometry/Circle",
						"esri/tasks/IdentifyTask",
						"esri/geometry/geometryEngine",
						"esri/tasks/support/BufferParameters",
						"dojo/domReady!"
					],
					(
						Graphic,
						Point,
						Polygon,
						Circle,
						IdentifyTask,
						geometryEngine,
						BufferParameters
						//geometryEngine
					) => {
						var id = new Date().getTime();
						var clibol = true;
						_this.drawStyle = true;
						_this.searchGraphicsLayer.removeAll();
						_this.view.graphics.removeAll();
						_this.bufferBtn = false;
						if (type == "polygon") {
							var action = _this.draw.create("polygon");
							_this.view.cursor = "crosshair";
							_this.view.focus();
							action.on("vertex-add", drawPolygon);
							action.on("cursor-update", drawPolygon);
							action.on("vertex-remove", drawPolygon);
							action.on("draw-complete", drawPolygon);
						} else if (type == "point") {
							_this.view.cursor = "auto";
							// _this.showStyle = 'bufferQuery';
							// 						var action = _this.draw.create("point")
							// 						_this.view.focus();
							// 						action.on("vertex-add", drawPolygon);
							// 						action.on("cursor-update", drawPolygon);
							// 						action.on("vertex-remove", drawPolygon);
							// 						action.on("draw-complete", drawPolygon);
							drawPolygon({
								type: "draw-complete"
							});
						} else if (type == "gon") {
							_this.closeSearch();
							_this.data = {
								dataName: "",
								dataType: "",
								position: ""
							};
							_this.view.cursor = "crosshair";
							_this.showStyle = "spaceQuery";
							// 													var action = _this.draw.create("polygon")
							// 													_this.view.focus();
							// 													action.on("vertex-add", drawPolygon1);
							// 													action.on("cursor-update", drawPolygon1);
							// 													action.on("vertex-remove", drawPolygon1);
							// 													action.on("draw-complete", drawPolygon1);

							_this.view.on("pointer-down", function(evt) {
								if (clibol) {
									var cli1 = _this.view.toMap({
										x: evt.x,
										y: evt.y
									});
								}
								_this.view.on("drag", function(evt) {
									if (clibol) {
										evt.stopPropagation();
										var cli2 = _this.view.toMap({
											x: evt.x,
											y: evt.y
										});
										drawPolygon1([
											[cli1.x, cli1.y],
											[cli2.x, cli2.y]
										], "update");
									}
								});
								_this.view.on("pointer-up", function(evt) {
									if (clibol) {
										var cli2 = _this.view.toMap({
											x: evt.x,
											y: evt.y
										});
										drawPolygon1(
											[
												[cli1.x, cli1.y],
												[cli2.x, cli2.y]
											],
											"complete"
										);
									}
								});
							});
						}

						function drawPolygon1(vertices, type) {
							_this.search2Bol = true;
							_this.speachBol = true;
							_this.rightBtnBol = false;
							_this.view.graphics.removeAll();
							var gem = new Polygon({
								rings: vertices,
								spatialReference: _this.view.spatialReference
							});
							var rings = [
								[gem.extent.xmin, gem.extent.ymin],
								[gem.extent.xmax, gem.extent.ymin],
								[gem.extent.xmax, gem.extent.ymax],
								[gem.extent.xmin, gem.extent.ymax],
								[gem.extent.xmin, gem.extent.ymin]
							];
							var gemm = new Polygon({
								rings: rings,
								spatialReference: _this.view.spatialReference
							});
							var graphic = new Graphic({
								attributes: {
									geoType: "searchInit",
									id: id
								},
								geometry: gemm,
								symbol: {
									type: "simple-fill", // autocasts as SimpleFillSymbol
									color: [64, 164, 255, 0.3],
									style: "solid",
									outline: {
										// autocasts as SimpleLineSymbol
										color: "#1399FF",
										width: 2
									}
								}
							});
							if (type == "update") {
								_this.view.graphics.add(graphic);
							}
							if (type == "complete") {
								action = _this.draw.create("null");
								_this.view.cursor = "default";
								_this.showStyle = null;
								_this.view.graphics.removeAll();
								_this.searchGraphicsLayer.graphics.add(graphic);
								_this.queryDate2 = {
									NAME: _this.queryDate2.NAME,
									GEOMETRYINFO: {
										GEOMETRYTYPE: 'rectangle',
										XMIN: gem.extent.xmin,
										XMAX: gem.extent.xmax,
										YMIN: gem.extent.ymin,
										YMAX: gem.extent.ymax
									},
									PAGE: 1,
									PAGESIZE: 10,
									TYPE1: "",
									TYPE2: ""
								};
								_this.queryDateNAME = _this.queryDate2.NAME == '' ? "数据" : _this.queryDate2.NAME;
								clibol = false;
								_this.queryDate2.PAGE = 1;
								_this.currentPage = 1;
								_this.searchMap();
								window.setTimeout(function() {
									_this.drawStyle = false;
								}, 300);
							}
						}

						function drawPolygon(evt) {
							_this.view.graphics.removeAll();
							if (type == "polygon") {
								var gem = new Polygon({
									rings: evt.vertices,
									spatialReference: _this.view.spatialReference
								});
								var graphic = new Graphic({
									attributes: {
										geoType: "searchInit",
										id: id
									},
									geometry: gem,
									symbol: {
										type: "simple-fill", // autocasts as SimpleFillSymbol
										color: [64, 164, 255, 0.5],
										style: "solid",
										outline: {
											// autocasts as SimpleLineSymbol
											color: "#1399FF",
											width: 2
										}
									}
								});
							} else if (type == "point") {
								_this.bufferPoi = new Point({
									x: _this.data.position.x,
									y: _this.data.position.y,
									spatialReference: _this.view.spatialReference
								});
								var graphic = new Graphic({
									attributes: {
										geoType: "searchInit",
										id: id
									},
									geometry: _this.bufferPoi,
									symbol: {
										type: "picture-marker", // autocasts as new PictureMarkerSymbol()
										url: _this.marker.white[1],
										width: "21px",
										height: "30px",
										xoffset: 0,
										yoffset: "15px"
									}
								});
							}

							if (evt.type != "draw-complete") {
								_this.view.graphics.add(graphic);
							}
							if (evt.type == "draw-complete") {
								_this.drawStyle = false;
								_this.view.cursor = "default";
								_this.searchGraphicsLayer.graphics.add(graphic);
								if (type == "polygon") {
									// identiti(graphic);
								} else if (type == "point") {
									var ptBuff = geometryEngine.geodesicBuffer(
										new Point({
											x: _this.bufferPoi.x,
											y: _this.bufferPoi.y,
											spatialReference: {
												wkid: 4326
											}
										}),
										1000,
										"meters"
									);
									// 								var circle = new Circle({
									// 									center: _this.bufferPoi,
									// 									radius: 200,
									// 									radiusUnit: 'meters',
									// 								});
									ptBuff.spatialReference = _this.view.spatialReference;
									var bufferGra = new Graphic({
										attributes: {
											geoType: "searchInit",
											id: id
										},
										geometry: ptBuff,
										symbol: {
											type: "simple-fill", // autocasts as SimpleFillSymbol
											color: [64, 164, 255, 0.3],
											style: "solid",
											outline: {
												// autocasts as SimpleLineSymbol
												color: "#1399FF",
												width: 1
											}
										}
									});
									_this.queryDate2 = {
										QUERYTYPE: 2,
										NAME: "",
										CIRCLEMODEL: {
											CENTER_X: _this.bufferPoi.x,
											CENTER_Y: _this.bufferPoi.y,
											RADIUS: 1000
										},
										RECTANGLEMODEL: "",
										PAGE: 1,
										PAGESIZE: 10,
										TYPE1: "",
										TYPE2: ""
									};
									_this.searchGraphicsLayer.graphics.add(bufferGra);

									_this.popupPoint.buffer = new Point({
										x: bufferGra.geometry.extent.xmax,
										y: _this.bufferPoi.y,
										spatialReference: _this.view.spatialReference
									});
									_this.showStyle = null;
									var scpoint = _this.view.toScreen(_this.popupPoint.buffer);
									$(".buffer-point").css("top", scpoint.y - 10);
									$(".buffer-point").css("left", scpoint.x - 16);
									$("#nearby_lable").html(1000 + "米");
									_this.queryDateNAME = _this.queryDate2.NAME == '' ? "数据" : _this.queryDate2.NAME;
									_this.searchMap();
									_this.$nextTick(() => {

										_this.bufferBtn = true;
									});
									// document.getElementById("#nearby_lable").innerHTML=200;

									// identiti(Buffgraphic);
								}
							}
						}

						function identiti(graphic) {
							var identifyTask = new IdentifyTask(
								"http://218.6.244.251:6080/arcgis/rest/services/DLST_TFXQ_CGCS2000/MapServer"
							);
							var params = new IdentifyParameters();
							params.tolerance = 3;
							params.returnGeometry = true;
							params.layerIds = [
								0,
								1,
								2,
								3,
								4,
								5,
								6,
								7,
								8,
								9,
								10,
								11,
								12,
								13,
								14,
								15,
								16,
								17,
								18
							];
							params.layerOption = "all";
							params.geometry = graphic.geometry;
							params.width = _this.view.width;
							params.height = _this.view.height;
							params.mapExtent = _this.view.extent;
							identifyTask.execute(params).then(function(response) {
								_this.searchRes = response.results;
								if (_this.actRight != _this.searchTable) {
									_this.actRight = _this.searchTable;
								}
								_this.openFullScreen();
								_this.pointAddress();
							});
						}
					}
				);
			},
			enter(index) {
				this.hoverIndex = index;
				this.view.graphics.items.forEach(item => {
					if (item.attributes.index == index) {
						this.view.graphics.remove(item);
						this.$nextTick(() => {
							item.symbol.url = this.marker.blue[index + 1];
							this.view.graphics.add(item);
						});
					}
				});
			},
			leave(index) {
				this.hoverIndex = null;
				this.view.graphics.items.forEach(item => {
					if (item.attributes.index == index) {
						this.view.graphics.remove(item);
						this.$nextTick(() => {
							item.symbol.url = this.marker.red[index + 1];
							this.view.graphics.add(item);
						});
					}
				});
			},
			mapview(fea, value) {
				var pointGem;
				// fea.attributes.value = value;
				// 				if (fea.geometry.rings || fea.geometry.paths) {
				// 					pointGem = fea.geometry.extent.center;
				// 				} else {
				// 					pointGem = fea.geometry;
				// 				};
				this.popupPoint.search = fea.geometry;

				if (this.search2Bol == false) {
					this.actRight = "showData";
					this.speachBol = false;
					this.data.dataName = fea.attributes.NAME;
					this.data.dataAddress = fea.attributes.ADDRESS;
					this.data.dataType = fea.attributes.TYPE;
					this.data.position = fea.geometry;
				} else {
					this.actRight = "showData2";
					this.data2.dataName = fea.attributes.NAME;
					this.data2.dataType = fea.attributes.TYPE;
				}
				var scpoint = this.view.toScreen(this.popupPoint.search);
				$(".searchinfo").css("top", scpoint.y);
				$(".searchinfo").css("left", scpoint.x);
				this.$refs.searchInfo.showAddInfo(fea);

				this.view.goTo(fea);
				var _this = this;
				var data = _this.view.graphics.items;
				console.log(_this.view.graphics.items.length);

				data.forEach(item => {
					if (item.attributes.index == fea.attributes.index) {
						item.symbol.url = _this.marker.blue[item.attributes.index + 1];
						// 						_this.view.graphics.remove(item);
						// 						_this.$nextTick(() => {
						// 							item.symbol.url = _this.marker.blue[item.attributes.index+1];
						// 							_this.view.graphics.add(item);
						// 							console.log(item.attributes.index+1)
						// 						});

						// break;
					} else {
						item.symbol.url = _this.marker.red[item.attributes.index + 1];
						console.log(item.attributes.index + 1);
					}
				});
			},
			clickRightMenu(type) {
				if (this.actRight == null) {
					this.actRight = type;
				} else {
					if (this.actRight != type) {
						this.actRight = type;
					} else {
						this.actRight = null;
					}
				}
			},
			searchMap() {

				this.$refs.searchInfo.isShow = false;

				var parm = null;
				//判断是用data1还是data2数据
				if (this.search2Bol == false) {
					parm = {
						QUERYMODEL: {
							NAME: this.queryDate1.NAME, //查询名称
							TYPE1: this.queryDate1.TYPE1, //类型1
							TYPE2: this.queryDate1.TYPE2, //类型2
							GEOMETRYINFO: {
								GEOMETRYTYPE: this.queryDate1.GEOMETRYINFO.GEOMETRYTYPE,
								CENTER_X: this.queryDate1.GEOMETRYINFO.CENTER_X || '', //周边查询
								CENTER_Y: this.queryDate1.GEOMETRYINFO.CENTER_Y || '', //周边查询
								RADIUS: this.queryDate1.GEOMETRYINFO.RADIUS || '', //周边查询          
								XMIN: this.queryDate1.GEOMETRYINFO.XMIN || '', //矩形查询
								XMAX: this.queryDate1.GEOMETRYINFO.XMAX || '', //矩形查询
								YMIN: this.queryDate1.GEOMETRYINFO.YMIN || '', //矩形查询
								YMAX: this.queryDate1.GEOMETRYINFO.YMAX || '' //矩形查询
							},
						},
						PAGE: this.queryDate1.PAGE,
						PAGESIZE: this.queryDate1.PAGESIZE
					}

				} else {
					parm = {
						QUERYMODEL: {
							NAME: this.queryDate2.NAME, //查询名称
							TYPE1: this.queryDate2.TYPE1, //类型1
							TYPE2: this.queryDate2.TYPE2, //类型2
							GEOMETRYINFO: {
								GEOMETRYTYPE: this.queryDate2.GEOMETRYINFO.GEOMETRYTYPE,
								CENTER_X: this.queryDate2.GEOMETRYINFO.CENTER_X || '', //周边查询
								CENTER_Y: this.queryDate2.GEOMETRYINFO.CENTER_Y || '', //周边查询
								RADIUS: this.queryDate2.GEOMETRYINFO.RADIUS || '', //周边查询          
								XMIN: this.queryDate2.GEOMETRYINFO.XMIN || '', //矩形查询
								XMAX: this.queryDate2.GEOMETRYINFO.XMAX || '', //矩形查询
								YMIN: this.queryDate2.GEOMETRYINFO.YMIN || '', //矩形查询
								YMAX: this.queryDate2.GEOMETRYINFO.YMAX || '' //矩形查询
							},
						},
						PAGE: this.queryDate2.PAGE,
						PAGESIZE: this.queryDate2.PAGESIZE
					}
				}
				this.$fetch("/ThematicMapWS.asmx/GetNewMapPOI", parm).then(
					res => {
						this.searchRes = [];
						if (res.total == "0") {
							this.$message({
								message: "未查询到数据！",
								type: "warning"
							});
						} else {
							this.actRight = "Poi";
							this.changeHeight();
							//this.showTypeBol = true;
							this.pointAddress(res.data);
							//this.queryDateNAME = this.queryDate1.NAME;
						}
						this.dataTotal = res.total;

						// this.queryDate1.TYPE1 = "";
					}
				);
			},
			searchMap1() {
				this.rightBtnBol = false;
				this.$refs.searchInfo.isShow = false;
				this.searchGraphicsLayer.removeAll();
				if (this.search2Bol == false) {
					if (this.queryDate1.NAME == "" && this.queryDate1.TYPE1 == "") {
						this.$message({
							message: "请输入或选择查询信息！",
							type: "warning"
						});
						this.showTypeBol = true;
					} else {
						if (this.queryDate1.QUERYTYPE == 1) {
							this.view.graphics.removeAll();
							this.$fetch("/ThematicMapWS.asmx/GetMapPOI", this.queryDate1).then(
								res => {
									this.searchRes = [];
									if (res.total == "0") {
										this.$message({
											message: "未查询到数据！",
											type: "warning"
										});
									} else {
										this.actRight = "Poi";
										this.changeHeight();
										this.showTypeBol = true;

										this.pointAddress(res.data);
										this.queryDateNAME = this.queryDate1.NAME;
									}
									this.dataTotal = res.total;

									// this.queryDate1.TYPE1 = "";
								}
							);
						} else if (this.queryDate1.QUERYTYPE == 2) {
							this.view.graphics.removeAll();
							this.$fetch("/ThematicMapWS.asmx/GetMapPOI", this.queryDate1).then(
								res => {
									this.searchRes = [];
									if (res.total == "0") {
										this.$message({
											message: "未查询到数据！",
											type: "warning"
										});
									} else {
										this.actRight = "Poi";
										this.changeHeight();

										this.pointAddress(res.data);
										this.queryDateNAME = this.queryDate1.NAME;
									}
									this.dataTotal = res.total;
								}
							);
						} else if (this.queryDate1.QUERYTYPE == 3) {
							this.queryDate1.NAME = "";
							this.$message({
								message: "空间查询不能附带属性查询！",
								type: "warning"
							});
						}
					}
				} else {
					// if (this.queryDate2.QUERYTYPE == 1) {
					this.view.graphics.removeAll();
					var _this = this;
					this.queryDate2 = {
						QUERYTYPE: 2,
						NAME: this.queryDate2.NAME,
						CIRCLEMODEL: {
							CENTER_X: this.data.position.x,
							CENTER_Y: this.data.position.y,
							RADIUS: 1000
						},
						RECTANGLEMODEL: "",
						PAGE: this.queryDate2.PAGE,
						PAGESIZE: this.queryDate2.PAGESIZE,
						TYPE1: this.queryDate2.TYPE1,
						TYPE2: this.queryDate2.TYPE2
					};
					esriLoader.dojoRequire(
						[
							"esri/Graphic",
							"esri/geometry/Point",
							"esri/geometry/Polygon",
							"esri/geometry/Circle",
							"esri/tasks/IdentifyTask",
							"esri/geometry/geometryEngine",
							"esri/tasks/support/BufferParameters",
							"dojo/domReady!"
						],
						(
							Graphic,
							Point,
							Polygon,
							Circle,
							IdentifyTask,
							geometryEngine,
							BufferParameters
							//geometryEngine
						) => {
							_this.bufferPoi = new Point({
								x: _this.data.position.x,
								y: _this.data.position.y,
								spatialReference: _this.view.spatialReference
							});
							var ptBuff = geometryEngine.geodesicBuffer(
								new Point({
									x: _this.data.position.x,
									y: _this.data.position.y,
									spatialReference: {
										wkid: 4326
									}
								}),
								1000,
								"meters"
							);
							var id = new Date().getTime();
							ptBuff.spatialReference = _this.view.spatialReference;
							var bufferGra = new Graphic({
								attributes: {
									geoType: "searchInit",
									id: id
								},
								geometry: ptBuff,
								symbol: {
									type: "simple-fill", // autocasts as SimpleFillSymbol
									color: [64, 164, 255, 0.3],
									style: "solid",
									outline: {
										// autocasts as SimpleLineSymbol
										color: "#1399FF",
										width: 1
									}
								}
							});
							_this.searchGraphicsLayer.graphics.add(bufferGra);

							_this
								.$fetch("/ThematicMapWS.asmx/GetMapPOI", _this.queryDate2)
								.then(res => {
									_this.searchRes = [];
									if (res.total == "0") {
										_this.$message({
											message: "未查询到数据！",
											type: "warning"
										});
									} else {
										_this.actRight = "Poi";
										_this.changeHeight();
										_this.showTypeBol = true;
										_this.dataTotal = res.total;
										_this.pointAddress(res.data);
									}

									// this.queryDateNAME = this.queryDate1.NAME;
								});

							_this.popupPoint.buffer = new Point({
								x: bufferGra.geometry.extent.xmax,
								y: _this.data.position.y,
								spatialReference: _this.view.spatialReference
							});
							_this.showStyle = null;
							var scpoint = this.view.toScreen(_this.popupPoint.buffer);
							$(".buffer-point").css("top", scpoint.y - 10);
							$(".buffer-point").css("left", scpoint.x - 16);
							$("#nearby_lable").html(1000 + "米");
							_this.$nextTick(() => {
								_this.bufferBtn = true;
							});
						}
					);
				}
			},
			bufferQuery(RADIUS) {
				this.rightBtnBol = false;
				this.searchGraphicsLayer.removeAll();
				this.view.graphics.removeAll();
				var _this = this;
				this.queryDate2 = {
					NAME: this.queryDate2.NAME,
					GEOMETRYINFO: {
						GEOMETRYTYPE: 'circle',
						CENTER_X: this.data.position.x,
						CENTER_Y: this.data.position.y,
						RADIUS: RADIUS
					},
					PAGE: this.queryDate2.PAGE,
					PAGESIZE: this.queryDate2.PAGESIZE,
					TYPE1: this.queryDate2.TYPE1,
					TYPE2: this.queryDate2.TYPE2
				};
				esriLoader.dojoRequire(
					[
						"esri/Graphic",
						"esri/geometry/Point",
						"esri/geometry/Polygon",
						"esri/geometry/Circle",
						"esri/tasks/IdentifyTask",
						"esri/geometry/geometryEngine",
						"esri/tasks/support/BufferParameters",
						"dojo/domReady!"
					],
					(
						Graphic,
						Point,
						Polygon,
						Circle,
						IdentifyTask,
						geometryEngine,
						BufferParameters
						//geometryEngine
					) => {
						_this.bufferPoi = new Point({
							x: _this.data.position.x,
							y: _this.data.position.y,
							spatialReference: _this.view.spatialReference
						});
						var ptBuff = geometryEngine.geodesicBuffer(
							new Point({
								x: _this.data.position.x,
								y: _this.data.position.y,
								spatialReference: {
									wkid: 4326
								}
							}),
							1000,
							"meters"
						);
						var id = new Date().getTime();
						ptBuff.spatialReference = _this.view.spatialReference;

						var bufferGra = new Graphic({
							attributes: {
								geoType: "searchInit",
								id: id
							},
							geometry: ptBuff,
							symbol: {
								type: "simple-fill", // autocasts as SimpleFillSymbol
								color: [64, 164, 255, 0.3],
								style: "solid",
								outline: {
									// autocasts as SimpleLineSymbol
									color: "#1399FF",
									width: 1
								}
							}
						});
						_this.searchGraphicsLayer.graphics.add(bufferGra);
						_this.showTypeBol = true;
						_this.popupPoint.buffer = new Point({
							x: bufferGra.geometry.extent.xmax,
							y: _this.data.position.y,
							spatialReference: _this.view.spatialReference
						});
						_this.showStyle = null;
						var scpoint = this.view.toScreen(_this.popupPoint.buffer);
						$(".buffer-point").css("top", scpoint.y - 10);
						$(".buffer-point").css("left", scpoint.x - 16);
						$("#nearby_lable").html(1000 + "米");

						_this.$nextTick(() => {
							_this.bufferBtn = true;
							_this.searchMap();
						});
					}
				);
			},
			pointAddress(data) {
				var _this = this;
				//_this.searchGraphicsLayer.graphics.removeAll();

				esriLoader.dojoRequire(
					["esri/Graphic", "esri/geometry/Point", "dojo/domReady!"],
					(Graphic, Point) => {
						if (data.length > 0) {
							var index = 0;

							data.forEach(item => {
								var pointGem = new Point({
									x: item.X,
									y: item.Y,
									spatialReference: _this.view.spatialReference
								});
								var id = new Date().getTime();
								var pointGra = new Graphic({
									attributes: {
										id: id,
										index: index,
										geoType: "search",
										ADDRESS: item.ADDRESS,
										NAME: item.NAME,
										TYPE: item.TYPE
									},
									geometry: pointGem,
									symbol: {
										type: "picture-marker", // autocasts as new PictureMarkerSymbol()
										url: _this.marker.red[index + 1],
										width: "21px",
										height: "30px",
										xoffset: 0,
										yoffset: "15px"
									}
								});
								//_this.searchGraphicsLayer.graphics.add(pointGra);
								_this.view.graphics.add(pointGra);
								_this.searchRes.push(pointGra);
								index++;
							});
							_this.view.goTo(_this.view.graphics); //放大范围
							_this.updateMap();
						}
					}
				);
			},
			queryExtent() {

			},
			poiCliAddress(gem) {
				var _this = this;
				esriLoader.dojoRequire(["esri/Graphic", "dojo/domReady!"], Graphic => {
					if (_this.searchRes.length > 0) {
						_this.searchRes.forEach(item => {
							var pointGem = new Point({
								x: item.x,
								y: item.y,
								spatialReference: _this.view.spatialReference
							});

							var pointGra = new Graphic({
								attributes: {
									geoType: "poi",
									ADDRESS: item.ADDRESS,
									NAME: item.NAME,
									TYPE: item.TYPE
								},
								geometry: pointGem,
								symbol: {
									type: "picture-marker", // autocasts as new PictureMarkerSymbol()
									url: "../../../static/images/marker_red.png",
									width: "14px",
									height: "14px",
									xoffset: 0,
									yoffset: 0
								}
							});
							_this.searchGraphicsLayer.graphics.add(pointGra);
						});
					}
				});
			},
			allowDrop(draggingNode, dropNode, type) {
				var flag = false;

				if (
					(type == "prev" || type == "next") &&
					draggingNode.data.levels == dropNode.data.levels
				) {
					flag = true;
				} else {
					flag = false;
				}
				return flag;
			},
			allowDrag(draggingNode) {
				return true;
			},
			handleDrop(draggingNode, dropNode, dropType, ev) {
				var _this = this;
				window.setTimeout(function() {
					_this.updateMap();
				}, 200);
			},
			updateMap() {
				var index = this.webmap.allLayers.items.length;

				// 版本控制 2019年5月22日19:32:07 政务办使用公众版的成都天地图，加载图层一样

				//公众版***********************************

				var idindex = 7;
				//this.webmap.reorder(this.extentLayer, 7);
				this.webmap.reorder(this.CDbaseLayer, 1);
				this.webmap.reorder(this.CDrasterLayer, 2);
				this.webmap.reorder(this.CDZJrasterLayer, 3);
				this.webmap.reorder(this.baseLayer, 4);
				
				this.webmap.reorder(this.rasterLayer, 5);
				this.webmap.reorder(this.rasterLayer2, 6);

				//公众版***********************************

				//政务版***********************************

				// var idindex = 4;
				// this.webmap.reorder(this.baseLayer, 1);
				// this.webmap.reorder(this.rasterLayer, 2);
				// this.webmap.reorder(this.rasterLayer2, 3);

				//政务版***********************************
				for (var a = this.lableLayers.length - 1; a >= 0; a--) {
					for (var k = 0; k < this.thematicLayers.length; k++) {
						if (this.thematicLayers[k].id == this.lableLayers[a].id) {
							this.thematicLayers[k].servers.forEach(item => {
								this.webmap.reorder(item, idindex);
								idindex++;
							});
						}
					}
				}
				console.log(idindex);
				this.webmap.reorder(this.rigionLayer, idindex);
				this.webmap.reorder(this.searchGraphicsLayer, idindex + 1);

				this.webmap.reorder(this.drawGraphicsLayer, idindex + 2);
				this.webmap.reorder(this.mearsureLayer, idindex + 3);
				this.lableLayers = JSON.parse(JSON.stringify(this.lableLayers));
				console.log(idindex);
				console.log("!!!", this.searchRes);
			},
			checkLayer(id) {
				for (var a = 0; a < this.lableLayers.length; a++) {
					if (this.lableLayers[a].id == id) {
						for (var k = 0; k < this.thematicLayers.length; k++) {
							if (this.thematicLayers[k].id == id) {
								this.thematicLayers[k].servers.forEach(item => {
									item.visible = this.lableLayers[a].isSelect;
								});
							}
						}
					}
				}
				this.lableLayers = JSON.parse(JSON.stringify(this.lableLayers));
				this.MapsTree = JSON.parse(JSON.stringify(this.MapsTree));
			},
			slidChange(id) {
				for (var a = 0; a < this.lableLayers.length; a++) {
					if (this.lableLayers[a].id == id) {
						for (var k = 0; k < this.thematicLayers.length; k++) {
							if (this.thematicLayers[k].id == id) {
								this.thematicLayers[k].servers.forEach(item => {
									item.opacity = this.lableLayers[a].opacity / 100;
								});
							}
						}
					}
				}
				this.lableLayers = JSON.parse(JSON.stringify(this.lableLayers));
			},
			CheckedTreeData() {},
			positGoto(id) {
				for (var a = 0; a < this.lableLayers.length; a++) {
					if (this.lableLayers[a].id == id) {
						for (var k = 0; k < this.thematicLayers.length; k++) {
							if (this.thematicLayers[k].id == id) {
								this.view.goTo(this.thematicLayers[k].servers[0].fullExtent);
							}
						}
					}
				}
				this.lableLayers = JSON.parse(JSON.stringify(this.lableLayers));
			},
			selecLayer(data) {
				for (var i = 0; i < this.MapsTree.length; i++) {
					if (this.MapsTree[i].KEYID == data.PARENTNODE) {
						for (var j = 0; j < this.MapsTree[i].children.length; j++) {
							if (this.MapsTree[i].children[j].KEYID == data.KEYID) {
								if (this.MapsTree[i].children[j].isCheck == false) {
									this.MapsTree[i].children[j].isCheck = true;
									this.addLayer(data);
								} else {
									this.MapsTree[i].children[j].isCheck = false;
									this.delLayer(data.KEYID, data.PARENTNODE);
								}
							}
						}
					}
				}
			},
			addLayer(datas) {
				//以同一服务分类
				var data = [];
				for (var i = 0; i < datas.LAYERS.length; i++) {
					if (
						!data[
							datas.LAYERS[i].LAYERURL.slice(
								0,
								datas.LAYERS[i].LAYERURL.lastIndexOf("/")
							)
						]
					) {
						var arr = [];
						arr.push(datas.LAYERS[i]);
						data[
							datas.LAYERS[i].LAYERURL.slice(
								0,
								datas.LAYERS[i].LAYERURL.lastIndexOf("/")
							)
						] = arr;
					} else {
						data[
							datas.LAYERS[i].LAYERURL.slice(
								0,
								datas.LAYERS[i].LAYERURL.lastIndexOf("/")
							)
						].push(datas.LAYERS[i]);
					}
				}
				console.log(data);
				this.thematicLayers.unshift({
					id: datas.KEYID,
					servers: []
				});
				this.lableLayers.unshift({
					id: datas.KEYID,
					LABLE: datas.LABLE,
					isSelect: true,
					opacity: 100,
					PARENTNODE: datas.PARENTNODE,
					clickAction: "no"
				});
				var _this = this;
				esriLoader.dojoRequire(
					[
						"esri/layers/TileLayer",
						"esri/layers/MapImageLayer",
						"esri/layers/FeatureLayer",
						"dojo/domReady!"
					],
					(TileLayer, MapImageLayer, FeatureLayer) => {
						for (var key in data) {
							var xmlhttp = new XMLHttpRequest();
							xmlhttp.open("GET", key + "?f=pjson", false);
							xmlhttp.send();
							var serverJson = $.parseJSON(xmlhttp.responseText);
							if (serverJson.tileInfo) {
								//添加切片图层
								var tile = new TileLayer({
									url: key
								});
								if (
									key ==
									"http://125.70.229.64:6080/arcgis/rest/services/TFXQ/JJ_Street_2000/MapServer"
								) {
									_this.lableLayers[0].clickAction = "jiejing";
								} else if (
									key ==
									"http://app.cdkc.cn:6080/arcgis/rest/services/TFXQ/GCD_DPM_2000/MapServer"
								) {
									_this.lableLayers[0].clickAction = "quanjing";
								}
								console.log(_this.lableLayers[0].clickAction);
								_this.thematicLayers[0].servers.push(tile);
							} else {
								//添加其他类型图层
								var Imagelayer = [];
								data[key].forEach(item => {
									Imagelayer.push({
										id: parseInt(
											item.LAYERURL.substr(item.LAYERURL.lastIndexOf("/") + 1)
										)
									});
								});
								if (Imagelayer.length != 0) {
									var Ilayers = Imagelayer.sort(computetop("desc", "id"));
									console.log(Ilayers);
									var image = new MapImageLayer({
										url: key,
										sublayers: Ilayers
									});
									if (
										key ==
										"http://125.70.229.64:6080/arcgis/rest/services/TFXQ/JJ_Street_2000/MapServer"
									) {
										_this.lableLayers[0].clickAction = "jiejing";
									} else if (
										key ==
										"http://app.cdkc.cn:6080/arcgis/rest/services/TFXQ/GCD_DPM_2000/MapServer"
									) {
										_this.lableLayers[0].clickAction = "quanjing";
									}
									console.log(_this.lableLayers[0].clickAction);
									_this.thematicLayers[0].servers.push(image);
								}

								function computetop(order, sortBy) {
									//json数组按属性排序
									var ordAlpah = order == "asc" ? ">" : "<";
									var sortFun = new Function(
										"a",
										"b",
										"return a." + sortBy + ordAlpah + "b." + sortBy + "?1:-1"
									);
									return sortFun;
								}
							}
						}
						_this.thematicLayers[0].servers.forEach(item => {
							_this.webmap.add(item);
						});
					}
				);
				this.MapsTree = JSON.parse(JSON.stringify(this.MapsTree));
				window.setTimeout(function() {
					_this.updateMap();
				}, 200);
			},
			delLayer(id, parenId, type) {
				if (type) {
					for (var i = 0; i < this.MapsTree.length; i++) {
						if (this.MapsTree[i].KEYID == parenId) {
							for (var j = 0; j < this.MapsTree[i].children.length; j++) {
								if (this.MapsTree[i].children[j].KEYID == id) {
									this.MapsTree[i].children[j].isCheck = false;
								}
							}
						}
					}
				}
				for (var a = 0; a < this.lableLayers.length; a++) {
					if (this.lableLayers[a].id == id) {
						this.lableLayers.splice(
							this.lableLayers.indexOf(this.lableLayers[a]),
							1
						);
					}
				}

				for (var k = 0; k < this.thematicLayers.length; k++) {
					if (this.thematicLayers[k].id == id) {
						this.thematicLayers[k].servers.forEach(item => {
							this.webmap.remove(item);
						});
						this.thematicLayers.splice(
							this.thematicLayers.indexOf(this.thematicLayers[k]),
							1
						);
					}
				}
				this.lableLayers = JSON.parse(JSON.stringify(this.lableLayers));
				this.MapsTree = JSON.parse(JSON.stringify(this.MapsTree));
			},
			viewAllOver() {
				this.view.goTo(this.baseLayer.fullExtent);
			},
			viewBefore() {
				if (this.index == null && this.fullextents.length != 0) {
					this.index = this.fullextents.length - 2;
					this.view.extent = this.fullextents[this.index];
				} else {
					if (this.index > 0) {
						this.index--;
						this.view.extent = this.fullextents[this.index];
					} else {
						this.$message({
							message: "不能再后退",
							type: "warning"
						});
					}
				}
			},
			viewAfter() {
				if (this.index == null || this.index == this.fullextents.length - 1) {
					this.$message({
						message: "不能前进",
						type: "warning"
					});
				} else {
					this.index++;
					this.view.extent = this.fullextents[this.index];
				}
			},
			select_note(val) {
				if (localStorage.getItem("token")) {
					this.rightBtnBol = false;
					var drawview;
					if (val == "点") {
						this.drawcli("point", this.view, this.drawGraphicsLayer);
					} else if (val == "线") {
						this.drawcli("line", this.view, this.drawGraphicsLayer);
					} else if (val == "面") {
						this.drawcli("gon", this.view, this.drawGraphicsLayer);
					} else if (val == "清除") {
						if (this.labelData.length == 0) {
							this.$message({
								type: "warning",
								message: "未保存有标注！"
							});
						} else {
							this.$confirm("此操作将永久删除所有标注, 是否继续?", "提示", {
									confirmButtonText: "确定",
									cancelButtonText: "取消",
									type: "warning"
								})
								.then(() => {
									this.clearLove();
								})
								.catch(() => {
									this.$message({
										type: "info",
										message: "已取消删除"
									});
								});
						}
					} else if (val == "标注") {

						if (this.labelData.length == 0) {
							this.$message({
								message: "未保存标注!",
								type: "warning"
							});
						} else {
							this.actRight = "label";
						}

					}
				} else {
					this.$message({
						message: "请先登录!",
						type: "warning"
					});
				}
			},
			overDrop(type) {
				if (type == 1) {
					this.isrotate1 = true;
				} else if (type == 2) {
					this.isrotate2 = true;
				} else {
					this.isrotate3 = true;
				}
			},
			leaveDrop(type) {
				if (type == 1) {
					this.isrotate1 = false;
				} else if (type == 2) {
					this.isrotate2 = false;
				} else {
					this.isrotate3 = false;
				}
			},
			clearLove() {
				var _this = this;
				this.actRight = "";
				this.allcalLabel();
				this.$nextTick(() => {
					if (_this.labelData.length > 0) {
						_this.labelData.forEach(item => {
							this.$fetch("/ThematicMapWS.asmx/DeleteMapLable", {
								KEYID: item.keyid
							}).then(res => {});
						});
						_this.labelData = [];
						_this.$message({
							type: "success",
							message: "删除成功!"
						});
					}
				});

				// 				if (this.drawGraphicsLayer.graphics.items.length > 0) {
				// 					this.labelData = [];
				// 					this.drawGraphicsLayer.graphics.items.forEach(item => {
				// 						this.$nextTick(() => {
				// 							this.drawGraphicsLayer.remove(item);
				//
				// 						})
				// 					})
				//
				// 					window.setTimeout(function() {;
				// 						_this.$message({
				// 							type: 'success',
				// 							message: '删除成功!'
				// 						});
				// 						_this.queryLabel();
				// 					}, 500)
				// 				}
			},
			mearsure(type) {
				var _this = this;
				var layer = this.mearsureLayer;
				var mearMeter = false;
				esriLoader.dojoRequire(
					[
						"esri/Graphic",
						"esri/geometry/Point",
						"esri/geometry/Polygon",
						"esri/geometry/Polyline",
						"esri/geometry/geometryEngine",
						"dojo/domReady!"
					],
					(Graphic, Point, Polygon, Polyline, geometryEngine) => {
						_this.view.cursor = "crosshair";
						_this.drawStyle = true;
						var id = new Date().getTime();
						_this.view.graphics.removeAll();
						enableCreatePolygon(_this.draw, _this.view);

						function enableCreatePolygon(draw, view) {
							// create() will return a reference to an instance of PolygonDrawAction
							if (type == "line") {
								_this.showStyle = "mearLine";
								var action = draw.create("polyline");
							} else if (type == "gon") {
								_this.showStyle = "mearGon";
								var action = draw.create("polygon");
							}
							_this.view.focus();
							action.on("vertex-add", drawPolygon);
							action.on("cursor-update", drawPolygon);
							action.on("vertex-remove", drawPolygon);
							action.on("draw-complete", drawPolygon);
						}

						function drawPolygon(event) {
							var vertices = event.vertices;
							_this.view.graphics.removeAll();
							var polygon = createPolygon(vertices);
							var graphic = createGraphic(polygon);

							if (event.type != "draw-complete") {
								_this.view.graphics.add(graphic);
								addlabel();
							}
							if (event.type == "draw-complete") {
								_this.view.cursor = "default";
								_this.drawStyle = false;
								layer.graphics.add(graphic);
								addlabel("last");
							}
							if (event.type == "vertex-add" && type == "line") {
								var poly2 = new Polyline({
									paths: vertices,
									spatialReference: {
										wkid: 4326
									}
								});
								var point2 = new Point({
									x: vertices[vertices.length - 1][0],
									y: vertices[vertices.length - 1][1],
									spatialReference: _this.view.spatialReference
								});
								if (vertices.length == 1) {
									labelLengths(point2, "起点", "first");
								} else {
									var length2 = geometryEngine.geodesicLength(poly2, "meters");
									if (length2 < 0) {
										// simplify the polygon if needed and calculate the area again
										var simplifiedPolygon2 = geometryEngine.simplify(poly2);
										if (simplifiedPolygon2) {
											length2 = geometryEngine.geodesicLength(
												simplifiedPolygon2,
												"meters"
											);
										}
									}
									if (event.type != "draw-complete") {
										labelLengths(point2, length2, "addLine");
									}
								}
							}

							function addlabel(index) {
								if (type == "gon") {
									var poly = new Polygon({
										rings: vertices,
										spatialReference: {
											wkid: 4326
										}
									});
									var area = geometryEngine.geodesicArea(poly, "square-meters");
									if (area < 0) {
										// simplify the polygon if needed and calculate the area again
										var simplifiedPolygon = geometryEngine.simplify(poly);
										if (simplifiedPolygon) {
											area = geometryEngine.geodesicArea(
												simplifiedPolygon,
												"square-meters"
											);
										}
									}
									if (index) {
										labelAreas(polygon, area, "last");
									} else {
										if (area < 1000000) {
											_this.popupContent.area = area.toFixed(2) + "平方米";
										} else {
											_this.popupContent.area =
												(area / 1000000).toFixed(2) + "平方公里";
										}
									}
								} else if (type == "line") {
									var poly2 = new Polyline({
										paths: vertices,
										spatialReference: {
											wkid: 4326
										}
									});

									var point2 = new Point({
										x: vertices[vertices.length - 1][0],
										y: vertices[vertices.length - 1][1],
										spatialReference: _this.view.spatialReference
									});
									var length = geometryEngine.geodesicLength(poly2, "meters");
									if (length < 0) {
										// simplify the polygon if needed and calculate the area again
										var simplifiedPolygon = geometryEngine.simplify(poly2);
										if (simplifiedPolygon) {
											length = geometryEngine.geodesicLength(
												simplifiedPolygon,
												"meters"
											);
										}
									}
									if (index) {
										labelLengths(point2, length, "last");
									} else {
										if (length < 1000) {
											_this.popupContent.length = length.toFixed(2) + "米";
										} else {
											_this.popupContent.length =
												(length / 1000).toFixed(2) + "公里";
										}
									}
								}
							}
						}

						function createPolygon(vertices) {
							if (type == "gon") {
								return new Polygon({
									rings: vertices,
									spatialReference: _this.view.spatialReference
								});
							} else if (type == "line") {
								return new Polyline({
									paths: vertices,
									spatialReference: _this.view.spatialReference
								});
							}
						}

						function createGraphic(polygon) {
							if (type == "gon") {
								var graphic = new Graphic({
									attributes: {
										geoType: "mearsure",
										id: id
									},
									geometry: polygon,
									symbol: {
										type: "simple-fill", // autocasts as SimpleFillSymbol
										color: [247, 245, 242, 0.8],
										style: "solid",
										outline: {
											// autocasts as SimpleLineSymbol
											color: [255, 214, 92],
											width: 1
										}
									}
								});
							} else if (type == "line") {
								graphic = new Graphic({
									attributes: {
										geoType: "mearsure",
										id: id
									},
									geometry: polygon,
									symbol: {
										type: "simple-line", // autocasts as SimpleFillSymbol
										color: [255, 214, 92, 1],
										width: 2,
										style: "solid",
										outline: {
											// autocasts as SimpleLineSymbol
											color: [255, 255, 255],
											width: 1
										}
									}
								});
							}

							return graphic;
						}

						function labelLengths(geom, length, addType) {
							var graphicCircle = new Graphic({
								attributes: {
									geoType: "mearsure",
									id: id
								},
								geometry: geom,
								symbol: {
									type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
									style: "circl",
									color: [255, 255, 255, 1],
									size: "8px",
									outline: {
										// autocasts as new SimpleLineSymbol()
										color: [255, 214, 92, 1],
										width: 2 // points
									}
								}
							});
							var x = 30;
							var text = null;
							if (addType == "first") {
								text = "起点";
							} else if (addType == "last") {
								if (length < 1000) {
									layer.graphics.items.forEach(item => {
										if (
											item.symbol.text == length.toFixed(2) + " 米" ||
											item.symbol.text == (length / 1000).toFixed(2) + " 公里"
										) {
											layer.graphics.remove(item);
										}
									});
									text = "总长:" + length.toFixed(2) + " 米";
									if (length.toFixed(2) < 10000) {
										x = 50;
									} else {
										x = 60;
									}
								} else {
									layer.graphics.items.forEach(item => {
										if (
											item.symbol.text ==
											(length / 1000).toFixed(2) + " 公里"
										) {
											layer.graphics.remove(item);
										}
									});
									text = "总长:" + (length / 1000).toFixed(2) + " 公里";
									if ((length / 1000).toFixed(2) < 10000) {
										x = 50;
									} else {
										x = 60;
									}
								}
							} else {
								if (length < 1000) {
									text = length.toFixed(2) + " 米";
								} else {
									text = (length / 1000).toFixed(2) + " 公里";
								}
							}
							var graphic = new Graphic({
								attributes: {
									geoType: "mearsure",
									id: id
								},
								geometry: geom,
								symbol: {
									type: "text",
									color: "black",
									borderLineSize: 2,
									borderLineColor: [255, 214, 92],
									haloColor: "black",
									haloSize: "1px",
									text: text,
									xoffset: 3,
									yoffset: -14,
									font: {
										// autocast as Font
										size: 11,
										family: "sans-serif"
									}
								}
							});
							var delgraphic = new Graphic({
								attributes: {
									geoType: "mearsure",
									id: id,
									mearType: "del"
								},
								geometry: geom,
								symbol: {
									type: "picture-marker", // autocasts as new PictureMarkerSymbol()
									url: "../../../static/images/del.png",
									width: "14px",
									height: "14px",
									xoffset: x,
									yoffset: -10
								}
							});
							if (addType == "first" || addType == "addLine") {
								layer.graphics.add(graphicCircle);
								layer.graphics.add(graphic);
							} else if (addType == "last") {
								layer.graphics.add(graphicCircle);
								layer.graphics.add(graphic);
								layer.graphics.add(delgraphic);
								_this.showStyle = null;
							} else {
								_this.view.graphics.add(graphic);
							}
						}

						function labelAreas(geom, area, addType) {
							var x;
							var text = null;
							if (addType == "last") {
								if (area < 1000000) {
									text = "面积:" + area.toFixed(2) + " 平方米";
									if (area.toFixed(2) < 1000000) {
										x = 80;
									} else if (area.toFixed(2) < 1000000) {
										x = 100;
									} else {
										x = "120px";
									}
								} else {
									text = "面积:" + (area / 1000000).toFixed(2) + " 平方公里";
									if ((area / 1000000).toFixed(2) < 1000000) {
										x = 80;
									} else if ((area / 1000000).toFixed(2) < 1000000) {
										x = 100;
									} else {
										x = "120px";
									}
								}
							} else {
								if (area > 1000000) {
									text = area.toFixed(2) + " 平方米";
								} else {}
								text = (area / 1000000).toFixed(2) + " 平方公里";
							}

							var graphic = new Graphic({
								attributes: {
									geoType: "mearsure",
									id: id
								},
								geometry: geom.extent.center,
								symbol: {
									type: "text",
									color: "black",
									borderLineSize: 2,
									borderLineColor: [255, 214, 92],
									haloColor: "black",
									haloSize: "1px",
									text: text,
									xoffset: 3,
									yoffset: -14,
									font: {
										// autocast as Font
										size: 11,
										family: "sans-serif"
									}
								}
							});
							if (addType == "last") {
								var delgraphic = new Graphic({
									attributes: {
										geoType: "mearsure",
										id: id,
										mearType: "del"
									},
									geometry: geom.extent.center,
									symbol: {
										type: "picture-marker", // autocasts as new PictureMarkerSymbol()
										url: "../../../static/images/del.png",
										width: "14px",
										height: "14px",
										xoffset: x,
										yoffset: -10
									}
								});
								layer.graphics.add(graphic);
								layer.graphics.add(delgraphic);
								_this.showStyle = null;
							} else {
								_this.view.graphics.add(graphic);
							}
						}
					}
				);
			},
			//drawtype, view, layer, data
			drawcli(type, view, layer, data) {
				var _this = this;
				esriLoader.dojoRequire(
					[
						"esri/Graphic",
						"esri/geometry/Polygon",
						"esri/geometry/Point",
						"esri/geometry/Polyline",
						"dojo/domReady!"
					],
					(Graphic, Polygon, Point, Polyline) => {
						var drawType;
						var id = new Date().getTime();
						if (data) {
							if (type == "point") {
								drawType = "point";
								var wktUtil = new WKTUtil();
								var pt = wktUtil.read(data.location);
								var json = {
									x: pt[0],
									y: pt[1],
									spatialReference: view.spatialReference
								};
								var polygon = new Point(json);
							} else if (type == "line") {
								drawType = "line";
								var wktUtil = new WKTUtil();
								var points = wktUtil.read(data.location);
								var json = {
									paths: [points],
									spatialReference: view.spatialReference
								};
								var polygon = new Polyline(json);
							} else if (type == "gon") {
								drawType = "gon";
								var wktUtil = new WKTUtil();
								var points = wktUtil.read(data.location);
								var json = {
									rings: points,
									spatialReference: view.spatialReference
								};
								var polygon = new Polygon(json);
							}
							//var type = wkt.split("(")[0];
							console.log(type);
							//
							// var polygon=this.WktToPolygon(wkt);

							addGraphics(polygon);
							view.cursor = "default";
						} else {
							enableCreatePolygon(_this.draw, view, type);
						}

						function enableCreatePolygon(draw, view, type) {
							var action = null;
							_this.drawStyle = true;
							_this.view.cursor = "crosshair";
							if (type == "point") {
								action = draw.create("point");
								drawType = "point";
							} else if (type == "line") {
								action = draw.create("polyline");
								drawType = "line";
							} else if (type == "gon") {
								action = draw.create("polygon");
								drawType = "gon";
							}

							view.focus();
							action.on("vertex-add", drawPolygon);
							action.on("cursor-update", drawPolygon);
							action.on("vertex-remove", drawPolygon);
							action.on("draw-complete", drawPolygon);
						}

						function addGraphics(polygon) {
							var graphic = createGraphic(polygon, data);
							if (type == "point") {
								var point = polygon;
							} else {
								var point = polygon.extent.center;
							}
							var titless = data.title;
							if (titless.length > 15) {
								titless = titless.substr(0, 15);
							}
							var labelGraphic = new Graphic({
								attributes: {
									KEYID: data.keyid,
									geoType: "label",
									id: data.keyid,
									symbol: data.symbol,
									title: "",
									content: "",
									labelType: "title"
								},
								geometry: point,
								symbol: {
									type: "text", // autocasts as new TextSymbol()
									color: "black",
									haloColor: "black",
									haloSize: "1px",
									text: titless,
									xoffset: 0,
									yoffset: -5,
									font: {
										// autocast as new Font()
										size: 12,
										family: "sans-serif"
									}
								}
							});

							layer.add(graphic);
							layer.add(labelGraphic);
							//view.goTo(layer.graphics);
						}

						function drawPolygon(evt) {
							var vertices = evt.vertices;

							if (drawType == "point") {
								vertices = evt.coordinates;
							}
							view.graphics.removeAll();

							var polygon = createPolygon(vertices, drawType);

							var graphic = createGraphic(polygon, drawType);

							if (evt.type != "draw-complete") {
								view.graphics.add(graphic);
							}
							if (evt.type == "draw-complete") {
								_this.view.cursor = "default";
								_this.drawStyle = false;
								if (graphic.geometry.type == "point") {
									var point = graphic.geometry;
								} else {
									var point = graphic.geometry.extent.center;
								}
								var titless = graphic.attributes.title;
								if (titless.length > 15) {
									titless = titless.substr(0, 15);
								}
								var labelGraphic = new Graphic({
									attributes: {
										KEYID: -1,
										geoType: "label",
										id: id,
										symbol: graphic.attributes.symbol,
										title: "",
										content: "",
										labelType: "title"
									},
									geometry: point,
									symbol: {
										type: "text", // autocasts as new TextSymbol()
										color: "black",
										haloColor: "black",
										haloSize: "1px",
										text: titless,
										xoffset: 0,
										yoffset: -5,
										font: {
											// autocast as new Font()
											size: 12,
											family: "sans-serif"
										}
									}
								});
								layer.add(graphic);
								view.goTo(graphic);
								layer.graphics.add(labelGraphic);

								_this.radio4 = "";

								if (graphic.geometry.type == "point") {
									_this.popupPoint.label = graphic.geometry;
								} else {
									_this.popupPoint.label = graphic.geometry.extent.center;
								}

								var scpoint = view.toScreen(_this.popupPoint.label);
								$(".drawInfo").css("top", scpoint.y);
								$(".drawInfo").css("left", scpoint.x);
								_this.$refs.drawInfoBox.showAddInfo(graphic);

								/* _this.$refs.drawInfoBox.showAddInfo(
								evt.native.clientY,
								evt.native.clientX,
								graphic
							); */

								// }
								//_this.isDrawIng = false;
								// _this.updateMap();
							}
						}

						function createPolygon(vertices, type) {
							if (type == "point") {
								return new Point({
									x: vertices[0],
									y: vertices[1],
									spatialReference: view.spatialReference
								});
							} else if (type == "line") {
								return new Polyline({
									paths: vertices,
									spatialReference: view.spatialReference
								});
							} else if (type == "gon") {
								return new Polygon({
									rings: vertices,
									spatialReference: view.spatialReference
								});
							}
						}

						function createGraphic(polygon) {
							var graphic;

							if (type == "line") {
								if (data) {
									var color = [];
									data.fillColor
										.split("(")[1]
										.split(")")[0]
										.split(",")
										.forEach(item => {
											color.push(parseFloat(item));
										});
									var polylineAtt = {
										KEYID: data.keyid,
										geoType: "label",
										content: data.remark,
										title: data.title,
										id: data.keyid,
										labelType: "geo",
										type: "line",
										symbol: {
											type: "simple-line", // autocasts as SimpleFillSymbol
											color: color, //item.attributes.symbol.color
											width: parseInt(data.outerPx),
											style: "solid",
											outline: {
												// autocasts as SimpleLineSymbol
												color: "#FD8045",
												width: 1
											}
										}
									};
								} else {
									var polylineAtt = {
										KEYID: -1,
										geoType: "label",
										content: "",
										title: "",
										id: id,
										type: "line",
										labelType: "geo",
										symbol: {
											type: "simple-line", // autocasts as SimpleFillSymbol
											color: [19, 153, 255, 1],
											width: 2,
											style: "solid",
											outline: {
												// autocasts as SimpleLineSymbol
												color: "#EFF1F4",
												width: 1
											}
										}
									};
								}

								graphic = new Graphic({
									attributes: polylineAtt,
									geometry: polygon,
									symbol: polylineAtt.symbol
								});
							} else if (type == "gon") {
								if (data) {
									var color = [];
									data.fillColor
										.split("(")[1]
										.split(")")[0]
										.split(",")
										.forEach(item => {
											color.push(parseFloat(item));
										});
									var polygonAtt = {
										KEYID: data.keyid,
										geoType: "label",
										content: data.remark,
										title: data.title,
										id: data.keyid,
										labelType: "geo",
										type: "gon",
										symbol: {
											type: "simple-fill", // autocasts as SimpleFillSymbol
											color: color, //
											style: "solid",
											outline: {
												// autocasts as SimpleLineSymbol
												color: data.outerColor, //
												width: data.outerPx
											}
										}
									};
								} else {
									var polygonAtt = {
										KEYID: -1,
										geoType: "label",
										content: "",
										title: "",
										id: id,
										type: "gon",
										labelType: "geo",
										symbol: {
											type: "simple-fill", // autocasts as SimpleFillSymbol
											color: [247, 245, 242, 0.9],
											style: "solid",
											outline: {
												// autocasts as SimpleLineSymbol
												color: "#1399FF",
												width: 2
											}
										}
									};
								}
								graphic = new Graphic({
									attributes: polygonAtt,
									geometry: polygon,
									symbol: polygonAtt.symbol
								});
							} else {
								if (data) {
									var color = [];
									var polypointAtt = {
										KEYID: data.keyid,
										geoType: "label",
										content: data.remark,
										title: data.title,
										id: data.keyid,
										labelType: "geo",
										type: "point",
										style: data.pointType
									};
								} else {
									var polypointAtt = {
										KEYID: -1,
										geoType: "label",
										content: "",
										title: "",
										id: id,
										type: "point",
										labelType: "geo",
										style: "blue"
									};
								}

								graphic = new Graphic({
									attributes: polypointAtt,
									geometry: polygon,
									symbol: {
										type: "picture-marker", // autocasts as new PictureMarkerSymbol()
										url: _this.tuding[polypointAtt.style],
										width: "15px",
										height: "30px",
										xoffset: 0,
										yoffset: 15
									}
								});
							}
							return graphic;
						}
					}
				);
			},
			savaGraInfo(id, title, content, syb, KEYID) {
				if (id != null) {
					var labelGraphic = null;
					var MAPLABLEMODEL = null;
					var graphics = this.drawGraphicsLayer.graphics.items;
					for (var i = 0; i < graphics.length; i++) {
						//找到编辑的gra
						if (graphics[i].attributes.id == id) {
							if (graphics[i].attributes.labelType == "title") {
								esriLoader.dojoRequire(
									["esri/Graphic", "esri/geometry/Point", "dojo/domReady!"],
									(Graphic, Point) => {
										if (graphics[i].geometry.type == "point") {
											var point = graphics[i].geometry;
										} else {
											var point = graphics[i].geometry.extent.center;
										}
										var titless = title;
										if (titless.length > 15) {
											titless = titless.substr(0, 15);
										}
										labelGraphic = new Graphic({
											attributes: {
												KEYID: KEYID,
												geoType: "label",
												id: id,
												symbol: syb,
												title: title,
												content: "",
												labelType: "title"
											},
											geometry: point,
											symbol: {
												type: "text", // autocasts as new TextSymbol()
												color: "black",
												haloColor: "black",
												haloSize: "1px",
												text: titless,
												xoffset: 0,
												yoffset: -5,
												font: {
													// autocast as new Font()
													size: 12,
													family: "sans-serif"
												}
											}
										});
									}
								);

								this.drawGraphicsLayer.graphics.remove(graphics[i]);
								this.popupPoint.label = null;
							} else {
								graphics[i].attributes.title = title;
								graphics[i].attributes.content = content;

								if (graphics[i].geometry.type == "point") {
									console.log(syb);
									graphics[i].symbol = {
										type: "picture-marker", // autocasts as new PictureMarkerSymbol()
										url: this.tuding[syb],
										width: "15px",
										height: "30px",
										xoffset: 0,
										yoffset: 15
									};
									MAPLABLEMODEL = {
										labelType: graphics[i].geometry.type,
										location: PointToWKT(graphics[i].geometry),
										title: graphics[i].attributes.title,
										remark: graphics[i].attributes.content,
										picUrl: "",
										fillColor: "",
										outerColor: "",
										fillPx: "",
										outerPx: "",
										pointType: syb
									};
								} else if (graphics[i].geometry.type == "polygon") {
									graphics[i].attributes.symbol = syb;
									graphics[i].symbol = syb;
									MAPLABLEMODEL = {
										labelType: graphics[i].geometry.type,
										location: PolygonToWKT(graphics[i].geometry),
										title: graphics[i].attributes.title,
										remark: graphics[i].attributes.content,
										picUrl: "",
										fillColor: ArrayToString(graphics[i].attributes.symbol.color),
										outerColor: graphics[i].attributes.symbol.outline.color,
										fillPx: "",
										outerPx: graphics[i].attributes.symbol.outline.width,
										pointType: ""
									};
								} else {
									graphics[i].attributes.symbol = syb;
									graphics[i].symbol = syb;
									MAPLABLEMODEL = {
										labelType: graphics[i].geometry.type,
										location: LineToWKT(graphics[i].geometry),
										title: graphics[i].attributes.title,
										remark: graphics[i].attributes.content,
										picUrl: "",
										fillColor: ArrayToString(graphics[i].attributes.symbol.color),
										outerColor: "",
										fillPx: "",
										outerPx: graphics[i].attributes.symbol.width,
										pointType: ""
									};
								}
							}
						}
					}
					this.drawGraphicsLayer.graphics.add(labelGraphic);
					if (localStorage.getItem("token")) {
						this.$nextTick(() => {
							var data = {
								KEYID: KEYID,
								MAPLABLEMODEL: MAPLABLEMODEL
							};
							this.$fetch("/ThematicMapWS.asmx/EditMapLable", data).then(res => {
								if (KEYID == -1) {
									graphics.forEach(gras => {
										if (gras.attributes.KEYID == -1) {
											gras.attributes.KEYID = res.data;
										}
									});
								}
								this.$message({
									message: "标注成功！",
									type: "success"
								});
								this.queryLabel();
								// 								if (KEYID == -1) {
								// 									this.drawGraphicsLayer.graphics.removeAll();
								// 								}
							});
						});
					}

					function PointToWKT(geometry) {
						console.log(geometry);
						return "POINT (" + geometry.x + " " + geometry.y + ")";
					}
					/**
					 * @param geometry
					 */
					function PolygonToWKT(geometry) {
						var wkt = [];
						var rings = geometry.rings;
						for (var i in rings) {
							var ring = rings[i];
							for (var j in ring) {
								var p = ring[j];
								wkt.push(p.join(" "));
							}
						}
						return "POLYGON ((" + wkt.join(",") + "))";
					}

					/**
					 * @param geometry
					 */
					function LineToWKT(geometry) {
						var wkt = [];
						var paths = geometry.paths;
						for (var i in paths) {
							var path = paths[i];
							for (var j in path) {
								var p = path[j];
								wkt.push(p.join(" "));
							}
						}
						return "LINESTRING (" + wkt.join(",") + ")";
					}

					function ArrayToString(array) {
						return "(" + array.join(",") + ")";
					}
				}
			},
			delGraInfo(id) {
				if (id != null) {
					this.$fetch("/ThematicMapWS.asmx/DeleteMapLable", {
						KEYID: id
					}).then(res => {
						this.$message({
							message: "已删除！",
							type: "success"
						});
					});
					this.labelData.forEach(ele => {
						this.labelData.slice(this.labelData.indexOf(ele), 1);
					});
					this.drawGraphicsLayer.graphics.items.forEach(item => {
						this.$nextTick(() => {
							if (item.attributes.id == id) {
								this.drawGraphicsLayer.remove(item);
							}
						});
					});
				}
				var _this = this;
				window.setTimeout(function() {
					_this.queryLabel();
				}, 500);
			},
			laebelview(data) {
				if (data.ischeck == false) {
					this.labelData.forEach(ele => {
						if (ele.keyid == data.keyid) {
							ele.ischeck = true;
							this.clickAddLabel(ele);
						}
					});
				} else {
					this.labelData.forEach(ele => {
						if (ele.keyid == data.keyid) {
							ele.ischeck = false;
						}
					});
					this.drawGraphicsLayer.graphics.items.forEach(item => {
						this.$nextTick(() => {
							if (item.attributes.KEYID == data.keyid) {
								this.drawGraphicsLayer.remove(item);
								this.$refs.searchInfo2.isShow = false;
							}
						});
					});
				}
			},
			allAddLabel() {
				this.labelData.forEach(ele => {
					if (ele.ischeck == false) {
						this.laebelview(ele);
					}
				});
			},
			allcalLabel() {
				this.labelData.forEach(ele => {
					if (ele.ischeck == true) {
						this.laebelview(ele);
					}
				});
			},
			delMearsure(id) {
				if (id != null) {
					this.mearsureLayer.graphics.items.forEach(item => {
						this.$nextTick(() => {
							if (item.attributes.id == id) {
								this.mearsureLayer.remove(item);
							}
						});
					});
				}
			},
			//切换地图
			selectBaseLayer(index) {
				if (index == 1 && this.selectBase == false) {

					// 版本控制 2019年5月22日19:32:07 政务办使用公众版的成都天地图，加载图层一样
					//公众版****************************
					this.CDbaseLayer.visible = true;
					this.CDrasterLayer.visible = false;
					this.CDZJrasterLayer.visible = false;

					
					// if(this.view.scale>3000)
					// {
					// 	this.mapFrom="数据来源：天地图·成都";//公众版
					// 	this.mapNumber='审图号：成S【2017】003号';
					// }
					// else{
					// 	this.mapFrom="";
					// 	this.mapNumber='审图号：成S【2019】004号';
					// }
					//公众版****************************
					this.mapNumber='审图号：成S【2019】004号';//政务版
					this.baseLayer.visible = true;
					this.rasterLayer.visible = false;
					this.rasterLayer2.visible = false;
					$(".mapType").css("border", "1px solid #0065FB");
					$(".mapType2").css("border", "0px solid #0065FB");
					this.selectBase = true;
				} else if (index == 2 && this.selectBase == true) {

					// 版本控制 2019年5月22日19:32:07 政务办使用公众版的成都天地图，加载图层一样
					//公众版****************************

					this.CDrasterLayer.visible = true;
					this.CDZJrasterLayer.visible = true;
					this.CDbaseLayer.visible = false;
					//公众版
					// if(this.view.scale>3000)
					// {    
					// 	  this.mapFrom="数据来源：天地图·成都";
					// 	  this.mapNumber='审图号：成S【2017】003号';
					// }
					// else{
					// 	this.mapFrom="";
					// 	this.mapNumber='审图号：成S【2019】003号';
					// }

					//公众版****************************
					this.mapNumber='审图号：成S【2019】003号';//政务版
					this.rasterLayer.visible = true;
					this.rasterLayer2.visible = true;
					this.baseLayer.visible = false;

					$(".mapType").css("border", "0px solid #0065FB");
					$(".mapType2").css("border", "1px solid #0065FB");
					this.selectBase = false;
				}
				// 版本控制 
				//公众版****************************
				if(this.selectBase)
				{
						this.CDbaseLayer.visible = true;
						this.CDrasterLayer.visible = false;
						this.CDZJrasterLayer.visible = false;
				}
				else
				{
					this.CDbaseLayer.visible = false;
						this.CDrasterLayer.visible = true;
						this.CDZJrasterLayer.visible = true;
				}
				//公众版****************************
				//政务版****************************
				// if(this.selectBase)
				// {
				// 	if(this.skyMapShow)
				// 	{
				// 		this.CDbaseLayer.visible = true;
				// 		this.CDrasterLayer.visible = false;
				// 		this.CDZJrasterLayer.visible = false;
				// 	}
				// 	else
				// 	{
				// 		this.CDbaseLayer.visible = false;
				// 		this.CDrasterLayer.visible = false;
				// 		this.CDZJrasterLayer.visible = false;      
				// 	}
				// }
				// else
				// {
				// 	if(this.skyMapShow)
				// 	{
				// 		this.CDbaseLayer.visible = false;
				// 		this.CDrasterLayer.visible = true;
				// 		this.CDZJrasterLayer.visible = true;
				// 	}
				// 	else
				// 	{
				// 		this.CDbaseLayer.visible = false;
				// 		this.CDrasterLayer.visible = false;
				// 		this.CDZJrasterLayer.visible = false;
				// 	}
				// }
				//政务版****************************
			},

			skyMap() {
				this.skyMapShow=!this.skyMapShow;
				if(this.selectBase)
				{
					if(this.skyMapShow)
					{
						this.CDbaseLayer.visible = true;
						this.CDrasterLayer.visible = false;
						this.CDZJrasterLayer.visible = false;
					}
					else
					{
						this.CDbaseLayer.visible = false;
						this.CDrasterLayer.visible = false;
						this.CDZJrasterLayer.visible = false;      
					}
				}
				else
				{
					if(this.skyMapShow)
					{
						this.CDbaseLayer.visible = false;
						this.CDrasterLayer.visible = true;
						this.CDZJrasterLayer.visible = true;
					}
					else
					{
						this.CDbaseLayer.visible = false;
						this.CDrasterLayer.visible = false;
						this.CDZJrasterLayer.visible = false;
					}
				}
			},


			createMap() {
				var _this = this;

				// map.vue 电子地图页面 服务配置
				
				var Extent_TFXQ = _this.mapURL.Extent_TFXQ;

				var EMAP_TFXQ_CGCS2000 = _this.mapURL.EMAP_TFXQ_CGCS2000;

				var HP_TFXQ_CGCS2000 = _this.mapURL.HP_TFXQ_CGCS2000;

				var EAMP_LABEL_TFXQ_CGCS2000 = _this.mapURL.EAMP_LABEL_TFXQ_CGCS2000;

				esriLoader.dojoRequire(
					[
						"esri/Map",
						"esri/views/MapView",
						"esri/views/2d/draw/Draw",
						"esri/layers/GraphicsLayer",
						"esri/layers/TileLayer",
						"esri/layers/MapImageLayer",
						"esri/Graphic",
						"esri/tasks/IdentifyTask",
						"esri/tasks/support/IdentifyParameters",
						"esri/geometry/Point",
						"esri/geometry/Extent",
						"dojo/domReady!"
					],
					(
						Map,
						MapView,
						Draw,
						GraphicsLayer,
						TileLayer,
						MapImageLayer,
						Graphic,
						IdentifyTask,
						IdentifyParameters,
						Point,
						Extent
					) => {
						_this.extentLayer = new MapImageLayer({
							title:"extent",
							url: Extent_TFXQ,
							maxScale : 3000,
							minScale : 30000000,
							visible: true
						});
						_this.baseLayer = new TileLayer({
							title:"base",
							url: EMAP_TFXQ_CGCS2000,
							//公众版****************************
							// maxScale : 1,
							// minScale : 3000,
							//公众版****************************
							visible: true
						});

						// 版本控制 2019年5月22日19:32:07 政务办使用公众版的成都天地图，加载图层一样

						//公众版****************************

						_this.CDbaseLayer = new TileLayer({
							title:"cdbase",
							url: _this.mapURL.CD_TDT_JD,
							maxScale : 3000,
							minScale : 30000000,
							visible: true
						});
						_this.CDrasterLayer = new TileLayer({
							title:"cdraster",
							url: _this.mapURL.CD_TDT_YXT,
							maxScale : 3000,
							minScale : 30000000,
							visible: false
						});
						_this.CDZJrasterLayer = new TileLayer({
							title:"cdraster2",
							maxScale : 3000,
							minScale : 30000000,
							url: _this.mapURL.CD_TDT_YXTZJ,
							visible: false
						});

						//公众版****************************

						_this.rasterLayer = new TileLayer({
							url: HP_TFXQ_CGCS2000,
							//公众版****************************
							// maxScale : 1,
							// minScale : 3000,
							//公众版****************************
							visible: false
						});
						_this.rasterLayer2 = new TileLayer({
							url: EAMP_LABEL_TFXQ_CGCS2000,
							//公众版****************************
							// maxScale : 1,
							// minScale : 3000,
							//公众版****************************
							visible: false
						});
						// 版本控制 2019年5月22日19:32:07 政务办使用公众版的成都天地图，加载图层一样
						_this.webmap = new Map({
							//政务版*****************************
							// layers: [_this.baseLayer, _this.rasterLayer, _this.rasterLayer2]

							//政务版*****************************
							//公众版*****************************

							layers: [_this.CDbaseLayer,_this.CDrasterLayer,_this.CDZJrasterLayer,_this.baseLayer, _this.rasterLayer, _this.rasterLayer2,_this.extentLayer],
							//公众版*****************************
						});

						_this.view = new MapView({
							container: "map", // Reference to the scene div created in step 5
							map: _this.webmap, // Reference to the map object created before the scen
						});

						_this.view.ui._removeComponents(["attribution", "zoom"]);
						_this.baseLayer.fullExtent = new Extent({
							xmin: 103.98409207100008,
							ymin: 30.228202938000038,
							xmax: 104.26727592700007,
							ymax: 30.571430121000038,
							spatialReference: {
								wkid: 4490
							}
						});
						_this.view.when(
							function() {
								_this.draw = new Draw({
									view: _this.view
								});
								_this.swlayer = new GraphicsLayer();
								_this.webmap.add(_this.swlayer);
								_this.rigionLayer = new GraphicsLayer();
								_this.webmap.add(_this.rigionLayer);
								_this.searchGraphicsLayer = new GraphicsLayer();
								_this.webmap.add(_this.searchGraphicsLayer);
								_this.drawGraphicsLayer = new GraphicsLayer();
								_this.webmap.add(_this.drawGraphicsLayer);
								_this.mearsureLayer = new GraphicsLayer();
								_this.webmap.add(_this.mearsureLayer);
								_this.$nextTick(() => {
									_this.viewAllOver();
									if (localStorage.getItem("token")) {
										_this.queryLabel();
									}
								});
							},
							function(error) {
								console.log(error);
							}
						);
						_this.view.watch("extent", function() {
							if (_this.popupPoint.label) {
								var scpoint = _this.view.toScreen(_this.popupPoint.label);
								$(".drawInfo").css("top", scpoint.y);
								$(".drawInfo").css("left", scpoint.x);
							}
							if (_this.popupPoint.search) {
								var scpoint = _this.view.toScreen(_this.popupPoint.search);
								$(".searchinfo").css("top", scpoint.y);
								$(".searchinfo").css("left", scpoint.x);
							}
							if (_this.popupPoint.buffer) {
								var scpoint = _this.view.toScreen(_this.popupPoint.buffer);
								$(".buffer-point").css("top", scpoint.y - 10);
								$(".buffer-point").css("left", scpoint.x - 16);
							}
							if(_this.view.scale>3000)
							{
								//公众版
								// _this.mapFrom="数据来源：天地图·成都";
								// _this.mapNumber='审图号：成S【2017】003号';
							}
							else{
								_this.mapFrom="";
								if(_this.selectBase == false)
								{
									_this.mapNumber='审图号：成S【2019】003号';
								}else{
									_this.mapNumber='审图号：成S【2019】004号';
								}
								
							}
							console.log(_this.view.zoom);
							// if(_this.view.zoom.indexOf('.')!=-1){
							_this.mapLevel = Math.round(_this.view.zoom + 9);
							_this.btnTop = (120 / 11) * (11 - _this.view.zoom);
							_this.showLevel=true;
							setTimeout(()=>{
								_this.showLevel=false;
							},500)
							

						});
						_this.view.on("pointer-move", function(event) {
							$(".mear_label").css("top", event.y + 20);
							$(".mear_label").css("left", event.x + 20);
							if (!_this.drawStyle) {
								_this.view.cursor = "default";
								_this.view.hitTest(event).then(getGraphics2);
							}
						});

						function getGraphics2(response) {
							var attributes = response.results[0].graphic.attributes;
							if (attributes.mearType == "del" || attributes.anaType == "del") {
								console.log(response.results[0].graphic);
								_this.view.cursor = "pointer";
							}
						}
						_this.view.on("click", eventHandler);

						function eventHandler(event) {

							//identifyTasks(event);
							// _this.$refs.checkInfoBox.isShow = false;
							if (_this.actRight == "Hover") {
								_this.actRight = "";
								if (_this.queryDate1.NAME == "") {
									_this.showTypeBol = true;
								}
							}
							if (event.button == 2) {
								_this.closeSearch();
								_this.$nextTick(() => {
									_this.data.dataName = "周边查询点";
									_this.data.position = event.mapPoint;
									debugger;
									_this.rightBtnBol = true;
									$(".rightBtn").css("top", event.y + 10);
									$(".rightBtn").css("left", event.x + 10);
								});
							} else {
								_this.rightBtnBol = false;
								_this.view.hitTest(event).then(getGraphics);
							}
						}

						function getGraphics(response) {
							if (response.results.length > 0) {
								if (response.results[0].graphic.attributes.id) {
									var graphic = response.results[0].graphic;
									var attributes = graphic.attributes;
									if (!_this.drawStyle) {
										if (attributes.type == "Data") {} else if (
											attributes.geoType == "label" &&
											attributes.labelType == "geo"
										) {
											_this.popupPoint.label = _this.view.toMap({
												x: response.screenPoint.x,
												y: response.screenPoint.y
											});
											var scpoint = _this.view.toScreen(_this.popupPoint.label);
											$(".drawInfo").css("top", scpoint.y);
											$(".drawInfo").css("left", scpoint.x);
											_this.$refs.drawInfoBox.showAddInfo(graphic);
										} else if (attributes.geoType == "mearsure") {
											if (attributes.mearType == "del") {
												_this.delMearsure(attributes.id);
											}
										} else if (attributes.geoType == "search") {
											_this.mapview(graphic);
											// 											_this.popupPoint.search = _this.view.toMap({
											// 												x: response.screenPoint.x,
											// 												y: response.screenPoint.y
											// 											});
											// 											var scpoint = _this.view.toScreen(_this.popupPoint.search);
											// 											$(".searchinfo").css("top", scpoint.y);
											// 											$(".searchinfo").css("left", scpoint.x);
											// 											_this.$refs.searchInfo.showAddInfo(
											// 												graphic
											// 											);
										}
									}
								}
								// 								else {
								// 									var graphic = response.results[0].graphic;
								// 									_this.$refs.checkInfoBox.showInfo(
								// 										response.screenPoint.y,
								// 										response.screenPoint.x,
								// 										graphic,
								// 									);
								// 								}
							} else {
								if (_this.lableLayers.length > 0) {
									for (var i = 0; i < _this.lableLayers.length; i++) {
										if (
											_this.lableLayers[i].clickAction == "jiejing" &&
											_this.lableLayers[i].isSelect == true
										) {
											identifyTasks("jiejing", response.screenPoint);
											break;
										} else if (
											_this.lableLayers[i].clickAction == "quanjing" &&
											_this.lableLayers[i].isSelect == true
										) {
											identifyTasks("quanjing", response.screenPoint);
											break;
										}
									}
								}
							}
						}

						function identifyTasks(type, event) {
							var bol = true;
							if (type == "jiejing") {
								var url =
									"http://125.70.229.64:6080/arcgis/rest/services/TFXQ/JJ_Street_2000/MapServer";
							} else {
								var url =
									"http://app.cdkc.cn:6080/arcgis/rest/services/TFXQ/GCD_DPM_2000/MapServer";
							}
							var identifyTask = new IdentifyTask(url);
							var params = new IdentifyParameters();
							params.tolerance = 3;
							params.returnGeometry = false;
							params.layerIds = [0];
							params.layerOption = "top";
							params.width = _this.view.width;
							params.height = _this.view.height;
							params.geometry = event.mapPoint;
							params.mapExtent = _this.view.extent;
							identifyTask.execute(params).then(function(response) {
								if (response.results.length != 0) {
									if (type == "jiejing") {
										_this.panoramaUrl =
											"http://125.70.229.64/tfxqstreet/index.html?id=" +
											response.results[0].feature.attributes.GID;
									} else {
										_this.panoramaUrl =
											response.results[0].feature.attributes.URL;
									}
									_this.dialogPanorama = true;
								} else {
									if (bol) {
										if (type == "jiejing") {
											for (var i = 0; i < _this.lableLayers.length; i++) {
												if (
													_this.lableLayers[i].clickAction == "quanjing" &&
													_this.lableLayers[i].isSelect == true
												) {
													identifyTasks("quanjing", event);
													bol = false;
													break;
												}
											}
										} else {
											for (var i = 0; i < _this.lableLayers.length; i++) {
												if (
													_this.lableLayers[i].clickAction == "jiejing" &&
													_this.lableLayers[i].isSelect == true
												) {
													identifyTasks("jiejing", event);
													bol = false;
													break;
												}
											}
										}
									}
								}
							});
						}
						_this.view.on("mouse-wheel", function(e) {
							if (e.x != _this.mouseWheel.x && e.y != _this.mouseWheel.y) {
								if (_this.fullextents.length < 10) {
									_this.fullextents.push(_this.view.extent);
									_this.mouseWheel.x = e.x;
									_this.mouseWheel.y = e.y;
								} else {
									_this.fullextents.shift();
									_this.fullextents.push(_this.view.extent);
									_this.mouseWheel.x = e.x;
									_this.mouseWheel.y = e.y;
								}
							}
							_this.index = null;
						});
						_this.view.on("drag", function(e) {
							if (e.action == "end") {
								if (_this.fullextents.length < 10) {
									_this.fullextents.push(_this.view.extent);
								} else {
									_this.fullextents.shift();
									_this.fullextents.push(_this.view.extent);
								}
							}

							_this.index = null;
						});
						_this.view.on("double-click", function(e) {
							if (_this.fullextents.length < 10) {
								_this.fullextents.push(_this.view.extent);
							} else {
								_this.fullextents.shift();
								_this.fullextents.push(_this.view.extent);
							}
							_this.index = null;
						});
					}
				);
			}
		},
		created() {
			this.$fetch("/ThematicMapWS.asmx/GetMapTree").then(res => {
				//
				this.MapsTree = res.data;
				for (var i = 0; i < this.MapsTree.length; i++) {
					for (var j = 0; j < this.MapsTree[i].children.length; j++) {
						this.MapsTree[i].children[j].isCheck = false;
					}
				}
			});
			this.$fetch("/ThematicMapWS.asmx/GetDistrictData").then(res => {
				this.reginData = res.data;
			});
			this.$fetch("/ThematicMapWS.asmx/GetMapPOIType").then(res => {
				this.typeData = res.data;
			});
		},
		mounted() {
			// alert("111")
			var that = this;
			window.onresize = function temp() {
				that.tableH = document.getElementById("main").clientHeight - 300;
				$(".hideXX").css("height", that.tableH + "px");
			};
			this.$nextTick(() => {
				that.tableH = document.getElementById("main").clientHeight - 300;
				$(".hideXX").css("height", that.tableH + "px");
			});

			if (!esriLoader.isLoaded()) {
				esriLoader.bootstrap(
					err => {
						if (err) {
							console.error(err);
						} else {
							this.createMap();
						}
					}, {
						url: that.mapURL.dojojs
					}
				);
			} else {
				this.createMap();
			}
		}
	};
</script>
<style>
	.search-ad-type .el-button {
		margin-left: 10px !important;
	}

	.dialogPan .el-dialog__headerbtn .el-dialog__close {
		font-size: 25px;
	}

	.dialogPan .el-dialog__body {
		min-height: 750px;
		height: calc(100% - 50px);
	}

	.dialogPan .iconfont {
		float: right;
		margin-right: 39px;
		margin-top: 9px;
	}

	.menhuInput {
		height: 40px;
		width: 360px;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		padding-left: 5px;
		background: #ffffff;
	}

	.menhuInput .el-input {
		width: 170px;
		/* float: right; */
	}

	.menhuInput span {
		height: 40px;
	}

	.menhuInputLabel {
		font-size: 16px;
		color: #999;
	}

	.menhuInputLabel span {
		color: #000;
	}

	.menhuInput .el-input__inner {
		width: 170px;
		border: 0px solid #dcdfe6;
		border-radius: 4px;
		height: 38px;
		padding-left: 0px;
	}

	.hideXX {
		overflow-x: hidden;
	}

	.hideXX .el-scrollbar__wrap {
		overflow-x: hidden;

		/* margin-bottom: 0px !important; */
	}

	.hideX .el-scrollbar__wrap {
		overflow-x: hidden;
		max-height: 250px;
		/*border-bottom: 1px solid #9C9C9C;*/
	}

	/* .hideX .el-scrollbar__wrap */
	.message-title .el-button--text {
		display: inline;
		font-size: 16px;
	}

	.el-tree-node__expand-icon.is-leaf {
		display: none;
	}
</style>
<style scoped>
	/* 版本控制 */

	/* 市堪院 */
	/* @import url("http://125.70.229.64:4471/arcgis_js_api/library/4.8/esri/css/main.css"); */

	/* 天府新区 政务版 */
	/* @import url("http://10.1.235.129/arcgis_js_v48_api/arcgis_js_api/library/4.8/esri/css/main.css"); */

	/* 天府新区 公众版 */
	@import url("http://171.221.172.166:7002/arcgis_js_v48_api/arcgis_js_api/library/4.8/esri/css/main.css");

	.el-dropdown {
		vertical-align: middle;
	}

	.linshi {
		position: absolute;
		bottom: 20px;
		right: 0px;
		height: 100px;
		width: 300px;
	}

	.Hot {
		background: #ffb608;
		height: 18px;
		color: #ffffff;
		font-style: normal;
		border-radius: 6px;
		display: inline-block;
		font-size: 10px;
		color: #ffffff;
		width: 38px;
		position: relative;
		margin-left: 30px;
	}

	.Hot::after {
		position: absolute;
		content: "HOT";
		color: #fff;
		top: 0;
		z-index: 999;
		height: 20px;
		line-height: 18px;
		text-align: center;
		left: 7px;
	}

	.map-searve {
		position: absolute;
		right: 20px;
		top: 100px;
		z-index: 99;
		border-radius: 5px;
		box-shadow: 0 3px 8px rgba(0, 44, 104, 0.1);
	}

	.searve-top {
		width: 253px;
		height: 63px;
		color: #ffffff;
		padding: 28px;
		text-align: center;
		font-size: 18px;
		background: url(../../../static/images/mapTopbg.png) no-repeat;
	}

	.searve-content {
		background: #ffffff;
		/*border: 1px groove #F0F0F0;*/

		border-top-width: 0px;
		border-bottom-width: 0px;
	}
	.mapNum {
		position: absolute;
		bottom: 65px;
		left: 40px;
		background: #ffffff;
	}
	.mapNum2 {
		position: absolute;
		bottom: 40px;
		left: 40px;
		background: #ffffff;
	}
	.tab-map {
		position: absolute;
		bottom: 100px;
		right: 80px;
	}

	.mapType {
		width: 65px;
		height: 46px;
		background: url(../../../static/images/mapType.png) 0 0;
		position: absolute;
		z-index: 99;
		right: 135px;
		border: 1px solid #0065fb;
		top: 20px;
		border-radius: 2px;
		font-size: 12px;
		cursor: pointer;
	}

	.mapType span {
		position: absolute;
		right: 0;
		bottom: 0;
		background: #3385ff;
		color: #fff;
		padding: 0 2px;
	}

	.mapType2 {
		right: 70px;
		border: none;
		background: url(../../../static/images/mapType.png) 0 -60px;
	}
	.mapType3 {
		right: 1px;
		border: none;
		background: url(../../../static/images/mapType.png) 0 -180px;
	}

	#map {
		height: 100%;
		width: 100%;
		position: relative;
		overflow: hidden;
	}

	.search {
		position: absolute;
		z-index: 99;
		top: 20px;
		left: 20px;
		width: 395px;
	}

	.search .el-input__inner {
		border-color: #108ee9;
		height: 46px;
		line-height: 46px;
	}

	.search-btn {
		position: absolute;
		right: 0;
		top: 0;

		color: #ffffff;
		border-color: #108ee9;
		background: #008dff;
		/* For browsers that do not support gradients */
		background: -webkit-linear-gradient(to right, #008dff, #0065fb);
		/* For Safari 5.1 to 6.0 */
		background: -o-linear-gradient(to right, #008dff, #0065fb);
		/* For Opera 11.1 to 12.0 */
		background: -moz-linear-gradient(to right, #008dff, #0065fb);
		/* For Firefox 3.6 to 15 */
		background: linear-gradient(to right, #008dff, #0065fb);
		/* Standard syntax */
		border-left: none;
	}

	.right-nav {
		position: absolute;
		right: 20px;
		top: 20px;
		width: 550px;
		height: 46px;
		z-index: 99;
		border-radius: 2px;
		background: #fff;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
	}

	.right-nav ul {
		width: 100%;
	}

	.right-nav li {
		display: inline-block;
		width: 24%;
		/* margin-left: -7px; */
		text-align: center;
		line-height: 36px;
		margin-top: 5px;
		/*border-right: 1px solid #E5E5E5;*/
		cursor: pointer;
		position: relative;
	}

	.right-nav li::after {
		content: "";
		height: 30px;
		border-right: 1px solid #e5e5e5;
		position: absolute;
		right: 0;
		top: 5px;
	}

	.lastL::after {
		border-width: 0px !important;
	}

	.right-nav li:last-of-type {
		border: none;
	}

	.right-nav li img {
		margin-right: 5px;
		vertical-align: middle;
	}

	.el-menu-vertical-demo {
		border: none;
	}

	.ol-zoom {
		top: auto;
		bottom: 0.5em;
	}

	.searve-content .el-submenu .el-menu-item {
		/* height: 40px; */
		height: 50px;
		line-height: 40px;
		padding: 0 0 0 15px;
		min-width: 200px;
		border-bottom: 1px solid #e5e5e5;
		list-style: disc;
		list-style-position: inside;
		padding-left: 10px !important;
		margin: 0 25px;
	}

	.mear_label {
		border: 2px;
		position: absolute;
		border-style: solid;
		border-radius: 4px;
		border-width: 1;
		border-color: #ffde8e;
		background-color: #ffffff;
		z-index: 3008;
	}

	.mear_label p {
		margin: 5px 5px 5px 5px;
	}

	.rightBtn {
		width: 110px;
		text-align: right;
		/* height:200px; */
		
		position: absolute;
		border-style: solid;
		/* border-radius: 4px;
		border-width: 1;
		border-color: #ffde8e; */
		box-shadow:  0px 0px 1px 1px rgba(215, 219, 224, 1);
		background-color: #ffffff;
		z-index: 3008;
	}

	.rightBtn .el-button {
		margin-left: 0px !important;
	}

	.layers {
		background-color: #ffffff;
		width: 253px;
		height: 100%;
		z-index: 99;
		padding: 0px;
		margin-bottom: 20px;
		border-top: none;
		border-top: 1px solid #e4e4e4;
	}

	.search-top {
		height: 40px;
		width: 371px;
		background-color: #e1efff;
		display: flex;
		/* justify-content: center; */
		align-content: center;
		/* text-align: center; */
		font-size: 15px;
		display: flex;
		align-items: center;
		color: #000000;
		margin: 5px 10px 5px 14px;
	}

	.search-top span {
		display: flex;
		align-items: center;
		height: 32px;
	}

	.layers-top {
		height: 50px;
		background-color: #ffffff;
		display: flex;
		justify-content: center;
		align-content: center;
		text-align: center;
		font-size: 18px;
		display: flex;
		align-items: center;
	}

	.layers-top p {
		padding-top: 6px;
	}

	.layers-content .iconfont {
		margin-right: 4px;
	}

	.layers-content {
		background: #ffffff;
		border-radius: 0px 0px 5px 5px;
		border-style: solid;
		border-width: 2px;
		border-top-width: 0px;
		border-color: #f6f5f2;
	}

	.isCheck {
		float: right !important;
	}

	.isCheck2 {
		float: right !important;
		margin-right: 10px;
		height: 30px;
		width: 30px;
		position: relative;
		right: 40px;
		bottom: -12px;
	}

	.el-submenu__title {
		background-color: #0000ff !important;
	}

	.el-menu-vertical-demo {
		border: none;
	}

	.right-menu-content {
		height: 100%;
		overflow: hidden;
		padding: 5px;
		border-radius: 0px 0px 5px 5px;
		border-style: solid;
		border-width: 2px;
		border-top-width: 0px;
		border-color: #fff;
	}

	.my-tree .el-tree-node {
		margin-bottom: 5px;
	}

	.my-slider {
		display: inline-block;
		width: 33px;
		vertical-align: middle;
		margin: 0 10px 0 0px;
	}

	.my-checkbox {
		width: 6em;
		word-break: break-all;
		white-space: normal;
		vertical-align: middle;
		display: inline-block;
		line-height: 1.5em;
	}

	.my-tree .el-tree-node__content {
		height: auto;
		min-height: 36px;
	}

	.my-checkbox .el-checkbox__label {
		width: 8em;
		word-break: break-all;
		white-space: normal;
		vertical-align: middle;
	}

	.my-text {
		display: inline-block;
		width: 40px;
		font-size: 12px;
	}

	.my-close {
		font-size: 12px;
		font-weight: bold;
		padding-left: 10px;
	}

	.showBox {
		position: absolute;
		left: 20px;
		top: 70px;
		height: 90%;
	}

	.tabCare {
		width: 30px;
		position: absolute;
		right: -26px;
		top: calc(50% - 200px);
	}

	.tabCare li {
		overflow: hidden;
		word-break: break-all;
		padding: 20px 7px;
		text-align: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		/* background: url(../../../static/images/map-tabcare-bg.png) no-repeat 0 -108px; */
		background-color: #f4f4f4;

		line-height: 1.1em;
		cursor: pointer;
		height: 102px;
		position: relative;
	}

	.tabCare li.active {
		/* background: url(../../../static/images/map-tabcare-bg.png) no-repeat 0 0; */
		background-color: #40a4ff;
		z-index: 99;
		color: #fff;
	}

	.search_Info {
		padding-top: 5px;
		background-color: #ffffff;
		width: 395px;
		height: 100%;
		z-index: 99;
	}

	.message {
		height: 70px;
		margin: 10px 30px;
	}

	.message .message-title {
		height: 30px;
		font-size: 30px;
		display: flex;
		align-content: center;
	}

	.message .message-content {
		display: flex;
		align-content: center;
		height: 20px;
		margin-left: 32px;
		font-size: 14px;
	}

	.message .message-content span {
		height: 20px;
	}

	.message .message-title i {
		color: #008dff;
		font-size: 20px;
	}

	.message .message-title .el-button {
		padding: 0px;
	}

	.mesHover {
		background-color: #f4f3f0 !important;
	}

	.nodata {
		display: flex;
		justify-content: center;
		margin-top: 40px;
	}

	.nearby_drager {
		background-image: url(../../../static/images/leftright.png);
		cursor: ew-resize;
		width: 31px;
		height: 19px;
		background-position: 0px 0px;
		background-repeat: no-repeat;
	}

	.nearby_lable {
		background-image: url(../../../static/images/leftright.png);
		width: 56px;
		height: 18px;
		background-position: -31px 0px;
		background-repeat: no-repeat;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 12px;
		padding-left: 5px;
	}

	.buffer-point {
		position: absolute;
		top: 500px;
		left: 500px;
		height: 20px;
		width: 100px;
		display: flex;
	}

	.myClose {
		position: absolute;
		right: 80px;
		top: 14px;
		cursor: pointer;
	}

	.icon-rotate {
		transform: rotate(180deg);
		transition: all linear 0.15s;
	}

	.rigionBox {
		position: absolute;
		right: 0px;
		top: 45px;
		width: 300px;
		min-height: 100px;
		border-radius: 2px;
		background: #fff;
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
		/* display: flex;
		flex-direction: row;
		align-content:flex-start; */
		/* flex-wrap: nowrap; */
	}

	.huitui:hover {
		text-decoration: underline;
	}

	.mapPan {
		position: absolute;
		right: 99px;
		bottom: 114px;
		width: 52px;
		height: 212px;
		text-align: center;
		/* background: #000000; */
		/* border:1px solid red; */
	}

	.mapPan .dir-btn {
		height: 14px;
		display: inline-block;
		margin: 1px auto;
		cursor: pointer;
	}

	.mapPan .dir-line {
		width: 10px;
		height: 127px;
		display: inline-block;
		position: relative;
		background: url(../../../static/images/DT_pan/HDT.png) no-repeat;
	}

	.mapPan .dir-up {
		background: url(../../../static/images/DT_pan/up.png) no-repeat;
		width: 12px;
		height: 7px;
		vertical-align: bottom;
		/* display: flex; */
		/* flex-direction:row; */
		/* justify-content: flex-start; */
	}

	.mapPan .dir-down {
		background: url(../../../static/images/DT_pan/down.png) no-repeat;
		width: 12px;
		height: 7px;
		vertical-align: top;
	}

	.mapPan .dir-left {
		background: url(../../../static/images/DT_pan/left.png) no-repeat;
		width: 7px;
		height: 12px;
		margin-left: 4px;
		margin-top: 3px;
	}

	.mapPan .dir-right {
		background: url(../../../static/images/DT_pan/right.png) no-repeat;
		width: 7px;
		height: 12px;
		/* text-align: left; */
		margin-right: 4px;
		margin-top: 3px;
	}

	.mapPan .dir-center {
		background: url(../../../static/images/DT_pan/mid.png) no-repeat;
	}

	.mapPan .dir-add {
		width: 26px;
		height: 22px;
		margin: 0px;
		margin-top: 12px;
		background: url(../../../static/images/DT_pan/JIA.png) no-repeat;
	}

	.mapPan .dir-dec {
		width: 26px;
		height: 22px;
		margin: 0px;
		background: url(../../../static/images/DT_pan/JIAN.png) no-repeat;
	}

	.panBlock {
		position: absolute;
		/* top:0px; */
		left: -6px;
		width: 22px;
		height: 7px;
		background: url(../../../static/images/DT_pan/pan.png) no-repeat;
		cursor: ns-resize;
	}

	.panBox {
		position: absolute;
		/* top:0px; */
		left: 18px;
		height: 19px;
		width: 38px;
		/* border:1px solid #000000; */
		background: url(../../../static/images/DT_pan/popBox.png) no-repeat;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.dircBox {
		width: 52px;
		height: 52px;
		background: url(../../../static/images/DT_pan/mid.png) no-repeat;
	}
	.rightBtnLi{
		position:relative;
		height:30px;
	}
	.rightBtnLi span{
		height:30px;
		line-height: 30px;
		font-size: 14px;
		cursor:pointer;
		margin-right:18px;
	}
	.activeRight{
		background: #f6f6f6;
	}
	.rightBtnLi img{
		position:absolute;
		top:7px;
		left:10px;
		height:16px;
		width:16px;
	}
</style>
