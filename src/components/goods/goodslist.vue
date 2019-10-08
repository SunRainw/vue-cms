<template>
	<div class="goods-list">
		<div class="goods-item" v-for="item in goodslist" :key="item._id" @click="toDetail(item.id)">
			<img :src="item.img_url" alt="">
			<h2 class="title">{{item.title}}</h2>
			<div class="info">
				<p class="price"><span class="now">￥{{item.sell_price}}</span><span class="old">￥{{item.market_price}}</span></p>
				<p class="sell">
					<span>热卖中</span>
					<span>剩{{item.stock_quantity}}件</span>
				</p>
			</div>
		</div>
		<mt-button type="danger" size="large" @click="getMoreGoods()">加载更多</mt-button>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				goodslist:[],
				pageIndex:1
			}
		},
		created(){
			this.getGoodslist()
		},
		methods:{
			getGoodslist() {
				this.$http.get('api/getgoodslist', {
					params: {
						pagesize: 4,
						pageIndex: this.pageIndex
					}
			
				}).then(result => {
					if (result.body.status === 0) {
						console.log(result);
						this.goodslist = this.goodslist.concat(result.body.goodslist);
					} else {
						Toast("获取评论失败！")
					}
				})
			},
			getMoreGoods(){
				this.pageIndex++;
				this.getGoodslist()
			},
			toDetail(id){
				
				// this.$route是路由参数对象，所有路由中得参数，params/query都属于它
				//this.$router是导航对象，可以方便得使用JS代码是现前进后退，跳转到新的url地址
				
				//1. 最简单得
				// this.$router.push('/homegoodsinfo/'+id);
				//2. 传递对象
				// this.$router.push({path:'/homegoodsinfo/'+id});
				//3. 命名路由
				this.$router.push({name:'goodsinfo',params:{id}});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list{
		display: flex;
		flex-wrap: wrap;
		padding: 8px;
		justify-content: space-between;
		.goods-item{
			width: 49%;
			border: 1px solid #ccc;
			box-shadow: 0 0 8px #ccc;
			margin: 3px 0;
			padding: 2px;
			min-height: 293px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			img{
				width: 100%;
			}
			.title{
				font-size: 14px;
				line-height: 16px;
				max-height: 48px;
				overflow: hidden;
				padding-left: 2px;
			}
			.info{
				// background-color: #ddd;	
				p{
					margin: 0;
					padding: 5px;
				}
				.price{
					.now{
						color: red;
						font-weight: bold;
						font-size: 16px;
					}
					.old{
						text-decoration: line-through;
						font-size: 12px;
						margin-left: 10px;
					}
				}
				.sell{
					display: flex;
					justify-content: space-between;
					font-size: 13px;
				}
			}
		}
	}
</style>
