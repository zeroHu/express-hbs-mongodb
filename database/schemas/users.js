/**
 * 申明schemas
 */
var mongoose = require('mongoose');
//申明一个mongoons对象
var UsersSchema = new mongoose.Schema({
    name: String,
    year: Number
});
/**
 * ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
 * 注意，此处巨坑，有人7，8个小时候坑这了，我也被坑了大概1小时左右
 * 如果没有下面这个set collection的名字 ，而且巧合 你的集合的名字后面没有s 巨坑的mongoose会自动给你加上s 然后查询的时候 是[]
 * ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
 */
// 设置collection名字 这样才不会被加s
UsersSchema.set('collection', 'user');


module.exports = UsersSchema;