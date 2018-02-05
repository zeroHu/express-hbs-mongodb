const mongoose = require('mongoose');
const express = require('express');
const request = require('request');
const Users = require('../database/modules/users'); //导入模型数据模块
const router = express.Router();
const svgCaptcha = require('svg-captcha');

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
                msg: '增加人口失败'
            });
            return;
        }
        res.redirect('/users');
    });
});

// 删除人口接口
router.post('/deluser',function(req,res){
    Users.findByIdAndRemove({ _id: req.body.id }, function(err, doc) {
        if (err) {
            res.json({
                status: -1,
                msg:'删除失败'
            });
            return;
        }
        res.json({
            status: 0,
            msg: '删除成功'
        });
    });
});

// request 插件请求别的服务器的数据
router.get('/user/info', function(req, res, next) {
    request('http://www.xfz.cn/api/website/user/info/', function(error, response, body) {
        res.send(response);
    });
});

// test api
router.get('/api/test', function(req, res, next) {
    console.log('req.query======>',req.query.page)
    res.json({
        status: 0,
        data: {
            msg: 'I am a test word',
            page: req.query.page,
            list: [
                '我是一个小美女',
                '我是一个超级小美女',
                '我是小仙女',
                '别问我为啥，no why'
            ]
        }
    });
});
// get shorten url api
router.get('/api/shorturl', function(req, res, next) {
    var apiKey = '4110768210';
    var requestUrl = req.query.url;
    request(`http://api.t.sina.com.cn/short_url/shorten.json?source=${apiKey}&url_long=${requestUrl}`, function(error, response, body) {
        res.send(body);
    });
})
// get long url api
router.get('/api/expandurl', function(req, res, nexut) {
    var apiKey = '4110768210';
    var requestUrl = req.query.url;
    request(`http://api.t.sina.com.cn/short_url/expand.json?source=${apiKey}&url_short=${requestUrl}`, function(error, response, body) {
        res.send(body);
    });
})

// 验证码图片
router.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create();
    // req.session.captcha = captcha.text;
    // res.type('svg');
    // console.log('captcha=========>',captcha);
    // res.send 是直接渲染到页面
    res.json({
        status: 0,
        data: captcha.data
    });
    // res.status(200).send(captcha.data);
});
module.exports = router;