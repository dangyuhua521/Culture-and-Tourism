<template>
<div class="nav-content">
    <h1>图属查询</h1>
    <!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
    <div class="introduce">
        <p>描述：</p>
        <p>通过使用API for javascript 浏览发布的要素或者地图服务，并且可以对发布属性进行空间查询和属性查询。其中主要能用到了format类中的WFS属性类，通过设定空间查询的geomtry或者对属性的
            值的设定进行查询。
        </p>
        <p>代码如下：</p>
    </div>
    <div class="codes">
        <pre class="htmledit_views">
            //空间查询,通过传入几个图形的对象到服务端查询出符合条件的features
            fetch('http://171.221.172.166:16080/DLST_TFXQ_CGCS2000/MapServer/WFSServer?request=GetCapabilities&service=WFS'，{
                method:'POST',
                body:new ol.format.WFS.writeGetFeature({
                   outputFormat: 'application/json',
                   filter: new ol.format.filter.intersects({//相交查询 （new ol.format.filter.contains为包含查询）
                   geometryName:  "geoName",
                   geometry:new ol.geom.Polygon({//此处是绘制的图框、、圆形或者多边形的geometry
                       coordinates:[[1,2],[3,4],[5,6]]
                   })
                   })
                })
            }).then(function(response){
                return response.json()
            }).then(function(json){
                var features=new ol.format.GeoJSON.readFeatures(json)
                vectorSource.addFeatures(features);
                map.getView().fit(vectorSource.getExtent());
            })

            //属性查询
            fetch('http://171.221.172.166:16080/DLST_TFXQ_CGCS2000/MapServer
						/WFSServer?request=GetCapabilities&service=WFS',{
                method:'POST',
                body:new ol.format.WFS.writeGetFeature({
                   outputFormat: 'application/json',
                   filter: new ol.format.filter.and({//联合模糊查询
                    new ol.format.filter.like('porpertyName1','searchValue1*'),
                    new ol.format.filter.like('porpertyName2','searchValue2*')
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
