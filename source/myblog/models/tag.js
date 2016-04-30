var mongoose = require('mongoose')  
    , Schema = mongoose.Schema  
    , ObjectId = Schema.ObjectId;
var TagSchema = new Schema({  
    tag: { type: String },
    articleID: { type: Number },
    createTime: { type: Date, default: Date.now }
});
TagSchema.statics.findAllTag = function (callback) {
    if (cache.tag) {
        callback(cache.tag);
        return;
    }
    return this.model('Tag').find({}, function (error, doc) {
        //doc为find()出来的内容
        if (error) {
            console.log(error);
            callback({});
        } else {
            var tag = {};
            for (var i = doc.length - 1; i >= 0; i--) {
                
                if (!tag[doc[i].tag]) //判断doc[i].tag属性值是否有 
                    tag[doc[i].tag] = 0;//没有就添加 ，且值为0 
                tag[doc[i].tag] ++;     //这个属性的值+1，如果存在直接加1  
            }
            cache.tag = tag;
            callback(tag);
        }
    })
}
TagSchema.statics.findByTag = function (tag, callback) {
    return this.model('Tag')
        .find({ tag: tag })
        .sort({ createTime: -1})
        .exec(function (error, doc) {
            if (error) {
                console.log(error);
                callback([]);
            } else {
                callback(doc);
            }
        });
}
module.exports = mongoose.model('Tag', TagSchema); 