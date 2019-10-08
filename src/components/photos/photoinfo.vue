<template>
	<div class="photoinfo-container">
		<h3>{{photoinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间：{{photoinfo.add_time|dateFormat("YYYY-DD-MM")}}</span>
			<span>点击次数：{{photoinfo.click}}次</span>
		</p>
		
		<hr>
		
		<!-- 缩略图区域 -->
		<div class="thumbs">
			<vue-preview :slides="photolist" @close="handleClose"></vue-preview>
		</div>
		 <!-- v-for="(item,index) in photolist" :src="item.img_url" height="100" :key="item._id" -->
		
		<!-- 图片内容区域 -->
		<div class="content">
			{{photoinfo.content}}
		</div>
		
		<!-- 评论子组件 -->
		<cmt-box :id="id"></cmt-box>
	</div>
</template>

<script>
	import comment from '../subcomponent/comment.vue'
	export default{
		data(){
			return{
				id:this.$route.params.imgId,
				photoinfo:{},
				photolist:[]
			}
		},
		created(){
			this.getPhotoInfo();
			this.getPhotoList();
		},
		methods:{
			getPhotoInfo(){
				this.$http.get('api/getphotoinfo/'+this.id).then(result=>{
					//console.log(result)
					if(result.body.status===0){
						this.photoinfo=result.body.message[0];
					}
				})
			},
			getPhotoList(){
				this.$http.get('api/getphotolist/'+this.id).then(result=>{
					console.log(result)
					if(result.body.status===0){
						//循环每个图片，补全图片的宽和高
						result.body.message.forEach(item=>{
							item.w=600;
							item.h=400;
							item.src=item.img_url;
							item.msrc=item.img_url;
						})
						this.photolist=result.body.message;
					}
				})
			}
		},
		components:{
			'cmt-box':comment
		}
	}
</script>

<style lang="scss" scoped>
	.photoinfo-container{
		padding:3px;
		h3{
			font-size: 15px;
			color:#E1251B;
			text-align: center;
			margin: 15px 0;
		}
		.subtitle{
			display: flex;
			justify-content: space-between;
			font-size: 13px;
		}
		
		/deep/.my-gallery{
			display:flex;
			flex-wrap: wrap;
			// justify-content:space-around;
			figure{
				width: 31%;
				margin:2px 3px;
				img{
					width: 100%;
					height: 100%;
					box-shadow: 0 0 8px #999;
				}
			}
		}
		.content{
			font-size: 13px;
			line-height: 30px;
			text-indent: 2em;
		}
	}
</style>
