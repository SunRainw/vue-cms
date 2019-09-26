<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<hr>
		<textarea placeholder="请输入评论内容(最多120字)" maxlength="120" v-model="msg"></textarea>
		<mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
		<div class="cmt-list" v-for="(item,index) in comments" :key="item.index">
			<div class="cmt-item">
				<div class="cmt-title">
					第{{index+1}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateFormat}}
				</div>
				<div class="cmt-body">
					{{item.content==='undefind'?'此用户未发表评论':item.content}}
				</div>
			</div>
		</div>
		<mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
	</div>
</template>

<script>
	import {
		Toast
	} from 'mint-ui'
	export default {
		data() {
			return {
				id: this.$route.params.id,
				comments: [],
				pageindex: 1,
				msg: '' //评论输入内容
			}
		},
		created() {
			this.getComment();
		},
		methods: {
			getComment() {
				this.$http.get('api/getComment/' + this.id, {
					params: {
						pagesize: 3,
						page: this.pageindex
					}

				}).then(result => {
					if (result.body.status === 0) {
						console.log(result);
						this.comments = this.comments.concat(result.body.cmtlist);
					} else {
						Toast("获取评论失败！")
					}
				})
			},
			getMore() {
				this.pageindex++;
				this.getComment();
			},
			postComment() {
				if (this.msg.trim().length === 0) {
					Toast("评论内容不能为空!")
				}


				this.$http.post('api/postComment/' + this.id, {
					id: this.id,
					content: this.msg.trim()
				}).then(result => {
					if (result.status === 200) {
						debugger
						var cmt = {
							id: this.id,
							user_name: "访客",
							add_time: Date.now(),
							content: this.msg.trim()
						}
						this.comments.unshift(cmt);
						this.msg = '';
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.cmt-container {
		h3 {
			font-size: 18px;
		}

		textarea {
			font-size: 14px;
			height: 85px;
			margin: 0;
		}

		.cmt-list {
			margin: 10px 0;

			.cmt-item {
				.cmt-title {
					padding: 0 5px;
					background: #ccc;
					font-size: 13px;
					line-height: 30px;
				}

				.cmt-body {
					line-height: 35px;
					text-indent: 2em;
				}
			}
		}
	}
</style>
