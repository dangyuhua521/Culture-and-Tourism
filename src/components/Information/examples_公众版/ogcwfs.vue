<template>
<div class="nav-content">
    <h1>OGC WFS服务浏览</h1>
    <!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
    <div class="introduce">
        <p>描述：</p>
        <p>通过使用API for javascript 浏览发布的WfS类型的要素服务，其中主要用到图层类中的矢量图层类Vector,以及数据源类中的Vector类。</p>
        <p>代码如下：</p>
    </div>
    <div class="codes">
        <pre class="htmledit_views">
           &lt;!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
           "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"&gt;
           &lt;html xmlns="http://www.w3.org/1999/xhtml"&gt;
           &lt;head&gt;
             &lt;meta http-equiv="Content-Type" content="text/html; charset=utf-8" /&gt;
             &lt;title&gt;OGC WMS服务浏览&lt;/title&gt;
             &lt;link ref="stylesheet" type="text/css" href="./css/ol.css" &gt;
             &lt;script type="text/javascript" src="./js/ol.js" &gt;&lt;/script&gt;
             &lt;script type="text/javascript"&gt;
             &lt;/head&gt;
             &lt;body onload="init()"&gt;
             &lt;script type="text/javascript"&gt;
             function init(){
                var layers = [
                 new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                new ol.layer.Vector({
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON(),
                        url: function (extent) {
                            return 'http://171.221.172.166:16080/ylws/WFSServer?request=GetCapabilities&service=WFS&' +
                                'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
                                'outputFormat=application/json&srsname=EPSG:4490&' +
                                'bbox=' + extent.join(',') + ',EPSG:4490';
                        },
                        //strategy: ol.loadingstrategy.bbox
                    }),
                    style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 255, 1.0)',
                    width: 2
                 })
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
            var layers = [
                 new ol.layer.Tile({
                    source: new ol.source.OSM()
                }),
                new ol.layer.Vector({
                    source: new ol.source.Vector({
                        format: new ol.format.GeoJSON(),
                        url: function (extent) {
                            return 'http://171.221.172.166:16080/DLST_TFXQ_CGCS2000/MapServer/WFSServer?request=GetCapabilities&service=WFS&' +
                                'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
                                'outputFormat=application/json&srsname=EPSG:3857&' +
                                'bbox=' + extent.join(',') + ',EPSG:3857';
                        },
                        //strategy: ol.loadingstrategy.bbox
                    }),
                    style: new ol.style.Style({
                    stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 255, 1.0)',
                    width: 2
          })
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
