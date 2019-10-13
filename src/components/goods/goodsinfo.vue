<template>
	<div class="goods-container">
		<transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
		<div class="ball" v-show="ballFlag" ref="ball"></div>
		</transition>


		<!-- 商品轮播区域 -->
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swiper :swiperList="swiperList" :isfull="false"></swiper>
				</div>
			</div>
		</div>

		<!-- 商品购买区域 -->
		<div class="mui-card">
			<div class="mui-card-header">{{goodsinfo.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
						市场价：<del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp; 销售价：<span class="now_price">￥{{goodsinfo.sell_price}}</span>
					</p>
					<p>购买数量：<numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
					</p>
					<p>
						<mt-button type="primary" size="small" >立即购买</mt-button>
						<mt-button type="danger" size="small" @click="addToCar()">加入购物车</mt-button>
					</p>
				</div>
			</div>
		</div>

		<!-- 商品参数区域 -->
		<div class="mui-card">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p>商品货号：{{goodsinfo.goods_num}}</p>
					<p>库存情况：{{goodsinfo.stock_quantity}}件</p>
					<p>上架时间：{{goodsinfo.add_time|dateFormat}}</p>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
				<mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
			</div>
		</div>
	</div>
</template>

<script>
	import swiper from '../subcomponent/swiper.vue'
	import numbox from '../subcomponent/goodsinfo_numbox.vue'
	export default {
		data() {
			return {
				id: parseInt(this.$route.params.id) + 50,
				swiperList: [],
				goodsinfo: {},
				ballFlag: false ,//控制小球显示和隐藏的标识符
				selectCount:1	//保存用户选中的商品数量，默认为1
			}
		},
		created() {
			this.getSwiper();
			this.getGoodsInfo();
		},
		methods: {
			getSwiper() {
				this.$http.get('api/getphotolist/' + this.id).then(result => {
					if (result.body.status === 0) {
						//console.log(result);
						result.body.message.forEach(item => {
							item.img = item.img_url;
						})
						this.swiperList = result.body.message;
					}
				})
			},
			getGoodsInfo() {
				this.$http.get('api/getgoodsinfo/' + this.id).then(result => {
					if (result.body.status === 0) {
						//console.log(result);
						this.goodsinfo = result.body.message;
					}
				})
			},
			goDesc(id) {
				this.$router.push({
					name: "goodsdesc",
					params: {
						id
					}
				})
			},
			goComment(id) {
				this.$router.push({
					name: "goodscomment",
					params: {
						id
					}
				})
			},
			addToCar() {
				this.ballFlag = !this.ballFlag;
				// console.log(1)
				var goodsinfo={id:this.id,count:this.selectCount,price:this.goodsinfo.sell_price,selected:true};
				this.$store.commit("addToCar",goodsinfo);
			},
			beforeEnter(el) {
				el.style.transform = "translate(0,0)";
			},
			enter(el, done) {
				const ballPosition=this.$refs.ball.getBoundingClientRect();//获取小球在页面中的位置
				const badgePosition=document.getElementById('badge').getBoundingClientRect();//获取徽标在页面中的位置
				const xDist=badgePosition.left-ballPosition.left;
				const yDist=badgePosition.top-ballPosition.top;
				
				el.offsetWidth;
				el.style.transform = `translate(${xDist}px,${yDist}235px)`;
				el.style.transition = 'all 0.6s cubic-bezier(.4,-0.3,1,.68)';
				done();
			},
			afterEnter(el) {
				this.ballFlag = !this.ballFlag;
			},
			getSelectedCount(count){
				
				this.selectCount=count;
				//console.log(this.selectCount)
			}
		},
		components: {
			swiper,
			numbox
		}
	}
</script>

<style lang="scss" scoped>
	.goods-container {
		background-color: #eee;
		overflow: hidden;

		.now_price {
			color: red;
			font-size: 16px;
			font-weight: bold;
		}

		.mui-card-footer {
			display: block;

			button {
				margin: 10px 0;
			}
		}

		.ball {
			width: 15px;
			height: 15px;
			border-radius: 50%;
			background: red;
			position: absolute;
			z-index: 10;
			top: 345px;
			left: 146px;
		}
	}
</style>
