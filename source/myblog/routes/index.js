var express = require('express'); //加载express框架
var router = express.Router();   //创建一个路由实例
var Blog = require('../models/blog');
var Tag = require('../models/tag');
var Collect = require('../models/collect');
var util = require('../common/util');
var async = require('async'); //流程控制工具包，提供了直接而强大的异步功能
//没有用到process函数
/*function process(req, res, totPage, tag, collect) {
    var page = 1;
    if (req.query) {
        page = req.query.page || 1;
    }
    Blog.findByPage(page, function (doc) {
        doc = util.getAbstract(doc);
        doc = util.getTagArr(doc);
        util.getCollectArr(doc, function (doc) {

            var ownerInfo = {
                ownerName: config.ownerName,
                ownerLocation: config.ownerLocation,
                motto: config.motto,
                articleNum: util.getArticleNum()
            }
            res.render('index', {
                title: config.blogName,
                isMe : req.session.isMe,
                doc: doc,
                tag: tag,
                collect: collect,
                totPage: totPage,
                curPage: page
            });
        });
    });
}*/
router.get('/', function(req, res) {
    var page = 1;
    if (req.query) {
        page = req.query.page || 1;
        //console.log(page);
    }
    async.series([   //串行(series) 它的作用就是按照顺序一次执行。
        function (callback){ 
        //得出分页数 
            Blog.findTotPage(function (totPage) {
                callback(null, totPage);
            });
        },
        //得到全部标签跟文集
        function (callback) {
            util.getSidebarInfo(function (data) {
                callback(null, data);
            });
        },
        function (callback) {
            //加工一下本页的文章 rs[2]
            Blog.findByPage(page, function (doc) {//获取文章
                doc = util.getAbstract(doc);
                //doc = util.getTagArr(doc);
                //得到该文章属于哪个文集
                util.getCollectArr(doc, function (doc) {
                    callback(null, doc);
                    //console.log('doccallback' + doc);找不到collectArr
                });
            });
        },
        function (callback) {
            //加工一下本页的文章 rs[2]
            Blog.findRrowse(page, function (doc) {//获取文章
                doc = util.getAbstract(doc);
                //doc = util.getTagArr(doc);
                //得到该文章属于哪个文集
                util.getCollectArr(doc, function (doc) {
                    callback(null, doc);
                    //console.log('doccallback' + doc);找不到collectArr
                });
            });
        },
        function (callback) {
            //加工一下本页的文章 rs[2]
            Blog.findReply(page, function (doc) {//获取文章
                doc = util.getAbstract(doc);
                //doc = util.getTagArr(doc);
                //得到该文章属于哪个文集
                util.getCollectArr(doc, function (doc) {
                    callback(null, doc);
                    //console.log('doccallback' + doc);找不到collectArr
                });
            });
        }
        //得出文章总数，主页上不用到
        /*function (callback) {
            //博主信息，目前只有文章数量 rs[3]
            util.getArticleNum(function (articleNum) {
                callback(null, articleNum);
            });
        }*/
    ], function (err, rs) {
        //console.log("index:" + rs[2]);
        //console.log("req.session:" + req.session.isMe);
        res.render('index', {
            //config为全局变量，故直接调用
            title: config.blogName,
            isMe : req.session.isMe,
            doc: rs[2],
            browseSort: rs[3],
            replySort: rs[4],
            tags: rs[1].tags,
            collects: rs[1].collects,
            totPage: rs[0],
            // articleNum: rs[3],
            curPage: parseInt(page)
        });
    });
});

module.exports = router;
