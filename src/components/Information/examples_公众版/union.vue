<template>
	<div class="nav-content">
		<h1>叠加分析</h1>
		<!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
		<div class="introduce">
			<p>描述：</p>
			<p>通过使用API for javascript 对几个图形进行叠加操作，其中主要用到图层类中的矢量图层类Vector,以及数据源类中的Vector类，使用到
				turf.js中的union方法。</p>
			<p>代码如下：</p>
		</div>
		<div class="codes">
			<pre class="htmledit_views">
&lt;!DOCTYPE html>
&lt;html>
&lt;head>
    &lt;meta charset="utf-8">
    &lt;meta name="viewport" content="width=device-width,initial-scale=1.0">
    &lt;title>叠加分析</title>
    &lt;script type="text/javascript" src="http://171.221.172.166:7100/ol/js/ol.js"></script>
    &lt;link rel="stylesheet" type="text/css" href="http://171.221.172.166:7100/ol/css/ol.css">
	&lt;script type="text/javascript" src="http://171.221.172.166:7100/ol/turf.min.js"></script>
&lt;/head>
&lt;body onload="init()">
    &lt;div id="map" style="width:100%;height:100%;background-color:#dcefff;margin-top:10px">
    &lt;/div>
    &lt;script>
        function init() {
            var source = new ol.source.Vector()
            var layerbuffer = new ol.layer.Vector({
                source: source,
            });
            var draw = new ol.interaction.Draw({
                source: source,
                type: 'Polygon',//type是'LineString'、'Point'、'Circle'或者'Polygon'
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)'
                        }),
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 0.5)',
                            lineDash: [10, 10],
                            width: 2
                        }),
                    })
                })
            })

             var  source= new ol.source.TileArcGISRest({
                 projection: ol.proj.get('EPSG:4490'),
                        url: 'http://171.221.172.166:16080/EMAP_TFXQ_CGCS2000/export',
            })
            var  layer= new ol.layer.Tile({
              source: source,
            });
            
             map = new ol.Map({
                layers: [layer],
                target: 'map',

                view: new ol.View({
                     center: ol.proj.fromLonLat([104.10, 30.44]),
                    zoom: 14,
                    projection: ol.proj.get('EPSG:4490'),
                })
            });
            map.addLayer(layerbuffer);
            //在地图上添加绘制对象
            map.addInteraction(draw);
            var drawflag = 0;
            draw.on('drawstart', function (evt) {//开始绘制事件
                drawflag++;
            })
            draw.on('drawend', function (evt) {//结束绘制事件
                if (drawflag % 2 == 0) {
                    var format = new ol.format.GeoJSON();
                    var fes = layerbuffer.getSource().getFeatures();
                    var geosjsons = format.writeFeaturesObject(fes);
                    var f2 = format.writeFeatureObject(evt.feature)
                    var union = turf.union(geosjsons.features[0], f2);
                    if (union) {
                        layerbuffer.getSource().clear();
                        var result = format.readFeature(union);
                        result.setStyle(new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: 'rgba(255, 0, 0, 0.5)',
                                lineDash: [10, 10],
                                width: 2
                            })
                        }))
                        layerbuffer.getSource().addFeature(result);
                        evt.feature.setStyle(new ol.style.Style({
                            stroke: new ol.style.Stroke({
                                color: 'rgba(255, 0, 0, 0)',
                                lineDash: [10, 10],
                                width: 2
                            })
                        }))
                        map.getView().fit(layerbuffer.getSource().getExtent())
                    }
                    map.removeInteraction(draw);
                }
            })

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
			// this.init()
		},
		methods: {
			init() {
				var source = new ol.source.Vector()
				var source1 = new ol.source.OSM();
				var layers = [
					new ol.layer.Tile({
						source: source1
					}),

				];
				var layerbuffer = new ol.layer.Vector({
					source: source,
				});
				var draw = new ol.interaction.Draw({
					source: source,
					type: 'Polygon', //type是'LineString'、'Point'、'Circle'或者'Polygon'
					style: new ol.style.Style({
						fill: new ol.style.Fill({
							color: 'rgba(255, 255, 255, 0.2)'
						}),
						stroke: new ol.style.Stroke({
							color: 'rgba(0, 0, 0, 0.5)',
							lineDash: [10, 10],
							width: 2
						}),
						image: new ol.style.Circle({
							radius: 5,
							fill: new ol.style.Fill({
								color: 'rgba(255, 255, 255, 0.2)'
							}),
							stroke: new ol.style.Stroke({
								color: 'rgba(0, 0, 0, 0.5)',
								lineDash: [10, 10],
								width: 2
							}),
						})
					})
				})

				var map = new ol.Map({
					layers: layers,
					target: 'mapDiv',
					view: new ol.View({
						center: [0, 0],
						zoom: 1
					})
				});
				map.addLayer(layerbuffer);
				//在地图上添加绘制对象
				map.addInteraction(draw);
				var drawflag = 0;
				draw.on('drawstart', function(evt) { //开始绘制事件
					drawflag++;
				})
				draw.on('drawend', function(evt) { //结束绘制事件
					if (drawflag % 2 == 0) {
						var format = new ol.format.GeoJSON();
						var fes = layerbuffer.getSource().getFeatures();
						var geosjsons = format.writeFeaturesObject(fes);
						var f2 = format.writeFeatureObject(evt.feature)
						var union = turf.union(geosjsons.features[0], f2);
						if (union) {
							layerbuffer.getSource().clear();
							var result = format.readFeature(union);
							result.setStyle(new ol.style.Style({
								stroke: new ol.style.Stroke({
									color: 'rgba(255, 0, 0, 0.5)',
									lineDash: [10, 10],
									width: 2
								})
							}))
							layerbuffer.getSource().addFeature(result);
							evt.feature.setStyle(new ol.style.Style({
								stroke: new ol.style.Stroke({
									color: 'rgba(255, 0, 0, 0)',
									lineDash: [10, 10],
									width: 2
								})
							}))
						}
						map.removeInteraction(draw);
					}
				})
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
