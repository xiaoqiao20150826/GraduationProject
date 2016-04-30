console.log('__filename:'+__filename);
console.log('__dirname:' + __dirname);
var test = {};
var a = {
	b:"tag"
}
if(!test[a.b]){
	test[a.b] =0;
}
 test[a.b] ++;
console.log(test);