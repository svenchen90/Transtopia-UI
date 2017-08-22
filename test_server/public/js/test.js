var obj = {
	att1: '123',
	att2: $('<div>abc</div>'),
	fun2: function(){
		this.fun1();
	},
	fun1: function(){
		console.log(this.att1);
		console.log($(this.att2).text());
	}
};

//obj.fun2();
/* 
console.log(obj);
$($(obj.att2)).text(111);
obj.fun1();
 var objTemp = obj;
obj.fun1();
objTemp.fun1();

$(obj.att2).text(111);
obj.fun1();
objTemp.fun1();

 
obj.fun2 = function(){
	console.log(this.att1);
};

obj.fun2(); */



