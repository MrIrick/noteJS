## JavaScript 高级特性

### 1. 作用域
作用域（scope）是结构化编程语言中的重要概念，它决定了变量的可见范围和生命周期，正确使用作用域可以使代码更清晰、易懂。作用域可以减少命名冲突，而且是垃圾回收的基本单元。JavaScript 的作用域不是以花括号包围的块级作用域（block scope） ，这个特性经常被大多数人忽视，因而导致莫名其妙的错误。

		if (true) {
			var somevar = 'value';
		}
		console.log(somevar); // 输出 value
	在其他大多数类C语言中会出现变量未定义的错误，而在Javascript中却完全合法，这是因为Javascript中的作用域完全由函数
	来决定，if，for语句中的花括号不是独立的作用域

#### 1.1 函数作用域
不同于大多数类 C 语言，由一对花括号封闭的代码块就是一个作用域， JavaScript 的作用域是通过函数来定义的，在一个函数中定义的变量只对这个函数内部可见，我们称为函数作用域。在函数中引用一个变量时， JavaScript 会先搜索当前函数作用域，或者称为“局部作用域”，如果没有找到则搜索其上层作用域，一直到全局作用域。
```
	var v1 = 'v1';
	var f1 = function() {
		console.log(v1); // 输出 v1
	};
	f1();
	var f2 = function() {
		var v1 = 'local';
		console.log(v1); // 输出 local
	};
	f2();
以上事例十分明了，变量的搜索顺序，由内到外。直到全局作用域
```
1. 看以下代码：

	var scope = 'global';
	var f = function() {
		console.log(scope); // 输出 undefined
		var scope = 'f';
	}
	f();

	这是 JavaScript 的一个特性，按照作用域搜索顺序，在 console.log 函数访问 scope 变量时， JavaScript会先搜索函数 f 的作用域，恰巧在 f 作用域里面搜索到 scope 变量，所以上层作用域中定义的 scope 就被屏蔽了，但执行console.log 语句时， scope 还没被定义，或者说初始化，所以得到的就是 undefined 值。我们还可以从另一个角度来理解：对于开发者来说，在访问未定义的变量或定义了但没有初始化的变量时，获得的值都是 undefined。于是我们可以认为，无论在函数内什么地方定义的变量，在一进入函数时就被定义了，但直到 var 所在的那一行它才被初始化，所以在这之前引用到的都是 undefined 值。
2. 函数作用域的嵌套

	var f = function() {
	var scope = 'f0';
		(function() {
			var scope = 'f1';
				(function() {
					console.log(scope); // 输出 f1
				})();
			})();
		};
		f();	
上面是一个函数作用域嵌套的例子，我们在最内层函数引用了 scope 变量，通过作用
域搜索，找到了其父作用域中定义的 scope 变量。有一点需要注意：
	**函数作用域的嵌套关系是在定义时决定的，而不是调用时决定，也就是说javascript的作用域是静态作用域，又叫词法作用域，这是因为作用域的嵌套关系可以在语法分析阶段确定，而不必等到运行时确定**
	
		demo
		var scope = 'top';
		var f1 = function() {
			console.log(scope);
		};

		f1(); // 输出 top
		var f2 = function() {
			var scope = 'f2';
			f1();
		};
		f2(); // 输出 top
		以上代码证明，作用域的嵌套关系是在定义时确定，而不是调用时确定

#### 1.2全局作用域
在 JavaScript 中有一种特殊的对象称为 全局对象。这个对象在Node.js 对应的是global对象，在浏览器中对应的是 window 对象。由于全局对象的所有属性在任何地方都是可见的，所以这个对象又称为 全局作用域。全局作用域中的变量不论在什么函数中都可以被直接引用，而不必通过全局对象。
满足以下条件的变量属于全局作用域:

* 在最外层定义的变量
* 全局对象的属性
* 在任何地方隐式定义的变量(未声明直接赋值的变量)

需要格外注意的是第三点，在任何地方隐式定义的变量都会定义在全局作用域当中，即不通过var定义而直接赋值的变量。这一点经常被人遗忘，而模块儿化编程的一个重要原则就是避免使用全局变量，所以在任何地方都不应该隐式定义变量

###2. 闭包

闭包的严格定义是“由函数（环境）及其封闭的自由变量组成的集合体。”通俗地讲， JavaScript 中每个的函数都是一个闭包，但通常意义上嵌套的函数更能够体现出闭包的特性，请看下面的例子：

	var generateClosure = function() {
		var count = 0;
		var get = function() {
				count ++;
				return count;
			};
		return get;
	};
	var counter = generateClosure();
	console.log(counter()); // 输出 1
	console.log(counter()); // 输出 2
	console.log(counter()); // 输出 3

按照通常命令式编程思维的理解， count 是generateClosure 函数内部的变量，它的生命周期就是 generateClosure 被调用的时期，当 generateClosure 从调用栈中返回时， count 变量申请的空间也就被释放。问题是，在generateClosure调用结束counter() 却引用了“已经释放了的” count变量，而且非但没有出错，反而每次调用 counter() 时还修改并返回了 count 。

这正是所谓闭包的特性。当一个函数返回它内部定义的函数时，就形成了闭包，闭包不但包括被返回的函数，还包括这个函数的定义环境。我们可以理解为，在 generateClosure() 返回 get 函数时，私下将 get 可能引用到的 generateClosure() 函数的内部变量（也就是 count 变量）也返回了，并在内存中生成了一个副本，之后 generateClosure() 返回函数的多个闭包实例 就是相互独立的了。
在实际操作当中，闭包存在有三个必要条件：

- 作用域的嵌套
- 内部函数对外部函数变量进行了引用
- 内部函数被调用了，不论在何处被调用

#### 2.1闭包的用途
闭包有两个主要的用途，一个是实现嵌套的回调函数实现异步编程，二是隐藏对象的细节实现模块儿化编程
1. 由于闭包机制的存在，即使外层函数执行完毕，其作用域内申请的变量也不会释放，因为里层的函数还有可能引用到这些变量，这样就完美的实现了嵌套的异步回调

###3. 对象
JavaScript 中的对象实际上就是一个由属性组成的关联数组，属性由名称和值组成，值的类型可以是任何数据类型，或者函数和其他对象。注意 JavaScript 具有函数式编程的特性,所以函数也是一种变量，大多数时候不用与一般的数据类型区分

#### 3.1 对象的创建方式
1. 属性追加
```
	var foo = {};
	foo.prop_1 = 'bar';
	foo.prop_2 = false;
	foo.prop_3 = function() {
		return 'hello world';
	}
	console.log(foo.prop_3());
```

使用关联数组的方式创建对象
```
	var foo = {};
	foo['prop1'] = 'bar';
	foo['prop2'] = false;
	foo['prop3'] = function() {
		return 'hello world';
	}
	console.log(foo.prop_3());
```
在 JavaScript 中，使用句点运算符和关联数组引用是等价的，也就是说任何对象（包括this 指针）都可以使用这两种模式。使用关联数组的好处是，在我们不知道对象的属性名称的时候，可以用变量来作为关联数组的索引
2. 对象字面量
```
	var foo = {
	'prop1': 'bar',
	prop2: 'false',
	prop3: function (){
		return 'hello world';
		}
	};
```
这种定义方法称为对象的初始化器，注意，使用初始化器时，对象属性名称是否加引号是可选的，除非属性名称中有空格或者其他可能造成歧义的字符，否则没有必要使用引号。
3. 构造函数
构造函数的方式，可以允许我们多个规划好的对象

#### 3.2上下文对象
在 JavaScript 中， 上下文对象就是 this 指针，即被调用函数所处的环境。上下文对象的作用是在一个函数内部引用调用它的对象本身， JavaScript 的任何函数都是被某个对象调用的，包括全局对象，所以 this 指针是一个非常重要的东西。this指针不属于任何函数，而是函数被调用时的所属对象。
JavaScript 中，本质上，函数类型的变量是指向这个函数实体的一个引用，在引用之间赋值不会对对象产生复制行为。我们可以通过函数的任何一个引用调用这个函数，不同之处仅仅在于上下文。

	var someuser = {
	name: 'byvoid',
	func: function() {
			console.log(this.name);
		}
	};
	var foo = {
		name: 'foobar'
	};
	someuser.func(); // 输出 byvoid
	foo.func = someuser.func;
	foo.func(); // 输出 foobar
	name = 'global';
	func = someuser.func;
	func(); // 输出 global

	仔细观察上面的例子，使用不同的对象引用来调用同一个函数时，this指针永远是这个引用所属的对象,在前面的章节中我们提到了 JavaScript 的函数作用域是静态的，也就是说一个函数的可见范围是在预编译的语法分析中就可以确定的，而上下文对象则可以看作是静态作用域的补充。

1. call和apply
在 JavaScript 中， call 和 apply 是两个神奇的方法，但同时也是容易令人迷惑的两个方法，call 和 apply 的功能是以不同的对象作为上下文来调用某个函数。简而言之，就是允许一个对象去调用另一个对象的成员函数。乍一看似乎很不可思议，而且容易引起混乱，但其实**javascript当中并没有严格的所谓成员函数的概念，函数与对象的所属关系只有在调用的时候才展现出来**
call 和 apply 的功能是一致的，两者细微的差别在于 call 以参数表来接受被调用函
数的参数，而 apply 以数组来接受被调用函数的参数。
- func.call(thisArg, arg1[, arg2[, ...]])
- func.apply(thisArg, argsArray])

```	
	var someuser = {
	name: 'irick',
	display: function(words) {
			console.log(this.name + ' says ' + words);
		}
	};
	var foo = {
		name: 'foobar'
	};
	someuser.display.call(foo, 'hello'); // 输出 foobar says hello
```
2. bind方法
 bind 方法来永久地绑定函数的执行上下文，使其无论被谁调用，上下文对象都是固定的。 
	- func.bind(thisArg[, arg1[, arg2[, ...]]])

```

	var someuser = {
		name: 'irick',
		func: function() {
			console.log(this.name);
		}
	};
	var foo = {
		name: 'foobar'
	};
	foo.func = someuser.func;
	foo.func(); // 输出 foobar
	foo.func1 = someuser.func.bind(someuser);
	foo.func1(); // 输出 irick
	func = someuser.func.bind(foo);
	func(); // 输出 foobar
	func2 = func;
	func2(); // 输出 foobar


	bind 方法还有一个重要的功能：绑定参数表，如下例所示。
	var person = {
		name: 'irick',
		says: function(act, obj) {
			console.log(this.name + ' ' + act + ' ' + obj);
		}
	};
	person.says('loves', 'kciri'); // 输出 irick loves kciri
	byvoidLoves = person.says.bind(person, 'loves');
	byvoidLoves('you'); // 输出 irick loves you
```

#### 3.3 原型

原型是 JavaScript 面向对象特性中重要的概念，在绝大多数的面向对象语言中，对象是基于类的（例如 Java 和 C++ ），对象是类实例化的结果。而在JavaScript 语言中，没有类的概念①，对象由对象实例化。打个比方来说，基于类的语言中类就像一个模具，对象由这个模具浇注产生，而基于原型的语言中，原型就好像是一件艺术品的原件，我们通过一台 100% 精确的机器把这个原件复制出很多份。

通过原型构造对象：

	function Person() {}
	Person.prototype.name = 'BYVoid';
	Person.prototype.showName = function () {
		console.log(this.name);
	};
	var person = new Person();
	person.showName();

上面这段代码使用了原型而不是构造函数初始化对象。这样做与直接在构造函数内定义属性有什么不同呢？
- ***构造函数内定义的属性继承方式与原型不同，子对象需要显式调用父对象才能继承构
造函数内定义的属性。***
- ***构造函数内定义的任何属性，包括函数在内都会被重复创建，同一个构造函数产生的
两个对象不共享实例。***
- ***构造函数内定义的函数有运行时闭包的开销，因为构造函数内的局部变量对其中定义
的函数来说也是可见的。***

下面这端代码能够验证以上问题：
```

function Foo() {
	var innerVar = 'hello';
	this.prop1 = 'BYVoid';
	this.func1 = function(){
		innerVar = '';
	};
}
Foo.prototype.prop2 = 'Carbo';
Foo.prototype.func2 = function () {
	console.log(this.prop2);
};
var foo1 = new Foo();
var foo2 = new Foo();
console.log(foo1.func1 == foo2.func1); // 输出 false
console.log(foo1.func2 == foo2.func2); // 输出 true

```
尽管如此，并不是说在构造函数内创建属性不好，而是两者各有适合的范围。那么我们什么时候使用原型，什么时候使用构造函数内定义来创建属性呢？
- 除非必须用构造函数闭包，否则尽量用原型定义成员函数，因为这样可以减少开销。
- 尽量在构造函数内定义一般成员，尤其是对象或数组，因为用原型定义的成员是多个实例共享的。

#### 3.4 原型链
JavaScript 中有两个特殊的对象， Object 与 Function，它们都是构造函数，用于生成对象。Object.prototype 是所有对象的祖先， Function.prototype 是所有函数的原型，包括构造函数。我把 JavaScript 中的对象分为三类，一类是用户创建的对象，一类是构造函数对象，一类是原型对象。用户创建的对象，即一般意义上用 new 语句显式构造的对象。构造函数对象指的是普通的构造函数，即通过 new 调用生成普通对象的函数。原型对象特指构造函数 prototype 属性指向的对象。这三类对象中每一类都有一个__proto__ 属性，它指向该对象的原型，从任何对象沿着它开始遍历都可以追溯到 Object.prototype。构造函数对象有prototype 属性，指向一个原型对象，通过该构造函数创建对象时，被创建对象的 __proto__ 属性将会指向构造函数的 prototype 属性。原型对象constructor属性，指向它对应的构造函数。让我们通过下面这个例子来理解原型：

```
function Foo() {}
Object.prototype.name = 'My Object';
Foo.prototype.name = 'Bar';
var obj = new Object();
var foo = new Foo();
console.log(obj.name); // 输出 My Object
console.log(foo.name); // 输出 Bar
console.log(foo.__proto__.name); // 输出 Bar
console.log(foo.__proto__.__proto__.name); // 输出 My Object
console.log(foo. __proto__.constructor.prototype.name); // 输出 Bar
```
![](http://i.imgur.com/cNTBzq9.png)


在 JavaScript 中，继承是依靠一套叫做原型链（prototype chain）的机制实现的。属性继承的本质就是一个对象可以访问到它的原型链上任何一个原型对象的属性。



