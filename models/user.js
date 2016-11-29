var mongoose = require('mongoose');

var UserSchema = require('../schemas/user');

var User = mongoose.model('User',UserSchema);  //编译生成movie这个函数            

module.exports = User;




