<template>
<div style="font-size: 24px;margin: 50px 30px;">{{msg}}</div>
</template>

<script>
	export default{
		data(){
			return{
				msg:""
			}
		},
		mounted(){
			let _this=this;
			this.$fetch('/LoginWS.asmx/GetSingleLoginToken').then((res)=>{
				if(res.code==200){
					window.location.href=_this.$route.query.href+_this.$route.hash+'?token='+res.message				
//					window.location.href='http://localhost:7002/#/login'+'?token='+res.message				
				}else{
//					this.msg=res.msg
					window.location.href=_this.$route.query.href+_this.$route.hash
				}

			}).catch(e=>{

			})

		}
	}
</script>

<style>
</style>