<template>
	<div class="nav-content">
		<h1>OGC WMTS服务浏览</h1>
		<!-- <div id="map" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
		<div class="introduce">
			<p>描述：</p>
			<p>通过使用API for javascript 浏览发布的WMTS类型的切片地图服务，其中主要用到图层类中的矢量图层类Tile,以及数据源类中的WMTS类。</p>
			<p>代码如下：</p>
		</div>
		<div class="codes">
			<pre class="htmledit_views">
&lt;!DOCTYPE html>
&lt;html>
	&lt;head>
		&lt;meta charset="utf-8">
		&lt;meta name="viewport" content="width=device-width,initial-scale=1.0">
		&lt;title>OGC WMTS服务</title>
		&lt;script type="text/javascript" src="http://171.221.172.166:7100/ol/js/ol.js"></script>
		&lt;link rel="stylesheet" type="text/css" href="http://171.221.172.166:7100/ol/css/ol.css">
		&lt;script type="text/javascript" src="http://171.221.172.166:7100/ol/proj4.js"></script>
	&lt;/head>
	&lt;body onload="init()">
		&lt;div id="map" style="width:100%;height:100%;background-color:#dcefff;margin-top:10px">
		&lt;/div>
		&lt;script>
			proj4.defs("EPSG:4490","+proj=longlat +ellps=GRS80 +no_defs");
			var proj4490 = new ol.proj.Projection({
				code: 'EPSG:4490',
				extent: [-180,-90,180,90]
			  });
			  var projectionExtent =[-180,-90,180,90];
			  var size = ol.extent.getWidth(projectionExtent) / 256;
			  var resolutions = new Array(21);
			  var matrixIds = new Array(21);
			  for (var z = 0; z < 21; ++z) {
				// generate resolutions and matrixIds arrays for this WMTS
				resolutions[z] = size / Math.pow(2, z);
				matrixIds[z] = z;
			  }
			function init() {
				var source = new ol.source.WMTS({
					url: 'http://171.221.172.166:16080/Service241131977229647919922'+'/WMTS/',//WMTS服务
					layer: '0,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18',//WMTS服务显示图层序号
					matrixSet: 'EPSG:4490',
					format: 'image/png',
					projection: proj4490,
					tileGrid: new ol.tilegrid.WMTS({
					origin: ol.extent.getTopLeft(projectionExtent),
					resolutions: resolutions,
					matrixIds: matrixIds
				  }),
				  style: 'default',
				  wrapX: true
				})
				var layer = new ol.layer.Tile({
					source: source,
				});

				map = new ol.Map({
					layers: [layer],
					target: 'map',

					view: new ol.View({
						center:[104.10, 30.44],//坐标转换
						zoom: 14,
						projection: proj4490,
						extent:[-180,-90,180,90]
					})
				});
			}
		&lt;/script>
	&lt;/body>
&lt;/html>
             </pre>

		</div>
	</div>
</template>

<script>
	import ol from 'openlayers'
	import 'openlayers/css/ol.css';
	export default {
		data() {
			return {

			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {

			}
		}
	}
</script>

<style scoped>
	.htmledit_views {
		line-height: 2em;
	}

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
</style>
