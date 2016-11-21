var mongoose = require('mongoose');

var MovieSchema = require('../schemas/movie');

var Movie = mongoose.model('movie',MovieSchema);  //编译生成movie这个函数

module.exports = Movie;