<template>
<div class="nav-content">
    <h1>图形编辑</h1>
    <!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
    <div class="introduce">
        <p>描述：</p>
        <p>通过使用API for javascript 提供图形编辑接口对feature的图形进行编辑并保存。其中主要用到了ol.interaction.Modify类。
        </p>
        <p>代码如下：</p>
    </div>
    <div class="codes">
        <pre class="htmledit_views">
            var source=new ol.source.Vector();
            var layer=new ol.layer.Vector({
                source:source,
            })
            //创建绘制对象，并设置绘制过程中的数据源和绘制的样式
            //创建绘制对象，并设置绘制过程中的数据源和绘制的样式
           var draw=new ol.interaction.Draw({
               source:source,
               type:'type',//type是'LineString'、'Point'、'Circle'或者'Polygon'
               style:new ol.style.Style({
                   fill:new style.Fill({  //设置填充样式
                       color:'rgba(255, 255, 255, 0.2)'
                   }),
                   stroke:new ol.style.Stroke({ //设置边框样式
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],//虚线样式
                        width: 2//线宽
                   }),
                   //设置点位符号化的样式还可以使用new ol.style.Icon类设置图片
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
           //在地图上添加绘制对象
           map.addInteraction(draw);

           draw.on('drawstart',function(evt){//开始绘制事件
               
           })
           draw.on('drawend',function(){//结束绘制事件

           })
            //创建图形修改对象，并且设置可修改的数据源
            var modify=new ol.interaction.Modify({
                source:source
            })
            //添加修改对象到地图
            map.addInteraction(modify)

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
