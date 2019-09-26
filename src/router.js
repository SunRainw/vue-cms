import VueRouter from 'vue-router';

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

import Newslist from './components/news/Newslist.vue'
import Newsinfo from './components/news/Newsinfo.vue'

import PhotoList from './components/photos/Photolist.vue'

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
	],
	linkActiveClass:'mui-active'//替换路由选中样式
})

export default router