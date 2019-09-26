<template>
	<ul class="mui-table-view">
		<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item._id">
			<router-link :to="'/home/newsinfo/'+item.id">
				<img class="mui-media-object mui-pull-left" :src="item.img_url">
				<div class="mui-media-body">
					<h1>{{item.title}}</h1>
					<p class='mui-ellipsis'><span>发表时间：{{item.add_time|dateFormat("YYYY-MM-DD HH:mm:ss")}}</span><span>点击次数：{{item.click}}次</span></p>
				</div>
			</router-link>
		</li>

	</ul>
</template>

<script>
	
	import {Toast} from 'mint-ui'
	export default{
		data(){
			return{
				newslist:[]
			}
		},
		created(){
			this.getNewslist();
		},
		methods:{
			getNewslist(){
				this.$http.get('api/getNewslist').then(result=>{
					if(result.status===200){
						console.log(result);
						this.newslist=result.body;
					}else{
						Toast('获取新闻列表数据失败');
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mui-table-view{
		li{
			h1{
				font-size: 14px;
			}
			.mui-ellipsis{
				font-size: 12px;
				color: #214087;
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>
