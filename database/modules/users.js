var mongoose = require('mongoose');
var UsersSchema = require('../schemas/users'); //拿到导出的数据集模块

//而且注意如果没有set collection mongoose 会把集合名变成复数。
var Users = mongoose.model('user', UsersSchema); // 这里的  user 是集合的名字

module.exports = Users;