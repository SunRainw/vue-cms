const path=require('path')
const webpack=require('webpack')
const htmlWebpackPlugin=require('html-webpack-plugin')
const vueLoaderPlugin=require('vue-loader/lib/plugin')

module.exports={
	entry:path.join(__dirname,'./src/main.js'),//输入
	output:{
		path:path.join(__dirname,'./dist'),//输出目录
		filename:'bundle.js'//输出文件
	},
	plugins:[
		new htmlWebpackPlugin({//创建一个在内存中生成HTML页面的插件
			template:path.join(__dirname,'./src/index.html'),//指定模板页面将来会根据	指定的页面路径生成内存中页面
			filename:'index.html'
		}),
		new vueLoaderPlugin()
	],
	//1. 处理ES6高级语法或更高使用babel，安装两套包：
	//1.1 第一套：npm i babel-core babel-loader babel-plugin-transform-runtime -D
	//1.2 第二套：npm i babel-preset-env babel-preset-stage-0 -D
	//2打开webpack配置文件，在module结点下的rule数组中，添加一个新的匹配规则：
	//2.1 {test:/\.js$/,use:'babel-loader',exclude/node_modules/}
	//2.2 注意在配置babel的loader规则时，必须把node_modules目录，通过exclude选项排除掉，原因有2：
	//2.2.1 如果不排除 node_modules，则Babel会把node_modules中所有的js文件都打包编译，这样会非常消耗cpu，同时打包速度很慢
	//2.2.2 哪怕最终，babel把所有node_modules中的JS转换完毕，项目也无法正常运行
	//3. 在项目的根目录中，新建一个babelrc的Babel配置文件，必须符合json语法规范 
	//3.1 babel的配置如下：
		// {
		// 	"presets":["env","stage-0"],
		// 	"plugins":["transform-runtime"]
		// }
	module:{
		rules:[
			{
				test:/\.css$/,use:['style-loader','css-loader']
			},
			{
				test:/\.less$/,use:['style-loader','css-loader','less-loader']
			},
			{
				test:/\.scss$/,use:['style-loader','css-loader','sass-loader']
			},
			{
				test:/\.(jpg|png|gif|bmp|jpeg)$/,use:'url-loader?limit=1024&name=[hash:8]-[name].[ext]'
			},
			//limit给定的值，单位为byte，限制图片大小，如果图片大小小于limit值会转为base64
			{
				test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'
			},//处理字体文件
			{test:/\.js$/,use:'babel-loader',exclude:/node_modules/},
			{test:/\.vue$/,use:'vue-loader'}
		]
	},
	resolve:{
		alias:{
			//'vue$':"vue/dist/vue.js"
		}
	}
	
}