<template>
	<div class="newsinfo-container">
		<h3 class="title">{{newsinfo.title}}</h3>
		<p class="subtitle">
			<span>发表时间：{{newsinfo.add_time|dateFormat}}</span>
			<span>点击：{{newsinfo.click}}次</span>
		</p>
		<hr>
		
		<div class="content" v-html="newsinfo.content"></div>
		<!-- 评论区域 -->
		<comment-box></comment-box>
	</div>
</template>

<script>
	//导入评论子组件
	import comment from '../subcomponent/comment.vue'
	
	import {
		Toast
	} from 'mint-ui';
	export default {

		data() {
			return {
				id: this.$route.params.id,
				newsinfo: {}
			}
		},
		created() {
			this.getNewsinfo();
		},
		methods: {
			getNewsinfo() {
				this.$http.get('api/getnew/' + this.id).then(result => {
					if (result.status === 200) {
						console.log(result);
						this.newsinfo = result.body;
					} else {
						Toast("详情数据获取失败")
					}
				})
			}
		},
		components:{
			'comment-box':comment
		}
	}
</script>

<style lang="scss" scoped>
	.newsinfo-container {
		padding: 0 4px;

		.title {
			font-size: 16px;
			text-align: center;
			margin: 15px 0;
			color: #E1251B;
		}

		.subtitle {
			font-size: 13px;
			color: #226aff;
			display: flex;
			justify-content: space-between;
		}

		.content {
			/deep/img {
				max-width: 100%;
			}

			/deep/h2 {
				font-weight: 400;
				margin: 0 15px 18px;
				font-size: 17px;
				color: #1a1a1a;
				line-height: 25px;
				word-break: normal;
				text-align: justify;
			}

			
		}
	}

	/deep/.art_pic_card.art_content p {
		margin: 0 15px 25px;
		font-size: 17px;
		color: #1a1a1a;
		line-height: 30px;
		word-break: normal;
		text-align: justify;
		word-break: break-all;
	}
	/deep/.art_img_mini{
	    text-align: center;
	    padding: 0 15px;
		margin: 0 0 10px 0;
	}
</style>
