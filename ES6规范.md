## ES6新增语法

1. let关键字
	```
	let关键字同var关键字，用于声明一个变量，let可以劫持一个函数块作为自身的可见范围，即作用域, 
	let声明的关键字不存在变量提升的问题,只在自身作用域内有效
	```
2. const关键字
	```
	用来定义一个常量，与其他强类型语言靠近，同let关键字相似，const同样可以劫持
	一个函数块作为自身作用域，且只在自身作用域内有效	
	```
3. 变量的解构赋值
	demo:
		var arr = new Array('apple', 'pair', 'banana');
		var [apple, p, b] = arr ;
		console.log(apple); //apple
		console.log(p); //pair
		console.log(b); //banana

	demo
		var obj = {name:'zhangsan', age:22, gender:'male'};
		var {name, age, gender} = obj ;

		console.log(name); //zhangsan
		console.log(age); //22
		console.log(gender); //male

	```
		注意：数组的解构赋值，变量名随便起。对象的解构赋值，变量名必须和对象属性名相对应
	```
4. String对象扩展
	* 模版字符串，用来简化字符串拼接
	
			var person = {name:'zhangsan', age:22};
			console.log('hello' + person.name);
			console.log(`hello ${person.name}`);
	* contains(str) //判断是否包含指定字符串
	* startsWith(str) //判断字符串是否是以指定字符串开头
	* endsWidth(str) //判读是否以指定字符串结尾
	* repeat(num) //字符串重复多次
	
5. Number对象扩展
 
	* Number.isFinite(num); `判断结构是否是有穷大的数字`
	* Number.isNaN(num); `判断结构是否是无效的数字`
	* Number.isNumber(num);`判断结构是否是Number类型数字`
	* Number.parseInt(str); `将以数字开头的字符串转换为数字`
	* Math.trunc(num);`将浮点数无舍入的砍掉`
6. Array对象
	```
	数组常用方法集合： 
		•	push()
		•	pop()
		•	shift()
		•	unshift()
		•	splice()
		•  slice()
		•	sort()
		•	concat()
		•	reverse()
	```
	* Array.from(btns); `将伪数组转换为数组`
	* Array.of(1,2,3); `将参数转换为数组存储`
	* Array.find(function(value, index, arr){}) `返回符合条件的数组元素，条件表达式为布尔值,只返回第一个符合条件的值`
	* Array.findIndex(function(value, index, arr){})`返回符合条件的数组元素的下标，同样返回布尔值的条件表达式`
	* Array.keys()`返回数组下标组成的迭代集合`
	* Array.values()`返回包含所有数组元素的可迭代集合`
	* Array.entries();`返回所有key和value的可迭代集合`
	* Array.map(function(value,index, obj){})
	* Array.filter(function(value,index, obj){})
	* Array.forEach(function(value,index, obj){})
	* Array.indexOf()
	* Array.lastIndexOf()
	* Array.fill(value, startIndex, lastIndex)
	* array.every(function(num){return num % 2 === 0}) `判断一个数组是否全部符合某个条件
	* some() `方法也接受一个返回值为布尔类型的函数， 只要有一个元素使得该函数返回 true，该方法就返回 true` array.some(function(num){return num % 2 === 0})
	* array.reduce(function(sum, num){return sum + num}) `可以对数组进行求和`
	* array.reduceRight(function(sum, num){return sum + num})`从数组末尾倒着计算，常用来将字符数组倒叙`
	
7. Object扩展(新功能都是为了简化代码的编写)
	* 增强的对象定义
		demo
			var name = 'zhangsan' ;
			var age = 22 ;
			var sayHello = function()
			{
				console.log(this.name);
			}
			var obj = {name, age, sayHello} ;
	* 增强的方法定义
		demo 
			var obj = {
				name : 'zhangsan',
 			   age : 22 ,
				sayHello()
				{
					console.log(this.name);
				}
			} ;
	* Object.is(obj1, obj2); `判断俩个对象或者数据是否一致，is方法对===进行了增强，对NaN，0，-0做了特殊处理`
	* Object.assign(target, source...); `将源对象的属性复制到目标对象
	* 显式指定对象隐式原型的对象，指定对象的父对象
	``` 
		var obj2 = {name : 'zhangsan'} ;
		obj.__proto__ = obj2 ;
		console.log(obj.name); ;
	```
8. 函数的扩展
	* 胖箭头函数
	```
	()=>{console.log('hello')}
	胖函数常用来定义匿名回调函数，前面是形参，后面是方法体，形参若只有一个，可以省略()，语句若只有一句，
	也可以省略函数体
	```
	* 形参默认值
		```
		function addPerson(x = 0, y = 1)
		{
			this.x = x ;
			this.y = y ;
		}
		```
	* 可变参数
		...nums
9. Set和Map容器(同java中的HashSet和HashMap)
		Set当中元素不能重复
		Map中的key不可以重复，value可以重复
	* Set
		- add(value) 
		- delete(value);
		- has(value)
		- clear();
		- size  
	* Map
		- set(key, value);
		- get(key) ;
		- delete(key) ;
		- has(key);
		- clear()
		- size;
		- key(); `返回所有key的一个`
		- values()
		- entries();
10. for...of循环
		这个循环返回一个迭代器，所有可以循环遍历的对象都可以使用for...of进行遍历

	* 数组
	* 集合set map
	* 字符串
	* 伪数组
	* 对象
	

