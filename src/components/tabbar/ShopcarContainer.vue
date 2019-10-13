<template>
	<div class="shopcar-container">
		<div class="goods-list">
			<div class="mui-card" v-for="(item,index) in goodslist" :key="item._id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id+50]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id+50])"></mt-switch>
						<img :src="item.img_url" alt="">
						<div class="info">
							<h2>{{item.title}}</h2>
							<p><span class="price">￥{{item.sell_price}}</span>
								<numbox :initcount="$store.getters.getGoodsCount[item.id+50]" :goodsid="item.id"></numbox>
								<a href="#" @click.prevent="remove(item.id,index)">删除</a>
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- 结算区域 -->
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner inner2">
						<div class="left">
							<p>总计不含运费</p>
							<p>已勾选商品<span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价￥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
							
						</div>
						<mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
		</div>
		<p>{{$store.getters.getGoodsSelected}}</p>
	</div>
	
</template>

<script>
	import numbox from '../subcomponent/shopcar_numbox.vue';

	export default {
		data() {
			return {
				goodslist: []
			}
		},
		created() {
			this.getGoodsList();
		},
		methods: {
			getGoodsList() {
				var idArr = [];
				this.$store.state.car.forEach(item => idArr.push(item.id - 50));
				console.log(idArr)
				//如果购物中没有商品，则直接返回
				if (idArr.length <= 0) {
					return;
				}
				this.$http.get('api/goods/getgoodslist/' + idArr.join(",")).then(result => {
					console.log(result)
					if (result.body.status === 0) {
						this.goodslist = result.body.message;
					}
				})
			},
			
			remove(id,index){
				//点击删除，把商品从store中根据传递的Id删除，同时把当前组件中的goodslist中对应要删除的那个商品，使用index来删除
				this.goodslist.splice(index,1);
				this.$store.commit('removeFromCar',id)
			},
			selectedChanged(id,value){
				//每当点击开关把新的开关状态同步到store中
				console.log(id)
				this.$store.commit('updateGoodsSelected',{id:id+50,selected:value})
			}
		},
		components: {
			numbox
		}
	}
</script>

<style lang="scss" scoped>
	.shopcar-container {
		background-color: #eee;
		overflow: hidden;
		.inner2{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.red{
				font-size: 16px;
				font-weight: bold;
				color: red;
			}
		}
		.goods-list {
			.mui-card-content-inner {
				display: flex;
				align-items: center;
			}

			img {
				width: 60px;
				height: 60px;
			}

			h2 {
				font-size: 13px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.price {
					color: red;
					font-weight: bold;
				}
			}
		}
	}
	
</style>
