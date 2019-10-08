<template>
	<div class="mui-numbox" data-numbox-min="1" data-numbox-max="max">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox">
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.js'
	export default{
		mounted(){
			//初始化数字选择框组件
			mui(".mui-numbox").numbox();
		},
		methods:{
			countChanged(){
				//每当文本框的数据被修改的时候，立即把最新的数据通过事件调用传递给父组件
				//console.log(this.$refs.numbox.value);
				this.$emit('getCount',parseInt(this.$refs.numbox.value));
			}
		},
		props:["max"],
		watch:	{
			'max':function(newVal,oldVal){
				mui(".mui-numbox").numbox().setOption("max",newVal);
			}
		}
	}
</script>

<style>
</style>
