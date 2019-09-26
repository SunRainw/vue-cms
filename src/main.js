//入口文件

import Vue from 'vue';

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
	router
})
