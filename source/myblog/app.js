var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var session = require('express-session')
/*var html2jade = require('html2jade')
var document = path.join(__dirname, 'views')
html2jade.convertDocument(document,{},function(err, jade){})*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
//设置引擎，将.jade扩展名的文件用./common/jade处理
app.engine('.jade', require('./common/jade'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//配置session
app.use(session({
  secret: 'yy',
  resave: false,
  saveUninitialized: true
}));
//配置和缓存
global.config = require('./common/config');
global.cache = {};
require('./useRoutes')(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
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

app.set('port', 3300);

var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + server.address().port);
});

