<template>
	<div>
		<cmtbox :id="$route.params.id-50"></cmtbox>
	</div>
</template>

<script>
	import cmtbox from '../subcomponent/comment.vue'
	export default{
		components:{
			cmtbox
		}
	}
</script>

<style>
</style>
