<template>
<div class="nav-content">
    <h1>OGC 专题图接口</h1>
    <!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
    <div class="introduce">
        <p>描述：</p>
        <p>通过使用API for javascript 浏览发布的WfS类型的要素服务，其中主要用到图层类中的矢量图层类Vector,以及数据源类中的Vector类，加载其中的要素，然后统计要素数据绘制图表当做地图
            的overlayer浮动在地图上。同时还需要引入echarts的相关包</p>
        <p>代码如下：</p>
    </div>
    <div class="codes">
        <pre class="htmledit_views">
            //首先在页面上定义overlayer的div标签
             &lt;div id="mappoup" style="width:800px; height:600px; border:1px solid #000;"&gt;&lt;/div&gt;
            //创建overlayer对象
            var poup=new ol.Overlay({
                element:'mappoup',
                offset:[5,5]
            })
            //初始化图标控件
            var chart = echarts.init(document.createElement('div'), '', {
                    width: 500,
                    height: 300
                });
            //绑定选择器
             var select = new ol.interaction.Select();
            map.addInteraction(select);
            //当选择到feature时
            select.on('select', function (e) {
                if (this.getFeatures().getLength() > 0) {
                    var city = this.getFeatures().item(0).getProperties().NAME;
                    var data1 = [];
                    var data2 = [];
                    for (var i = 0; i  &lt; 7; i++) {
                        var data = Math.random().toFixed(2);
                        data1.push(data);
                        data2.push(data * (Math.random() + 1.5));
                    }
                    //给图表绑定数据和相关属性
                    chart.setOption({
                        title: {
                            text: city,
                            subtext: resources.text_fictitiouData
                        },
                        series: [
                            {
                                name: resources.text_rainfall,
                                data: data1,
                            },
                            {
                                name: resources.text_runoff,
                                data: data2,
                            }
                        ],
                    });
                    //设置poup的element对象
                    popup.setElement(chart.getDom());
                    var coordinate = e.mapBrowserEvent.coordinate;
                    //设置poup的位置
                    popup.setPosition(coordinate);
                } else {
                    popup.setPosition(undefined);
                }
            });
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
                            return 'http://218.6.244.251:6080/arcgis/services/DLST_TFXQ_CGCS2000/MapServer/WFSServer?request=GetCapabilities&service=WFS&' +
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
