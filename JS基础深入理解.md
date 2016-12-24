## JS基础深入理解
1.  
console.log("1");
setTimeout(function(){
    console.log("3")
},0);
console.log("2");
//控制台输出1，2，3
2.   
function fn() {
	 setTimeout(function(){alert('can you see me?');},1000);
	 while(true) {}
}
//alert永远不会输出
3. 闭包深入理解
 * var name = "The Window";
　　 var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　return function(){
　　　　　　　　return this.name;
　　　　　　};
　　　　}
　　};
　　alert(object.getNameFunc()());//The Window

   * var name = "The Window";
　　   var object = {
　　　　name : "My Object",
　　　　getNameFunc : function(){
　　　　　　var that = this;
　　　　　　return function(){
　　　　　　　　return that.name;
　　　　　　};
　　　　}
　　};　　alert(object.getNameFunc()());//My Object

 * function fun(n,o) {
  	console.log(o)
  	 return {
 	 fun:function(m){
		return fun(m,n);
	}
  	};
   }
var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);//
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);
```
	//答案：
	//a: undefined,0,0,0
	//b: undefined,0,1,2
	//c: undefined,0,1,1
```
4. Array/map,Number/parseInt
	["1", "2", "3"].map(parseInt)//求输出结果
	
```
	首先, map接受两个参数, 一个回调函数 callback, 一个回调函数的this值
	其中回调函数接受三个参数 currentValue, index, arrary;而题目中, map只传入了回调函数--parseInt.其次, parseInt 只接受两个两个参数 string, radix(基数). radix的合法区间是2-36. 0或是默认是10.所以本题即问
	
	parseInt('1', 0);
	parseInt('2', 1);
	parseInt('3', 2);
	后两者参数不合法.所以答案是：[1, NaN, NaN]；
```
5.  0.1+0.2!=0.3和9999999999999999 == 10000000000000000;
```
	JavaScript 不区分整数值和浮点数值，所有数字在 JavaScript 中均用浮点数值表示，所以在进行数字运算的时候要特别注意。精度丢失
	0.1 + 0.2 = 0.30000000000000004
	大整数精度在2的53次方以内是不会丢失的，也就是说浏览器能精确计算Math.pow(2,53)以内所有的数，小数精度，当十进制小数的二进制表示的有限数字不超过 52 位时，在 JavaScript 里也是可以精确存储的。
	解决办法：Math.round( (.1+.2)*100)/100;
```	
6. [1<2<3,3<2<1]

  此题会让人误以为是2>1&&2<3,其实不是的，这个题等价于

	1<2=>true;
	true<3=>1<3=>true;
	3<2=>true;
	false<1=>0<1=>true;
	答案：[true,true] 这个题的重点是对于运算符的理解，一是javascript对于不同类型数值的比较规则，详见js比较表,javascript相等性判断；二是对于比较操作符和赋值运算符的理解，即一个自左向右一个自右向左~

	![](http://i.imgur.com/nqlyxWi.png)

7. 浏览器蒙逼了
	3.toString;
	3..toString;
	3...toString;
	这个题感觉脑洞很大啊~先说答案：error,'3',error;
	可如果是
	
	var a=3;
	a.toString;
	却又合法了答案就是'3';
	为啥呢？
	因为在JS中1.1,1.,.1都是合法数字啊！那么在解析3.toString的时候到底是这是个数字呢，还是方法调用呢？浏览器就懵逼了呗，只能抛出一个error,所以说感觉此题就是在戏耍浏览器......
8. 声明提升
	```
	var name = 'World!';
	(function () {
	    if (typeof name === 'undefined') {
	        var name = 'Jack';
	        console.log('Goodbye ' + name);
	    } else {
	        console.log('Hello ' + name);
	    }
	})();
    ```
	答案是什么呢...笔者第一次做的时候傻傻的觉得是Hello,world...实则不然，正确答案是:Goodbye Jack;
	为什么呢，声明提升...上述代码相当于下面的代码：
	```
	var name = 'World!';
	(function () {
	    var name;
	    if (typeof name === 'undefined') {
	        name = 'Jack';
	        console.log('Goodbye ' + name);
	    } else {
	        console.log('Hello ' + name);
	    }
	})();
	```
9. 
	var a = [0];
	if ([0]) {
	  console.log(a == true);
	} else {
	  console.log("wut");
	}
10.
	function sidEffecting(ary) {
	  ary[0] = ary[2];
	}
	function bar(a,b,c) {
	  c = 10
	  sidEffecting(arguments);
	  return a + b + c;
	}
	bar(1,1,1)

The arguments object is an Array-like object corresponding to the arguments passed to a function.也就是说 arguments 是一个 object, c 就是 arguments2, 所以对于 c 的修改就是对 arguments2 的修改.
所以答案是 21.

当函数参数涉及到 any rest parameters, any default parameters or any destructured parameters 的时候, 这个 arguments 就不在是一个 mapped arguments object 了.....请看:

	function sidEffecting(ary) {
	  ary[0] = ary[2];
	}
	function bar(a,b,c=3) {
	  c = 10
	  sidEffecting(arguments);
	  return a + b + c;
	}
	bar(1,1,1)
	答案是12...

11 . 
	[,,,].join(", ")
	[,,,] => [undefined × 3]
	因为javascript 在定义数组的时候允许最后一个元素后跟一个,, 所以这是个长度为三的稀疏数组(这是长度为三, 并没有 0, 1, 2三个属性哦)
	答案: ", , "

