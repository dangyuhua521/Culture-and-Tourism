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
                var projection = ol.proj.get('EPSG:4490');
                var projectionExtent = projection.getExtent();
                var size = ol.extent.getWidth(projectionExtent) / 256;
                var resolutions = new Array(14);
                var matrixIds = new Array(14);
                for (var z = 0; z &lt; 14; ++z) {
                    // 生成 resolutions and matrixIds 数组
                    resolutions[z] = size / Math.pow(2, z);
                    matrixIds[z] = z;
                }
                var map = new ol.Map({
                    layers: [
                    new  ol.layer.Tile({
                        source: new ol.source.OSM(),
                        opacity: 0.7
                    }),
                    //设置切片地图服务相关参数
                    new ol.layer.Tile({
                        opacity: 0.7,
                        source: new ol.source.WMTS({
                        url: 'http://10.1.235.129:16080/EMAP_TFXQ_CGCS2000/WMTS/',
                        layer: '0',
                        matrixSet: 'EPSG:4490',
                        format: 'image/png',
                        projection: projection,
                        tileGrid: new ol.tilegrid.WMTS({
                            origin: ol.extent.getTopLeft(projectionExtent),
                            resolutions: resolutions,
                            matrixIds: matrixIds
                        }),
                        style: 'default',
                        wrapX: true
                        })
                    })
                    ],
                    target: 'map',
                    view: new ol.View({
                    center: [104.32, 30.24],
                    zoom: 4
                    })
                });
             }
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
       this.init()
    },
    methods: {
       init(){
      
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
