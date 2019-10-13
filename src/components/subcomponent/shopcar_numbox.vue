<template>
	<div class="mui-numbox" data-numbox-min="1" data-numbox-max="max">
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox">
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.js'
	export default {
		mounted() {
			//初始化数字选择框组件
			mui(".mui-numbox").numbox();
		},
		methods: {
			countChanged() {
				//数量改变了
				console.log(this.$refs.numbox.value)
				this.$store.commit("updateGoodsInfo", {
					id: this.goodsid,
					count: this.$refs.numbox.value
				})
			}
		},
		props: ['initcount', 'goodsid']
	}
</script>

<style>
</style>
