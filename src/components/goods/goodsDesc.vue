<template>
	<div class="goodsdesc-container">
		<h3>{{info.title}}</h3>
		<hr>
		<div class="content" v-html="info.content"></div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				id: this.$route.params.id,
				info:{}
			}
		},
		created(){
			this.getGoodsDesc();
		},
		methods:{
			getGoodsDesc(){
				this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
					if(result.body.status===0){
						console.log(result)
						this.info=result.body.message;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsdesc-container{
		h3{
			font-size: 16px;
			color: #E1251B;
			text-align: center;
			margin: 15px 0;
		}
	}
</style>
