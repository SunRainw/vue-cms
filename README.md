# 仿京东项目

## 首页app组件
1. Header区域, 采用Mint-UI组件
2. 底部Tabbar区域, 采用MUI组件
 + 购物车小图标在扩展图标中:
 + 需要拷贝扩展的css和ttf
 + 购物车需要添加mui-icon-extra mui-icon-extra-cart
3. 中间部分是router-view

## 点击tabbar中的路由链接,展示对应的路由组件

## 轮播图制作
1. 布局
2. 获取数据,使用vue-resource

## 新闻资讯路由链接

## 新闻资讯页面制作
1. 绘制界面，使用mui中的media-list组件
2. 使用vue-resource获取数据
3. 渲染数据到页面

## 实现新闻资讯列表跳转到详情页
1. 把每一项改造成router-link，同时在跳转的时候应该提供唯一的ID标识符
2. 创建新闻详情的组件页面 NewsInfo.vue
3. 在路由模块中，将新闻详情的路由地址和组件页面对应起来


## 单独封装评论组件 comment.vue
1. 在需要时可以去导入该组件
 + `import comment from './comment.vue'`
2. 在父组件使用该组件，注册为自己的子组件
3. 父组件以标签形式使用即可

## 实现点击更多评论
1. 为加载更多按钮绑定点击事件，请求下一页数据，让pageindex++
2. 为防止评论被新数据覆盖，使用concat拼接老评论数据

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空提示
4. 通过vue-resource发送请求，提交给服务器
5. 将最新的添加到最上面
 + 如果调用getcomment方法前几页获取不到，
 + 手动将发表的评论unshift到第一行

## 绘制图片列表组件页面结构并美化样式
1. 顶部滑动条
2. 制作底部的图片列表
### 制作顶部滑动条的坑
1. 借助与MUI中的tab-top-webview-main.html
2. 把mui-fullscreen类去掉（.slider中的）
3. 滑动条无法正常滑动，需要被初始化：
 + 导入mui.js
 + 调用官方提供的方式初始化：
 ```
 mui('.mui-scroll-wrapper').scroll({
 	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
 });
 ```
4. 在初始化时导入mui.js，webpack打包好的bundel.js中，默认启动严格模式，但mui.js中用到了 'caller', 'callee', and 'arguments' 
 + 解决方案：1.把mui.js中的非严格模式的代码改掉，2. 禁用webpack的严格模式(选择该方法)
5. 刚进入页面时，滑动条无法工作，所以我们把初始化滑动条的代码，搬到mounted中执行