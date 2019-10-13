//入口文件

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

//从本地存储中获取数据
var car=JSON.parse(localStorage.getItem('car')||'[]')

var store=new Vuex.Store({
	state:{
		car:car,//{id:商品id,count:商品数量,price:商品价格,selected:商品是否选中}
		
	},
	mutations:{
		addToCar(state,goodsinfo){
			var flag=false
			state.car.some(item=>{
				if(item.id==goodsinfo.id){
					item.count+=parseInt(goodsinfo.count);
					flag=true;
					return true;
				}
			})
			
			if(flag===false){
				state.car.push(goodsinfo);
			}
			localStorage.setItem('car',JSON.stringify(state	.car));
		},
		updateGoodsInfo(state,goodsinfo){
			//修改购物车中的数量
			console.log(goodsinfo.count)
			state.car.forEach(item=>{
				if(item.id==goodsinfo.id+50){
					item.count=parseInt(goodsinfo.count);
					return true;
				}
			})
		
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		removeFromCar(state,id){
			//根据id从store中购物车中删除对应的那条商品
			state.car.some((item,index)=>{
				console.log(id+50)
				if(item.id===id+50){
					state.car.splice(this.index,1)
					console.log('ok')
					return true;
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		updateGoodsSelected(state,info){
			state.car.some(item=>{
				if(item.id==info.id){
					item.selected=info.selected
				}
			})
			localStorage.setItem('car',JSON.stringify(state.car))
		},
		
	},
	getters:{
		getAllCount(state){
			var all=0;
			state.car.forEach(item=>{
				all+=item.count;
			});
			return all;
		},
		getGoodsCount(state){
			var o={}
			state.car.forEach(item=>{
				o[item.id]=item.count;
			})
			return o;
		},
		getGoodsSelected(state){
			var o={};
			state.car.forEach(item=>{
				o[item.id]=item.selected
			})
			return o;
		},
		getGoodsCountAndAmount(state){
			var o={
				count:0,//勾选的数量
				amount:0//总价
			};
			state.car.forEach(item=>{
				if(item.selected){
					o.count+=item.count;
					o.amount+=item.price*item.count
				}
			})
			return o;
		}
	}
})

//1.1 导入路由包
import VueRouter from 'vue-router';
//1.2 安装路由模块
Vue.use(VueRouter);

//2.1 导入 vue-resouce
import VueResource from 'vue-resource'
//2.2 安装vue-resource
Vue.use(VueResource);

import moment from 'moment'

Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
	return moment(dataStr).format(pattern)
})


Vue.http.options.root='http://localhost:3001'

//设置post时候表单数据格式的形式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON=true;

//导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入Mint-UI中的组件
// import {Header, Swipe, SwipeItem,Button,Lazyload} from 'mint-ui'
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload)

import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';

//安装图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})


//1.3 导入自己的router.js模块
import router from './router.js'

import app from './app.vue'



// Vue.use(MintUI)
var vm = new Vue({
	el: '#app',
	data: {
		
	},
	render: c => c(app), 
	//1.4 挂载路由对象在实例上
	router,
	store
})
