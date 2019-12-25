<template>
<div class="nav-content">
    <h1>OGC kml读取</h1>
    <!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
    <div class="introduce">
        <p>描述：</p>
        <p>通过使用API for javascript 浏览kml数据，其中主要用到图层类中的矢量图层类Tile,以及数据源类中的Vector类，以及读取kml的format数据类型ol.format.KML的格式化类。</p>
        <p>代码如下：</p>
    </div>
    <div class="codes">
        <pre class="htmledit_views">
&lt;!DOCTYPE html>
&lt;html>
	&lt;head>
		&lt;meta charset="utf-8">
		&lt;meta name="viewport" content="width=device-width,initial-scale=1.0">
		&lt;title>KML服务加载</title>
		&lt;script type="text/javascript" src="http://171.221.172.166:7100/ol/js/ol.js"></script>
		&lt;link rel="stylesheet" type="text/css" href="http://171.221.172.166:7100/ol/css/ol.css">
		&lt;script type="text/javascript" src="http://171.221.172.166:7100/ol/proj4.js"></script>
	&lt;/head>
	&lt;body onload="init()">
		&lt;div id="map" style="width:100%;height:100%;background-color:#dcefff;margin-top:10px">
		&lt;/div>
		&lt;script>
			proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
			var proj4490 = new ol.proj.Projection({
				code: 'EPSG:4490',
				extent: [-180, -90, 180, 90]
			});

			function init() {
				var vectorSource = new ol.source.Vector({
					url: 'http://171.221.172.166:7100/ol/example.kml',//kml文件地址,本地文件需要在服务端运行
					format: new ol.format.KML()
				});
				var layer = new ol.layer.Vector({
					source: vectorSource,
					style: new ol.style.Style({
						fill: new ol.style.Fill({
							color: 'rgba(255, 255, 255, 0.2)'
						}),
						stroke: new ol.style.Stroke({
							color: 'rgba(40, 240, 120, 0.5)',
							lineDash: [10, 10],
							width: 2
						}),
						image: new ol.style.Circle({
							radius: 1000,
							stroke: new ol.style.Stroke({
								color: 'rgba(40, 240, 120, 0.7)'
							}),
							fill: new ol.style.Fill({
								color: 'rgba(255, 0, 0, 1)'
							})
						})
					})
				});
				map = new ol.Map({
					layers: [layer],
					target: 'map',

					view: new ol.View({
						center: [104.10, 30.44], //坐标转换
						zoom: 14,
						projection: proj4490,
						extent: [-180, -90, 180, 90]
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

    },
    methods: {
       
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
    padding: 10px;
}
</style>
