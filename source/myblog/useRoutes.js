function use(app) {
    var path = require('path');
    var ueditor = require('ueditor-nodejs');
    var index = require('./routes/index');
    var about = require('./routes/about');
    var articleList = require('./routes/articleList');
    var login = require('./routes/login');
    var doLogin = require('./routes/doLogin');
    var blogNew = require('./routes/blog/new');
    var blogDoNew = require('./routes/blog/doNew');
    var article = require('./routes/blog/article');
    var reply = require('./routes/blog/reply');
    var collect = require('./routes/collect/collect');
    var tag = require('./routes/blog/tag');
    var collectEdit = require('./routes/collect/collectEdit');
    var getCollectDetail = require('./routes/collect/getCollectDetail');
    var collectDoEdit = require('./routes/collect/doEdit');
    var collectSingle = require('./routes/collect/collectSingle');
    var edit = require('./routes/blog/edit');
    var doEdit = require('./routes/blog/doEdit');
    var admin = require('./routes/admin');
    var register = require('./routes/register');
    var doRegister = require('./routes/doRegister');
    var dynamicPath = '';
    if (config.serverPlatform.platform == 'local') {
        dynamicPath = function(req) {
            if (req.session.isMe) { //如果是上传的文件存储在uploadimage里
                return '/uploadimage'
            } else {
                return '/visitorimage'//如果是访客的图片就存储在visitorimage
            }
        }
    } else {
        dynamicPath = config.serverPlatform.buckect;
    }
    app.use('/ueditor/ue', ueditor({
        configFile: '/ueditor/nodejs/config.json',
        mode: config.serverPlatform.platform,
        accessKey: config.serverPlatform.AccessKey,
        secrectKey: config.serverPlatform.SecrectKey,
        staticPath: path.join(__dirname, 'public'),
        dynamicPath: dynamicPath
    }));
    //将路由使用use方法挂载到app上
    app.use('/', index);    
    app.use('/', blogNew);
    app.use('/', blogDoNew);
    app.use('/', article);
    app.use('/', reply);
    app.use('/', collect);
    app.use('/', tag);
    app.use('/', collectEdit);
    app.use('/', getCollectDetail);
    app.use('/', collectDoEdit);
    app.use('/', collectSingle);
    app.use('/', edit);
    app.use('/', doEdit);
    app.use('/', admin);
    app.use('/', about);
    app.use('/', login);
    app.use('/doLogin', doLogin);
    app.use('/register', register);
    app.use('/doRegister', doRegister);
}
module.exports = use;
