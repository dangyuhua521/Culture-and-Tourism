<template>
	<div class="nav-content">
		<h1>OGC WMS服务浏览</h1>
		<!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
		<div class="introduce">
			<p>描述：</p>
			<p>通过使用API for javascript 浏览发布的WMS类型的矢量地图服务，其中主要用到图层类中的矢量图层类Tile,以及数据源类中的TileWMS类。</p>
			<p>代码如下：</p>
		</div>
		<div class="codes">
			<pre class="htmledit_views">
&lt;!DOCTYPE html>
&lt;html>
	&lt;head>
		&lt;meta charset="utf-8">
		&lt;meta name="viewport" content="width=device-width,initial-scale=1.0">
		&lt;meta http-equiv="Access-Control-Allow-Origin" content="*">
		&lt;title>OGC WMS服务</title>
		&lt;script type="text/javascript" src="http://171.221.172.166:7100/ol/js/ol.js"></script>
		&lt;link rel="stylesheet" type="text/css" href="http://171.221.172.166:7100/ol/css/ol.css">
		&lt;script type="text/javascript" src="http://171.221.172.166:7100/ol/proj4.js"></script>
	&lt;/head>
	&lt;body onload="init()">
		&lt;div id="map" style="width:100%;height:100%;background-color:#dcefff;margin-top:10px">
		&lt;/div>
		&lt;script>
			proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
			ol.proj.proj4.register(proj4);
			var proj4490 = new ol.proj.Projection({
				code: 'EPSG:4490',
				extent: [-180, -90, 180, 90]
			});
			function init() {
				var layers = [];
				var map = new ol.Map({
					layers: layers,
					target: 'map',
					view: new ol.View({
						center: [104.10, 30.44], //坐标转换
						zoom: 14,
						projection: proj4490,
						extent: [-180, -90, 180, 90]
					})
				});
				var format = 'image/png';
				map.addLayer(new ol.layer.Tile({
					source: new ol.source.TileWMS({
						projection: ol.proj.get('EPSG:4326'),
						url: 'http://171.221.172.166:16080/Service243131979781074638672',//
						params: {
							VERSION: '1.3.0',
							STYLES: '',
							TILED: true,
							LAYERS: '0',
						},
					})
				}))
				var bounds = [-180, -90, 180, 90];
				map.getView().fit(bounds, map.getSize());
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
			//this.init()
		},
		methods: {
			init() {
				var layers = [
					new ol.layer.Tile({
						source: new ol.source.TileWMS({
							url: 'https://ahocevar.com/geoserver/wms',
							params: {
								'LAYERS': 'ne:ne',
								'TILED': true
							},
							serverType: 'geoserver',
							crossOrigin: 'anonymous'
						})
					})
				];
				var map = new ol.Map({
					layers: layers,
					target: 'mapDiv',
					view: new ol.View({
						center: [0, 0],
						zoom: 1
					})
				});
			},
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
