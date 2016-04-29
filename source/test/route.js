//这里只有路径/foo有效。就是Router模块的东西要使用use方法挂载到应用上。才会有用

var express = require('express');
var app = express();
var router = express.Router();

router.use(function(req,res,next){
	console.log('%s %s %s',req.method,req.url,req.path);
	next();
});

router.use('/bar',function(req,res,next){
	console.log('bar');
	next();
});

router.use(function(req,res,next) {
	res.send('Hello world');
});

app.use('/foo',router);

app.listen(3000);