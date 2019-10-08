import VueRouter from 'vue-router';

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

import Newslist from './components/news/Newslist.vue'
import Newsinfo from './components/news/Newsinfo.vue'

import PhotoList from './components/photos/Photolist.vue'
import Photoinfo from './components/photos/photoinfo.vue'

import GoodsList from './components/goods/goodslist.vue'
import Goodsinfo from './components/goods/goodsinfo.vue'
import GoodsDesc from './components/goods/goodsDesc.vue'
import GoodsComment from './components/goods/goodsComment.vue'

var router = new VueRouter({
	routes: [
		{path:'/',redirect:'/home'},
		{path:'/home',component:HomeContainer},
		{path:'/member',component:MemberContainer},
		{path:'/shopcar',component:ShopcarContainer},
		{path:'/search',component:SearchContainer},
		{path:'/home/newslist',component:Newslist},
		{path:'/home/newsinfo/:id',component:Newsinfo},
		{path:'/home/photolist',component:PhotoList},
		{path:'/home/photoinfo/:imgId',component:Photoinfo},
		{path:'/home/goodslist',component:GoodsList},
		{path:'/home/goodsinfo/:id',component:Goodsinfo,name:"goodsinfo"},
		{path:'/home/goodsdesc/:id',component:GoodsDesc,name:"goodsdesc"},
		{path:'/home/goodscomment/:id',component:GoodsComment,name:"goodscomment"},
	],
	linkActiveClass:'mui-active'//替换路由选中样式
})

export default router