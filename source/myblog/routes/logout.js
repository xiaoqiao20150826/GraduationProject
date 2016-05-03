var express = require('express');
var router = express.Router();

router.get('/logout', function(req, res) {
    delete req.session.isMe;
    console.log(req.session.isMe);
    res.redirect('/');
});
module.exports = router;
