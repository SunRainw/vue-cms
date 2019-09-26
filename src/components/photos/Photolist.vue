<template>
	<!-- 顶部滑动条区域 -->
	<div id="slider" class="mui-slider">
		<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
			<div class="mui-scroll">
				<a :class="['mui-control-item',item.id==0 ? 'mui-active' :'']" href="#item1mobile" v-for="item in cates" :key="item.id"
				 @click="getImages(item.id)">
					{{item.title}}
				</a>
			</div>
		</div>

		<!-- 图片列表区域 -->
		<ul class="photo-list">
			<li v-for="item in imglist" :key="item._id">
				<img v-lazy="item.img_url">
				<div class="info">
					<h2 class="info-title">{{item.title}}</h2>
					<div class="info-body">{{item.abstract}}</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	//导入mui的js
	import mui from '../../lib/mui/js/mui.js';


	export default {
		data() {
			return {
				cates: [],
				imglist: []
			}
		},
		created() {
			this.getAllCategory();
			this.getImages(0);
		},
		mounted() { //当组件中的DOM结构被渲染好放到页面中后，会执行
			//操作元素最好在mounted中
			//初始化滑动控件
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		methods: {
			getAllCategory() {
				this.$http.get('api/getimgcategory').then(reslut => {
					console.log(reslut)
					if (reslut.body.status === 0) {
						//手动拼接完整分类

						reslut.body.message.unshift({
							title: "全部",
							id: 0
						})
						this.cates = reslut.body.message
					}
				})
			},
			getImages(cateId) {
				this.$http.get('api/getImages/' + cateId).then(reslut => {
					console.log(reslut)
					if (reslut.body.status === 0) {
						//手动拼接完整分类
						this.imglist = reslut.body.message
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		touch-action: pan-y;
	}

	.photo-list {
		list-style:none;
		margin: 0;
		padding:10px;
		padding-bottom:0;
		li {
			background-color:#ccc;
			margin-bottom: 10px;
			text-align:center;
			box-shadow:0 0 9px #999;
			position:relative;
			img{
				width: 100%;
				vertical-align: middle;
			}
			image[lazy="loading"] {
				width: 40px;
				height: 300px;
				margin: auto;
			}
		}

	}
	.info{
		color:white;
		text-align:left;
		position:absolute;
		bottom: 0;
		background-color:rgba(0,0,0,.4);
		max-height:84px;
		.info-title{
			font-size: 14px;
		}
		.info-body{
			font-size: 13px;
		}
	}
</style>
