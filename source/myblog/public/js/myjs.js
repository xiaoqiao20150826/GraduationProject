$(function() {
    if ($(window).width() > 768) {
        $('#waterfall').elasticColumns({
            columns: 3,
            innerMargin: 20,
            outerMargin: 10
        });
    } else {
        $('#waterfall').elasticColumns({
            columns: 1,
            innerMargin: 10,
            outerMargin: 5
        });
    }
    $(window).manhuatoTop({
        showHeight: 100,
        speed: 500
    })
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return '';
}

function isEmail(email) {
    var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return reg.test(email);
}

(function(tpl) {
    window.tpl = window.tpl || {};
    var tpl = window.tpl;
    tpl.render = function(s, data) {
        return s.replace(/#\{[A-Za-z_]+[A-Za-z0-9]*\}/g,
            function(match, idx) {
                var t = data[match.substring(2, match.length - 1)];
                return (typeof t == 'undefined') ? match : t;
            });
    }
})();
