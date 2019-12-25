<template>
  <div id="app">
    <router-view/>
    <iframe width="0" height="0" name="downloadForm" id="downloadForm"></iframe>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
	html,body{
		height: 100%;
		width: 100%;
	}
#app{
	height: calc(100% - 80px);
	width: 100%;
	position: absolute;
	top: 80px;
}
.el-message{
	z-index:3000;
}
.el-menu-item{
	    -webkit-line-clamp: 1;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    white-space: normal;

}
/* .new-title{
	padding-right:20px ;
} */
</style>
