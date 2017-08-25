const mongoose = require('mongoose');
const express = require('express');
const request = require('request');
const Users = require('../database/modules/users'); //导入模型数据模块
const router = express.Router();

// 连接数据库
mongoose.connect('mongodb://localhost/test');

// 数据库连接提示
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('========= mongodb open =========');
});

// 定义book
router.get('/book', function(req, res) {
    res.send('this is a get book api');
});

// 定义userinfo
router.get('/databaseinfo', function(req, res) {
    Users.find({}, function(err, user) {
        if (err) {
            console.log(err);
        }
        console.log('user=====>', user);
        //这里也可以json的格式直接返回数据res.json({data: users});
        res.render('pages/users', { title: 'this is a databaseinfo get request', data: user });
    });
});

// request 插件请求别的服务器的数据
router.get('/user/info', function(req, res, next) {
    request('http://www.xfz.cn/api/website/user/info/', function(error, response, body) {
        res.send(response);
    });
});

// 模板渲染 默认使用主模板 main
router.get('/self', function(req, res) {
    res.render('pages/self', { title: 'zero', message: 'Hello there!' });
});

// 模板渲染 (主模板是 theme)
router.get('/getsome', function(req, res) {
    res.render('pages/getsome', { title: 'zero', message: 'getsome' });
});

module.exports = router;