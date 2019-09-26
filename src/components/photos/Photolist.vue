<template>
	<!-- 顶部滑动条区域 -->
	<div id="slider" class="mui-slider">
		<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
			<div class="mui-scroll">
				<a :class="['mui-control-item',item.id==0 ? 'mui-active' :'']" href="#item1mobile" v-for="item in cates" :key="item.id">
					{{item.title}}
				</a>
			</div>
		</div>
	
	<!-- 图片列表区域 -->
	<ul>
		<li v-for="item in imglist">
			<img v-lazy="item.img_url">
		</li>
	</ul>
	</div>
</template>

<script>
	//导入mui的js
	import mui from '../../lib/mui/js/mui.js';
	
	
	export default{
		data(){
			return{
				cates:[],
				imglist:[]
			}
		},
		created(){
			this.getAllCategory();
		},
		mounted(){//当组件中的DOM结构被渲染好放到页面中后，会执行
			//操作元素最好在mounted中
			//初始化滑动控件
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
			});
		},
		methods:{
			getAllCategory(){
				this.$http.get('api/getimgcategory').then(reslut=>{
					console.log(reslut)
					if(reslut.body.status===0){
						//手动拼接完整分类
						
						reslut.body.message.unshift({title:"全部",id:0})
						this.cates=reslut.body.message
					}
				})
			},
			getImages(){
				this.$http.get('api/getImages/:cateid').then(reslut=>{
					console.log(reslut)
					if(reslut.body.status===0){
						//手动拼接完整分类
						this.imglist=reslut.body.message
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	*{
		touch-action: pan-y;
	}
	
	image[lazy="loading"]{
		width: 40px;
		height: 300px;
		margin: auto;
	}
	
</style>
