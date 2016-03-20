var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;   
var UserSchema = new Schema({  
    userID: { type: String, index: { unique: true }, required:true},
    password: { type: String, required:true},
    nick: { type: String, default: '匿名用户' },
    email: { type: String },
    regTime: { type: Date, default: Date.now },
    auth: { type: String, default: 0}
});
UserSchema.statics.findNickByID = function  (userID, callback) {
    return this.model('User').find({ userID: userID },
        function (error, doc) {
            if (error) {
                console.log(error);
                callback('');
            } else {
                //console.log(doc);
                callback(doc[0].nick);
            }
    });
}

module.exports = mongoose.model('User', UserSchema); 