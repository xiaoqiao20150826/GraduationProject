//异步编程
for (var i = 1; i <= 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 0);
};
//全是输出4 4 4
//为什么
//什么是异步编程 这就是我们说的异步编程
// 高级函数的定义

// 这里为什么会说到高级函数，因为高级函数是异步编程的基础。

// 那什么是高级函数呢？
// 其实高级函数就是把函数作为参数或者是作为返回值。
// 示例：
	function test(v) {
	    return function() {
	        return v;
	    }
	}
//???这不是闭包吗？？
// 如上就是把一个函数作为一个返回值。
console.log(test('closure')());

//http://cnodejs.org/topic/54acfbb5ce87bace2444cbfb

var async = require('async');

async.series({
	one: function(callback){
		callback(null, 1);
	},
	two: function(callback){
		callback(null, 2);
	}
},function(err, results) {
	console.log(results);
});