// 项目入口文件配置

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;	//端口  process是全局的
var app = express();

app.set('views','./views/pages');	//设置views根目录
app.set('view engine','jade');	//设置模版引擎
app.use(bodyParser()); //用来格式化表单数据的
app.use(express.static(path.join(__dirname, 'node_modules')));//设置样式去哪加载，__dirname表示当前目录
app.listen(port);

console.log('process started on port'+port);


//index page 路由设置
app.get('/',function(req,res){
	res.render('index',{
		title:'Movie 首页',
		movies: [{
					title: '机械战警',
					_id : '1',
					poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
				},{
					title: '机械战警',
					_id : '2',
					poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
				},{
					title: '机械战警',
					_id : '3',
					poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
				},{
					title: '机械战警',
					_id : '4',
					poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
				},{
					title: '机械战警',
					_id : '5',
					poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
				},{
					title: '机械战警',
					_id : '6',
					poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
				}]
	})
})

// detail
		//设置的路径  自己想要走的路径
app.get('/movie/:id',function(req,res){
	//	render 里面传的参数 可以在view中直接调用啦
	res.render('detail',{
		title:'detail 详情页',
		movie:{
			doctor:'张嵩',
			country:"美国",
			title:'机械战警',
			year:'2014',
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'English',
			flash:"http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
			summary:'随便写点什么都行  我也不知道他的简介是什么样的'
		}
	})
})

// list
app.get('/admin/list',function(req,res){
	res.render('list',{
		title:'list 列表页',
		movies: [{
			title:'机械战警',
			_id : '1',
			doctor:'张嵩',
			country:"美国",
			year:'2014',
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'English',
			flash:"http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
			summary:'随便写点什么都行  我也不知道他的简介是什么样的'
		},{
			title:'机械战警',
			_id : '2',
			doctor:'张嵩',
			country:"美国",
			year:'2014',
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'English',
			flash:"http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
			summary:'随便写点什么都行  我也不知道他的简介是什么样的'
		},{
			title:'机械战警',
			_id : '3',
			doctor:'张嵩',
			country:"美国",
			year:'2014',
			poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
			language:'English',
			flash:"http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
			summary:'随便写点什么都行  我也不知道他的简介是什么样的'
		}]
	})
})

//admin
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'admin 登陆页',
		movie:{
			doctor:'',
			country:'',
			title:'',
			year:'',
			poster:'',
			language:'',
			flash:'',
			summary:''
		}
	})
})
















