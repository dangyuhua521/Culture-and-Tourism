<template>
<div class="nav-content">
    <h1>地图测量</h1>
    <!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
    <div class="introduce">
        <p>描述：</p>
        <p>通过使用API for javascript 提供的测量接口进行测距和测面的功能。其中主要用到了ol.interaction.Draw类。
        </p>
        <p>代码如下：</p>
    </div>
    <div class="codes">
        <pre class="htmledit_views">
            var source=new ol.source.Vector();
            var layer=new ol.layer.Vector({
                source:source,
            })
            //创建测量对象，并设置测量过程中的数据源和测量的样式
           var draw=new ol.interaction.Draw({
               source:source,
               type:'type',//type是'LineString'或者'Polygon'
               style:new ol.style.Style({
                   fill:new style.Fill({
                       color:'rgba(255, 255, 255, 0.2)'
                   }),
                   stroke:new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2
                   }),
                   image:new ol.style.Circle ({
                       radius: 5,
                       fill:new style.Fill({
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
           //在地图上添加测量对象
           map.addInteraction(draw);

           draw.on('drawstart',function(evt){//开始测量事件
                 var fe= evt.feature;
                var tooltipCoord = evt.coordinate;
                fe.getGeometry().on('change',function(evt){
                    var geom=evt.target;
                    var output;
                     if (geom instanceof Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
              } else if (geom instanceof LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
              }
              measureTooltipElement.innerHTML = output;
              measureTooltip.setPosition(tooltipCoord);
                })

           })
           draw.on('drawend',function(){//结束测量事件
            
           //移除测量对象，不在有绘制效果
            map.removeInteraction(draw);
           })
           //格式化测量的长度数据
            var formatLength = function(line) {
            var length = getLength(line);
            var output;
            if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'km';
            } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'm';
            }
            return output;
        };
            //格式化面积数据
        var formatArea = function(polygon) {
                var area = getArea(polygon);
                var output;
                if (area > 10000) {
                output = (Math.round(area / 1000000 * 100) / 100) +
                    ' ' + 'km<sup>2</sup>';
                } else {
                output = (Math.round(area * 100) / 100) +
                    ' ' + 'm<sup>2</sup>';
                }
                return output;
            };

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
    padding: 50px;
}
</style>
