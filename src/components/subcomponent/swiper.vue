<template>
	<div>
		<mt-swipe :auto="4000">
			<mt-swipe-item v-for="item in swiperList" :key="item._id">
				<img :src="item.img" alt="轮播图" :class="{'full':isfull}">
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default{
		props:["swiperList","isfull"]
		
	}
</script>

<style lang="scss" scoped>
	.mint-swipe {
		height: 140px;
		.mint-swipe-item {
			text-align: center;
			img {
				height: 100%;
			}
		}
	}
	.full{
		width: 100%;
	}
</style>
