const mongoose = require('mongoose');
const express = require('express');
const request = require('request');
const Users = require('../database/modules/users'); //导入模型数据模块
const router = express.Router();

// 连接数据库
mongoose.connect('mongodb://localhost/expresshbs');

// 数据库连接提示
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// 数据库连接成功提示
db.once('open', function callback() {
    console.log('========= mongodb open =========');
});

/**********************************************   页面直接渲染   ************************************************/
// 示例页面
router.get('/', function(req, res) {
    Users.find({}, function(err, user) {
        if (err) {
            console.log(err);
        }
        console.log('user=====>', user);
        res.render('pages/example');
    });
});

// 展示所有人口页面
router.get('/users', function(req, res) {
    Users.find({}, function(err, user) {
        if (err) {
            console.log(err);
        }
        console.log('user=====>', user);
        res.render('pages/users',{userData:user});
    });
});

// 添加人口页面
router.get('/add', function(req, res) {
    res.render('pages/addUser');
});

// 模板渲染 (主模板是 theme)
router.get('/theme', function(req, res) {
    res.render('pages/theme', { title: 'zero', message: 'getsome' });
});
/**********************************************   api接口   ****************************************************/
// 添加人接口
router.post('/adduser', function(req, res) {
    var userdata = new Users({
       name:req.body.name,
       year:req.body.year
    });
    userdata.save(function(err, doc) {
        if (err) {
            res.json({
                errcode: -1,
                errmsg: '增加人口失败'
            });
            return;
        }
        res.redirect('/users');
    });
});
// request 插件请求别的服务器的数据
router.get('/user/info', function(req, res, next) {
    request('http://www.xfz.cn/api/website/user/info/', function(error, response, body) {
        res.send(response);
    });
});
module.exports = router;