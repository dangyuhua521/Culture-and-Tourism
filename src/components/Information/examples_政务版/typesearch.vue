<template>
<div class="nav-content">
    <h1>分类检索</h1>
    <!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
    <div class="introduce">
        <p>描述：</p>
        <p>通过使用API for javascript 基于发布的WFS类型服务，进行属性分类查询。其中主要能用到了format类中的filter属性类，进行精确分类查询
        </p>
        <p>代码如下：</p>
    </div>
    <div class="codes">
        <pre class="htmledit_views">
            //属性查询
            fetch('http://10.1.235.129:16080/ylws/WFSServer?request=GetCapabilities&service=WFS'，{
                method:'POST',
                body:new ol.format.WFS.writeGetFeature({
                   outputFormat: 'application/json',
                   //分类查询
                   filter: new ol.format.filter.equalTo('type','searchValue1'),   
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
