<template>
	<div>
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in swiperList" :key="item._id">
				<img :src="item.img" alt="轮播图">
			</mt-swipe-item>
		</mt-swipe>
		
		<div class="mui-content">
			<ul class="mui-table-view mui-grid-view mui-grid-9">
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newslist">
						<img src="../../images/menu1.png" alt="新闻资讯">
						<div class="mui-media-body">新闻资讯</div>
					</router-link></li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
						<img src="../../images/menu2.png" alt="图片分享">
						<div class="mui-media-body">图片分享</div>
					</router-link></li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
						<img src="../../images/menu3.png" alt="商品购买">
						<div class="mui-media-body">商品购买</div>
					</a></li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
						<img src="../../images/menu4.png" alt="留言反馈">
						<div class="mui-media-body">留言反馈</div>
					</a></li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
						<img src="../../images/menu5.png" alt="视频专区">
						<div class="mui-media-body">视频专区</div>
					</a></li>
				<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
						<img src="../../images/menu6.png" alt="联系我们">
						<div class="mui-media-body">联系我们</div>
					</a></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui';

	export default {
		data() {
			return {
				swiperList: []
			}
		},
		created() {
			this.getSwiper();
		},
		methods: {
			getSwiper() {
				this.$http.get('api/getSwiper').then(result => {
					console.log(result)
					if (result.status === 200) {
						this.swiperList = result.body
					} else {
						Toast('加载轮播图失败')
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mint-swipe {
		height: 140px;

		.mint-swipe-item {
			img {
				width: 100%;
				height: 100%;
			}
		}
	}
	
	.mui-grid-view.mui-grid-9{
		background-color: #fff;
		border: none;
		img{
			width: 60px;
			height: 60px;
			
		}
		.mui-media-body{
			font-size: 13px;
		}
	}
	.mint-swipe-indicator.is-active{
		background: #ededed;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell{
		border: none;
	}
</style>
