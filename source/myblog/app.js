var express = require('express'); //加载express框架
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();  //创建一个express实例
var session = require('express-session')  //会话中间件。实现持久化会话

//设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录。
app.set('views', path.join(__dirname, 'views'));
//设置引擎，将.jade扩展名的文件用./common/jade处理
app.engine('.jade', require('./common/jade'));
//设置jade为模板引擎
app.set('view engine', 'jade');

app.use(logger('dev')); //加载日志中间件
app.use(bodyParser.json()); //加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: true })); //加载解析urlencoded请求体的中间件
app.use(cookieParser()); //加载解析cookie的中间件。
app.use(express.static(path.join(__dirname, 'public'))); //设置public文件夹为存放静态文件的目录
app.use(favicon(__dirname + '/public/images/favicon.ico'));

//配置session，实现会话持久化
app.use(session({
  secret: 'yy',
  resave: false,
  saveUninitialized: true
}));
//配置和缓存
global.config = require('./common/config');
global.cache = {}; 

require('./useRoutes')(app);//加载路由模块，路由，类似于java中的拦截器功能，在请求到达后台之前，先在这里处理。


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("catch 404");
    var err = new Error('Not Found');//捕获404错误，并转发到错误处理器
    err.status = 404;
    next(err); //next的作用是将请求转发，这个必须有，如果没有，请求到这就挂起了。
});
 

// 开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
if (app.get('env') === 'development') {
    console.log("dev catch 404")
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// 生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
app.use(function(err, req, res, next) {
    console.log("pro error")
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
var opts = {  
    db: {  
        native_parser: true  
    },  
    server: {  
        poolSize:4,  
        auto_reconnect: true
    }
};

mongoose.connect('mongodb://'+ config.dbAddress + ':' + config.dbPort + '/' +config.dbName);

app.set('port', process.env.PORT || config.port);

var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + server.address().port);
});

