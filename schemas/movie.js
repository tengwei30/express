var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
	//定义数据库的数据类型
	doctor : String,
	title : String,
	language : String,
	country : String,
	summary : String,
	flash : String,
	poster : String,
	year : Number,
	meta : {
		createAt: {
			type: Date,
			default: Date now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

//添加方法 所用的方法都必须要经过model层的调用才能使
// 每回改变都会重新调用一遍save方法
MovieSchema.pre('save', function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now()
	}else{
		this.meta.updateAt = Date.now()
	}
	next() //加next程序才会走下去
})

//添加个静态方法
MovieSchema.static = function(){
	//fetch方法就是用来取出数据库中所有数据 通过exec导出
	fetch : function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			exec(cb)
	}
	findById : function(id,cb){
		return this
			.findOne({_id:id})
			exec(cb)
	}
}

module.exports = MovieSchema;

