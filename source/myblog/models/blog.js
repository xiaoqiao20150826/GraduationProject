var mongoose = require('mongoose')  
    , Schema = mongoose.Schema  
    , ObjectId = Schema.ObjectId;
var autoinc  = require('mongoose-id-autoinc');
var db = mongoose.connection;
autoinc.init(db);
//定义一个Schema 
//new Schema()中传入一个JSON对象，该对象形如 xxx:yyyy ,
//xxx是一个字符串，定义了属性，yyy是一个Schema.Type，定义了属性类型
//var ObjectId = mongoose.Schema.Types.ObjectId;
//var TeacherSchema = new Schema({id:ObjectId});//只有id:ObjectId
//主键，一种特殊而且非常重要的类型，每个Schema都会默认配置这个属性，属性名为_id
var BlogSchema = new Schema({
    customURL: { type: String, default: '' }, 
    userID: { type: String }, //ObjectId??
    title: { type: String },
    content: { type: String },
    browse: { type: Number, default: 0 },
    reply: { type: Number, default: 0 },
    tag: { type: String },
    state: { type: Number, default: 1 },
    seoKeywords: { type: String },
    seoDescription: { type: String },
    createTime: { type: Date, default: Date.now },
    modifyTime: { type: Date, default: Date.now }
});
//静态方法在Model层就能使用
//查看文章的总页数
BlogSchema.statics.findTotPage = function (callback) {
    //在全局变量cache上添加totPage属性
    if (cache.totPage) {
        callback(cache.totPage);
        return;
    }
    return this.model('Blog')
        .find()
        //使用指定的正则表达式模式去字符串中查找匹配项，并以数组形式返回，如果未查找到则返回null
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
                callback(0);
            } else {
                //函数,math.ceil(x)返回大于参数x的最小整数
                callback((cache.totPage = Math.ceil(doc.length / config.aPageNum)));
            }
        });

}

BlogSchema.statics.findByPage = function (page, callback) {
    return this.model('Blog')
        .find()
        .sort({ createTime: -1 })
        .skip((page - 1) * config.aPageNum)
        .limit(config.aPageNum)
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
                callback([]);
            } else {
                callback(doc);
            }
        });
}
BlogSchema.statics.findRrowse = function (page, callback) {
    return this.model('Blog')
        .find()
        //实现排序  倒序 浏览量多的在最前面
        .sort({ browse: -1 })
        //实现分页
        //skip()控制返回结果跳过多少数量，如果参数是0，则当作没有约束，skip()将不起作用，或者说跳过了0条。
        .skip((page - 1) * config.aPageNum)
        //limit()控制返回结果数量，如果参数是0，则当作没有约束，limit()将不起作用。
        .limit(config.aPageNum)
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
                callback([]);
            } else {
                callback(doc);
            }
        });
}
BlogSchema.statics.findReply = function (page, callback) {
    return this.model('Blog')
        .find()
        //实现排序  倒序 浏览量多的在最前面
        .sort({ reply: -1 })
        //实现分页
        //skip()控制返回结果跳过多少数量，如果参数是0，则当作没有约束，skip()将不起作用，或者说跳过了0条。
        .skip((page - 1) * config.aPageNum)
        //limit()控制返回结果数量，如果参数是0，则当作没有约束，limit()将不起作用。
        .limit(config.aPageNum)
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
                callback([]);
            } else {
                callback(doc);
            }
        });
}
BlogSchema.statics.updateReply = function (articleID, num, callback) {
    return this.model('Blog').update(
        { articleID: articleID },
        { '$inc': { reply: num } },
        function (error) {
            if(error) {
                console.log('updateReply');
                console.log(error);
            }
            callback();
        });
}
BlogSchema.statics.checkCustomURL = function (articleID, customURL, callback) {
    return this.model('Blog').find({ customURL: customURL },
        function (error, doc) {
            if (error) {
                console.log(error);
                callback(false);
            } else if (doc.length <= 0) {
                callback(true);
            } else if (doc.length == 1 && 
                doc[0].articleID == articleID) {
                    callback(true);
            } else {
                callback(false);
            }
        });
}
BlogSchema.statics.updateCustomURL = function (articleID, customURL, callback) {
    return this.model('Blog').update(
        { articleID: articleID },
        { '$set': { customURL: customURL } },
        function (error) {
            if(error) {
                console.log('updateCustomURL');
                console.log(error);
            }
            callback();
        });
}
BlogSchema.statics.updateVisit = function (articleID, num, callback) {
    return this.model('Blog').update(
        { articleID: articleID },
        { '$inc': { browse: num } },
        function (error) {
            if(error) {
                console.log('updateVisit');
                console.log(error);
            }
            callback();
        });
}
BlogSchema.statics.findArticleID = function (callback) {
    return this.model('Blog').find({ createTime:{ $gt: new Date(+new Date() - 3600000) } },
        function (error, doc) {
            if (error) {
                console.log(error);
                callback(-1);
            } else if (doc.length <= 0) {
                console.log('没有博客');
                callback(-1);
            } else {
                var id = -1;
                for (var i = doc.length - 1; i >= 0; i--) {
                    if (doc[i].articleID > id) id = doc[i].articleID;
                }
                callback(id);
            }
    });
}
BlogSchema.statics.findByArticleID = function(id, callback) {
    return this.model('Blog').find({
        articleID: id
    }, function (error, doc) {
            if (error) {
                console.log(error);
                callback(null);
            } else {
                //console.log(doc);
                if(doc.length == 0)
                    callback(null);
                else callback(doc[0]);
            }
    });
}
BlogSchema.statics.findByCustomURL = function(id, callback) {
    return this.model('Blog').find({
        customURL: id
    }, function (error, doc) {
            if (error) {
                console.log(error);
                callback(null);
            } else {
                //console.log(doc);
                if(doc.length == 0)
                    callback(null);
                else callback(doc[0]);
            }
    });
}
BlogSchema.statics.findByArticleIDs = function (idArr, callback) {
    return this.model('Blog').find({ articleID: {'$in': idArr } })
        .sort({ createTime: -1 })
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
                callback([]);
            } else {
                callback(doc);
            }
        });
}
BlogSchema.statics.findByTime = function(time, callback) {
    return this.model('Blog')
        .find({ createTime: { $gt: time } })
        .sort({ createTime: -1 })
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
                callback([]);
            } else {
                callback(doc);
            }
        });
}
BlogSchema.statics.findAll = function (callback) {
    return this.model('Blog')
        .find().sort({ createTime: -1 })
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
                callback(null);
            } else {
                callback(doc);
            }
        });
}
BlogSchema.statics.updateXXX =function (id) {
    return this.model('Blog').update(
        { articleID: id },
        { '$set': { customURL: id } },
        function (error) {
        });
}
BlogSchema.plugin(autoinc.plugin, {
  model: 'Blog',
  field: 'articleID',
  start: 1,
  step: 1
});
//将该Schema发布为Model
module.exports = mongoose.model('Blog', BlogSchema); 