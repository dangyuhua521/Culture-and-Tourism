<template>
<div class="nav-content">
    <h1>获取元数据信息</h1>
    <!-- <div id="mapDiv" style="width:100%;height:300px;background-color:#dcefff;margin-top:10px"></div> -->
    <div class="introduce">
        <p>描述：</p>
        <p>通过使用API for javascript 读取发布的WMS服务的元数据信息，其中主要用到WMSCapabilities类 。
        </p>
        <p>代码如下：</p>
    </div>
    <div class="codes">
        <pre class="htmledit_views">
            //获取元数据信息查询,此处模拟的是本地xml数据，也可以是服务的网络接口
            fetch('data/ogcsample.xml').then(function(response) {
                return response.text();
            }).then(function(text) {
                var result = new ol.format.WMSCapabilities().read(text);
                console.log(JSON.stringify(result, null, 2));
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
        //this.init()
    },
    methods: {
       init(){
           fetch('https://ahocevar.com/geoserver/wms').then(function(Response) {
               return Response.text();
           }).then(function(text){
               var result=new ol.format.WMSCapabilities().read(text);
               console.log(result);
           })
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
