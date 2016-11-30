var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');  //数据加密
var SALT_WORK_FACTOR = 10;  //加密长度

var UserSchema = new mongoose.Schema({
	//定义数据库的数据类型
	name: {
		unique: true,
		type: String
	},
	password: String,
	//时间记录
	meta : {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

//添加方法 所用的方法都必须要经过model层的调用才能使
//pre 每回改变都会重新调用一遍save方法
UserSchema.pre('save', function(next){
	var user = this;
	//判断是否为新添加的数据
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}

	// bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt) {
	// 	if(err) return next(err)
		bcrypt.hash(user.password,null,null,function(err, hash) {
			if(err) return next(err)
			user.password = hash;
			next()
		})
	// })

	next() //加next程序才会走下去
})

//添加实例方法
UserSchema.methods = {
	comparePassword: function(_password,cb) {
		bcrypt.compare(_password,this.password,null,function(err,isMatch) {
			if(err) return cb(err);

			cb(null,isMatch);
		})
	}
}


//添加个静态方法
UserSchema.statics = {

	//fetch方法就是用来取出数据库中所有数据 通过exec导出
	fetch : function(cb){
		return this
			.find({})
			.sort({'meta.updateAt':-1}) //sort中1表示升序  -1表示降序
			.exec(cb)
	},
	findById : function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb)
	}
}

module.exports = UserSchema;

