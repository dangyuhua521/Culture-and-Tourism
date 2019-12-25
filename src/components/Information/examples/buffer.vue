<template>
<div class="nav-content">
    <h1>缓冲区分析</h1>
    <!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
    <div class="introduce">
        <p>描述：</p>
        <p>通过使用API for javascript 对发布的WfS类型的要素服务进行缓冲区查询，其中主要用到图层类中的矢量图层类Vector,以及数据源类中的Vector类，使用到
            turf.js中的buffer方法。</p>
        <p>代码如下：</p>
    </div>
    <div class="codes">
        <pre class="htmledit_views">
            &lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
            "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;
            &lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
             &lt;head&gt;
             &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
             &lt;title&gt;缓冲区分析&lt;/title&gt;
             &lt;link ref="stylesheet" type="text/css" href="./css/ol.css" &gt;
             &lt;script type="text/javascript" src="./js/ol.js" &gt;&lt;/script&gt;
             &lt;script type="text/javascript" src="./js/turf.js" &gt;&lt;/script&gt;
             &lt;script type="text/javascript"&gt;
             &lt;/head&gt;
             &lt;body onload="init()"&gt;
             &lt;script type="text/javascript"&gt;
             function init(){
                var source=new ol.source.Vector()
                var layerbuffer=new ol.layer.Vector({
                    source:source
                });
                var layers = [
                    layerbuffer,
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    }),             
                ];
                //初始化绘制对象
              var draw=new ol.interaction.Draw({
               source:source,
               type:'LineString',//type是'LineString'、'Point'、'Circle'或者'Polygon'
               style:new ol.style.Style({
                   fill:new ol.style.Fill({//设置绘制的面的填充样式 
                       color:'rgba(255, 255, 255, 0.2)'
                   }),
                   stroke:new ol.style.Stroke({//设置边框的样式
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                   }),
                   image:new ol.style.Circle ({//设置符号化的样式，可以是图片以及图形样式
                       radius: 5,
                       fill:new ol.style.Fill({
                       color:'rgba(255, 255, 255, 0.2)'
                   }),
                   stroke:new ol.style.Stroke({
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
            //在地图上添加绘制对象
           map.addInteraction(draw);
           draw.on('drawstart',function(evt){//开始绘制事件

           })
           draw.on('drawend',function(evt){//结束绘制事件
            debugger;
            var format=  new ol.format.GeoJSON();
            //获取绘制的feature
            var fe=evt.feature;
            var geo=fe.getGeometry().clone();
            geo.transform( 'EPSG:3857','EPSG:4326');
            //创建缓冲分析，此处可以是turf.point 、turf.polygon以及turf.lineString
            var  bufferd=turf.buffer(turf.lineString(geo.getCoordinates()),300,{units:'meters'})
            //转换为地图api中可读取的feature
            var marker=format.readFeature(bufferd);
            marker.getGeometry().transform('EPSG:4326', 'EPSG:3857');//根据实际情况进行坐标系转换
            marker.setStyle(new ol.style.Style({//给生成缓冲区的feature设置样式
                stroke:new ol.style.Stroke({
                    color: 'rgba(255, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                })
            }))
            layerbuffer.getSource().addFeature(marker);//添加缓冲区的feature到图层 
             //空间查询,通过传入几个图形的对象到服务端查询出符合条件的features
            fetch('https://ahocevar.com/geoserver/wfs'，{
                method:'POST',
                body:new ol.format.WFS.writeGetFeature({
                   outputFormat: 'application/json',
                   filter: new ol.format.filter.intersects({//相交查询
                   geometryName:  "geoName",
                   geometry:marker.getGeomtry()
                   })
                })
            }).then(function(response){
                return response.json()
            }).then(function(json){
                var features=new ol.format.GeoJSON.readFeatures(json)
                vectorSource.addFeatures(features);
                map.getView().fit(vectorSource.getExtent());
            })
           })
             &lt;/script&gt;
            &lt;div id="mapDiv" style="width:800px; height:600px; border:1px solid #000;"&gt;&lt;/div&gt;
             &lt;/body&gt;
             &lt;/html&gt;
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
            var source=new ol.source.Vector()
            var layers = [
                 new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
              
            ];
            var layerbuffer=new ol.layer.Vector({
                source:source
            });
              var draw=new ol.interaction.Draw({
               source:source,
               type:'LineString',//type是'LineString'、'Point'、'Circle'或者'Polygon'
               style:new ol.style.Style({
                   fill:new ol.style.Fill({
                       color:'rgba(255, 255, 255, 0.2)'
                   }),
                   stroke:new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                   }),
                   image:new ol.style.Circle ({
                       radius: 5,
                       fill:new ol.style.Fill({
                       color:'rgba(255, 255, 255, 0.2)'
                   }),
                   stroke:new ol.style.Stroke({
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
           draw.on('drawstart',function(evt){//开始绘制事件

           })
           draw.on('drawend',function(evt){//结束绘制事件
            debugger;
            var format=  new ol.format.GeoJSON();
            var fe=evt.feature;
            var geo=fe.getGeometry().clone();
            geo.transform( 'EPSG:3857','EPSG:4326');
            var  bufferd=turf.buffer(turf.lineString(geo.getCoordinates()),300,{units:'meters'})
            var marker=format.readFeature(bufferd);
            marker.getGeometry().transform('EPSG:4326', 'EPSG:3857');
            marker.setStyle(new ol.style.Style({
                stroke:new ol.style.Stroke({
                    color: 'rgba(255, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                })
            }))
            layerbuffer.getSource().addFeatures([marker]);

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
