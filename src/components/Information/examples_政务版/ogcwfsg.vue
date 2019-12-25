<template>
<div class="nav-content">
    <h1>OGC WFS-G地名地址查询</h1>
    <!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
    <div class="introduce">
        <p>描述：</p>
        <p>通过使用API for javascript 浏览发布的WfS类型的要素服务，其中主要用到图层类中的矢量图层类Vector,以及数据源类中的Vector类，通过属性查询获取到地址或者地名的要素。</p>
        <p>代码如下：</p>
    </div>
    <div class="codes">
        <pre class="htmledit_views">
             fetch('http://10.1.235.129:16080/ylws/WFSServer?request=GetCapabilities&service=WFS',{
                method:'POST',
                body:(new ol.format.WFS()).writeGetFeature({
                   outputFormat: 'application/json',
                   filter:  ol.format.filter.and({//联合模糊属性查询
                     ol.format.filter.like('porpertyName1','searchValue1*'),
                     ol.format.filter.like('porpertyName2','searchValue2*')
                   })
                })
            }).then(function(response){
                return response.json()
            }).then(function(json){
                var features=new ol.format.GeoJSON.readFeatures(json)
                vectorSource.addFeatures(features);
                map.getView().fit(vectorSource.getExtent());
            })
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
                            return 'http://10.1.235.129:16080/DLST_TFXQ_CGCS2000/MapServer/WFSServer?request=GetCapabilities&service=WFS&' +
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
