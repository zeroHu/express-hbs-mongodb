const express = require('express');
const path = require('path');
const hbs = require('express-hbs');
const app = express();

const bodyParser = require('body-parser');

// 调用插件或者自定义文件
const cookieParser = require('cookie-parser');
const router = require('./router');
const helpers = require('./helpers'); //引入helpers

// 用cookie中间件
app.use(cookieParser());
app.use('/uploads', express.static(path.resolve(__dirname, './uploads')));

// 模板渲染相关信息
app.engine('hbs', hbs.express3({
    viewsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials'),
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('views', path.join(__dirname, 'views')); //指定hbs当前渲染文件夹
app.set('view engine', 'hbs'); //指定渲染引擎


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 引入router
app.use('/', router);

// 监听接口
app.listen(3001, function() {
    console.log('exrepss node 3001 start');
});