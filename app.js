// 项目入口文件配置

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var _ = require('underscore');
var Movie = require('./models/movie');
var User = require('./models/user');
var port = process.env.PORT || 3000;	//端口  process是全局的
var app = express();

//connect sql
mongoose.connect('mongodb://localhost/movie');

app.set('views','./views/pages');	//设置views根目录
app.set('view engine','jade');	//设置模版引擎
app.use(bodyParser()); //用来格式化表单数据的
app.use(express.static(path.join(__dirname, 'public')));//设置样式去哪加载，__dirname表示当前目录
app.locals.moment = require('moment');
app.listen(port);

console.log('process started on port'+port);

//index page 路由设置
app.get('/',function(req,res){
	//调用schemas里里面的方法啦   通过models里面的model编译生成的函数调用
	Movie.fetch(function(err, movies){
		if(err){
			console.log("错误信息:"+err);
		}
		res.render('index',{
			title:'Movie 首页',
			 movies: movies
		})
	})
})

// detail
		//设置的路径  自己想要走的路径 /:id可以通过req直接拿到
app.get('/movie/:id',function(req,res){
	var id = req.params.id;
	Movie.findById(id,function(err,movie){
		if(err){
			console.log("错误信息:"+err);
		}
		//	render 里面传的参数 可以在view中直接调用啦
		res.render('detail',{
			title: movie.title+' 详情页',
			movie: movie
		})
	})	
})


//来取注册信息
app.post('/user/signup',function(req,res) {
	var _user = req.body.user;
	
	User.find({name: _user.name},function(err, user) {
		if(err){
			console.log("错误信息:"+err);
		}
		if(user){
			return res.redirect('/');
		}else{
			var user = new User(_user);
			user.save(function(err,user) {
				if(err){
					console.log("错误信息:"+err);
				}
					//重定向,想当于成功后到哪个界面
				res.redirect('/');
			})
		}
	})
	
})


//userlist
app.get('/admin/userlist',function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log("错误信息:"+err);
		}
		res.render('userlist',{
			title:'userlist 用户列表页',
			users: users
		})
	})
	
})

// list
app.get('/admin/list',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log("错误信息:"+err);
		}
		res.render('list',{
			title:'list 列表页',
			movies: movies
		})
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

//update movie
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id;
	if(id){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log("错误信息:"+err);
			}
			res.render('admin',{
				title: 'movie 后台更新页',
				movie:movie
			})
		})
	}
})

//admin post movie
app.post('/admin/movie/new',function(req,res){
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	//判断它是否是新添加进来的
	if(id !== "undefined"){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log("错误信息:"+err);
			}
			_movie = _.extend(movie,movieObj);
			_movie.save(function(err,movie){
				if(err){
					console.log("错误信息:"+err);	
				}
				//返回  成功后重新刷新
				res.redirect('movie/' + movie._id);
			})
		})
	}else{
		_movie = new Movie({
			doctor : movieObj.doctor,
			title : movieObj.title,
			country : movieObj.country,
			language : movieObj.language,
			year : movieObj.year,
			summary : movieObj.summary,
			flash : movieObj.flash,
			poster : movieObj.poster
		})
		_movie.save(function(err,movie){
			if(err){
				console.log("错误信息:"+err);
			}
			res.redirect('/movie/' + movie._id);
		})
	} 	
})

//DELETE movie
app.delete('/admin/list', function(req,res) {
			//查找id
	var id = req.query.id;
	//express 获取http参数的三种方式 
	//1、req.params  例如：127.0.0.1:3000/index，这种情况下，我们为了得到index
	//2、req.query   例如：127.0.0.1:3000/index?id=12，这种情况下，这种方式是获取客户端get方式传递过来的值，通过使用req.query.id就可以获得，类似于PHP的get方法；
	//3、req.body    例如：127.0.0.1：300/index，然后post了一个id=2的值，这种方式是获取客户端post过来的数据，可以通过req.body.id获取，类似于PHP的post方法；
	if(id){
		Movie.remove({_id:id}, function(err,movie) {
			if(err){
				console.log("错误信息:"+err)
			}else{
				//给客户端返回一个json数据
				res.json({success: 1})
			}
		})
	}
})










