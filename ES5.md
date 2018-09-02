## ES5常用对象和方法

1. 严格模式：

	```
	"use strict"
	严格模式表示js的语法检查更加严格，js代码在更严格的语法环境下执行，例如，
  不能在定义隐式变量， 函数调用必须显示指定上下文对象等一些不符合常规语法的特性
	```
	
	* 变量必须显式声明,也就是说不能隐式生成全局变量 var a = 0
	* 创建eval方法的作用域
	* 上下文对象this不能指向全局对象window， 就是所有函数的调用必须显式指定他的所属对象
	* 对象属性不能重复定义
	* 函数形参不能重复
2. JSON对象
	```
	JSON是一种轻量级的数据交换格式，是具有固定格式的一个字符串，字符串内可以包括一个以大括号包含的
	JSON对象，也可以是一个JSON数组，内部都是key和value形式的名值对儿，值可以是任何的js基本数据类
	型和数组对象等。。
	```
	* JSON.stringify(obj/arr) `将js对象或者数组转 换成json对象或数组字符串`
	* JSON.parse(strObj/strArr)`将具有json格式的字符串转换为js对象或者数组`
3. Object对象：
	```
	ES5为Object扩展了一些静态方法，常用的有2个
	ES5之前并没有提供对对象的深度克隆，ES5新增扩展对象，提供了对对象的深度克隆
	```
	* Object.create(obj, {}) `复制对象的同时，可以给新对象添加新的属性，克隆的新对象是原有对象的子对象，子对象的隐式原型对象指向原来的对象`
	* Object.defineProperties(obj, descriptors)
		`不复制原对象，可以对原有对象进行2次制定，包括新增方法和属性
		其中get和set方法都是用来监视属性值的变化实时返回和设置当前属性值
		`
	* Object.assign(target, source1, source2 ...)
			将源对象的可枚举属性赋值到目标对象，可以进行对象的克隆。注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
			function clone(origin)
			{
				return Object.assign({}, origin)
			}
	
4. Array对象
	* indexOf() `元素在数组中的索引，只返回第一个`
	* lastIndexOf();`元素在数组中的最后一个索引`
	* forEach(function(value, index, obj))`遍历数组`
	* map(function(value, index, obj){})`遍历数组，并返回数组的一个拷贝，可以对其中的元素进行定制`
	* filter(function(value, index, obj){})`遍历数组，并返回一个满足条件的子数组`
	* from()`主要用来将伪数组和集合转换为数组，任何有length属性的对象转为数组`
	* of()
	* find(function(value, index, arr){})
	* findIndex(function(value, index, arr){})
	* fill(value, startindex, endindex)`用给定的值填充数组，不指定位置则会替换掉所有成员
	* 数组推导`允许直接通过现有数组生成新数组`
			var a1 = [1,2,3,4]
			var a2 = [for(i of a1)i*2];
			a2 //[2,,4,6,8]
				注意：数组推导中for... of结构总是放在最前面，返回的表达式放在最后面
			var years = [ 1954, 1974, 1990, 2006, 2010, 2014 ]
			[for(year of years)if(year > 2000)year]
			//[2006, 2010, 2014]
			[for(year of years)if(year > 2000)if(year < 2010)year]
			//[2006]
			[for(year of years)if(year > 2000 && year < 2010)year]
			//[2006]
				数组推导可以代替map和filter
			数组推导需要注意的地方是，新数组会立即在内存中生成。这时，如果原数组是一个很大的数组，将会非常耗费内存。
5. Function对象
	* bind(obj) `为方法永久的绑定一个上下文执行对象`
	* call(obj, arguments)`用指定上下文对象调用函数`
	* apply(obj, [])`用指定上下文对象调用函数`
6. Date对象
	* Date.now();

