## AngularJS笔记
	AngularJS 应用组成如下：
	View(视图), 即 HTML。
	Model(模型), 当前视图中可用的数据。
	Controller(控制器), 即 JavaScript 函数，可以添加或修改属性。
	scope 是模型。
	scope 是一个 JavaScript 对象，带有属性和方法，这些属性和方法可以在视图和控制器中使用。
	指令和表达式都可以访问域模型对象中的属性和方法, 例：ng-model="name", {{name}}
	控制器通过影响模型中数据，来实时修改页面中的数据，模型和视图中的数据存在双向绑定关系

### ng-app指令
	这个指令用来表示angulajs根域模型对象的作用范围，当页面构建完毕，该指令会调用对应的模型构造函数来生成根对象
	接收来自angularjs作用范围的页面数据，单向数据流

* ng-model指令
	```
	ng-model 指令用于绑定应用程序数据到 HTML 控制器(input, select, textarea)的值。
	```
	- ng-model 指令可以将输入域的值与 AngularJS 创建的变量绑定。
	- 双向绑定，在修改输入域的值时， AngularJS 属性的值也将修改
	- ng-model 指令可以为应用数据提供状态值(invalid, dirty, touched, error):
	- ng-model 指令基于它们的状态为 HTML 元素提供了 CSS 类
		* ng-model 指令根据表单域的状态添加/移除以下类：
		* ng-empty
		* ng-not-empty
		* ng-touched
		* ng-untouched
		* ng-valid
		* ng-invalid
		* ng-dirty
		* ng-pending
		* ng-pristine
* ng-show
	`用来验证用户输入，提示信息会在ng-show属性返回true的情况下显示`
		<form ng-app="" name="myForm">
   		Email:<input type="email" name="myAddress" ng-model="text">
    	   <span ng-show="myForm.myAddress.$error.email">不是一个合法的邮箱地址</span>
		</form>
* $scope(作用域)
		Scope(作用域) 是应用在 HTML (视图) 和 JavaScript (控制器)之间的纽带。
		Scope 是一个对象，有可用的方法和属性。
		Scope 可应用在视图和控制器上。
	* 当你在 AngularJS 创建控制器时，你可以将 $scope 对象当作一个参数传递(依赖注入)
	* 控制器中的属性对应了视图上的属性
	* 如果你修改了视图，模型和控制器也会相应更新
	* 所有的应用都有一个 $rootScope，它可以作用在 ng-app 指令包含的所有 HTML 元素中。
* ng-repeat指令
		重复当前指令所在的元素n次

### AngularJS 控制器
	AngularJS 控制器 控制 AngularJS 应用程序的数据。
	AngularJS 控制器是常规的 JavaScript 对象。
	初始化全局或者局部域模型对象
	ng-controller 指令定义了应用程序控制器。

### AngularJS 过滤器
* currency 过滤器
* lowercase
* uppercase
* limitTo `用来过滤普通数组，arr in arrs | limitTo : 3 : 2` `表示从索引为2处开始过滤3条数据`
* filter `用来过滤对象数组，person in persons | filter : {$ : hello}` `表示含有hello的所有属性`
* orderBy`用来排序数组，根据对象属性或者普通数据进行倒叙正序排列数组`
* 自定义过滤器，过滤器返回一个函数，过滤器参数是被遍历的当前数组中的元素
### 常用指令
	0. ng-app
	1. ng-model
	2. ng-controller
	3. ng-init
	4. ng-click
	5. ng-repeat
	6. ng-bind : 如果{{}}的数据需要直接显示到页面上, 使用此指令代替
	7. ng-show
	8. ng-hide


		注意：控制器可以修改和初始化作用域当中的数据，但是域模型对象并不属于控制器，我们在定义控制器的
		时候将域模型对象显式注入到控制器内部，我们需要显式的定义控制器的构造函数，由angular应用自动实例化控制器对象，在指令编译和连接阶段，我们也可以对域模型对象的属性进行初始化

### 服务(Service)

1. 声明式依赖注入就是一种对内置服务的引用
		$rootScope, $scope, $routParams, $filter, $timeout, $interval 
2. 控制器不断检查注入其中的域模型对象中数据进行脏数据检查，来实时的更新view中的数据，js原生代码中对域模型对象数据的修改，angular不会对其中数据的修改进行脏数据检查

3. 自定义服务的几种方式：
	* factory() : 工厂函数，可以返回对象或者函数
	* service() ： 只能是一个构造函数，由angular自动生成对象
	* value() ：变量绑定
	* constant()　：　常量绑定
	* provider()　: 固定格式： this.$get()， 由函数内生成对象

### 自定义指令(directer)
	
	angular.module('moduleName', []).directe('directeName', function(){ //工厂函数，返回指令的配置信息
		return {
			restrict : 'ECMA',  //表示指令的访问方式，标签，属性，类，注释的方式
			templateUrl : 'test.html'   //指令覆盖的页面视图，也就是在视图中的作用范围
			template : '<p>hello world</p>'
			replace : true, //使用模版替换标签
			transclude : true/false, //是否保留原有标签体
			priority : 10 //优先解析该指令
			terminal : true/false //是否终止优先级较低指令的解析
			scope： false //使用上层指令作用域
			scope :	true	//开辟新的作用域，并继承外部作用域，可以访问上级作用域中的数据
			scope : {
									模板中需要显示： {{msg}}
						msg : '@'     <my-directive msg='tt'>    --->tt
						msg ： '='    <my-directive msg='tt/tt()'>	 ---->将tt作为表达式， 从外部作用域中取对应的属性显示
						模板中需要显示： {{msg({name:'Tom'})}}
						msg : '&'     <my-directive msg='tt(name)'>  ---->将tt(name)作为表达式, 从外部作用域中取对应的方法调用来显示
						
					}  //开辟隔离作用域，外部数据不可见，开辟自己的作用域
			link : function(scope, elements, attr, controller){
				
			}//使用外部模版文件时，必须要连接，使得指令和模版关联起来，才可以相互更新
			require : 找外部指令的controller对象, 并注入link中来
		}
	})//工厂函数，返回指令的域模型对象，和控制器

### 视图与路由
	
	路由： 根据请求资源路径显示对应的页面，常用来做单页面应用spa，angular页面路由，请求路径需以#开头
	<ng-view></ng-view>用来显示包含不同页面的容器，路由资源会将该标签替换，来显示页面。局部html片段替换，不会刷新整个页面，若有数据更新，那么数据请求全部是ajax请求

	angular.module('myApp', ['ngRoute']).config(function($routeProvider){
		$routeProvider
		.when('/aa', {
			templateUrl : 'aa.html',
			controller : 'AController'
		})
		.when('/bb', {
			templateUrl : 'bb.html',
			controller : 'BController'
		})
		.otherwise('/aa')
	}).controller('AController', function($scope){
	
	}).controller('Bcontroller', function($scope){
		
	})


### Angular对象常用方法
	    module() : 创建模型对象
        element() : 将dom对象/html标签包装为jQuery对象
        forEach() : 遍历数组和元素集合伪数组
        toJson()和fromJson() : js对象与Json字符串相互转换
        isArray(),isObject(),isFunction() : 类型判断
        lowercase()和uppercase() : 大小写转换
        bootstrap() : 编码启动angular, 代替ng-app
### module对象常用方法
		创建module对象:
        angular.module(name, [])
    	使用module对象:

        controller() : 定义控制器
        factory() : 定义服务对象
        service() : 定义服务对象
        provider() : 定义服务对象
        value() : 定义简单值服务
        constant() : 定义常量服务
        filter() : 定义过滤器
        directive() : 定义指令
        run() :
        config() : 指定做一些配置的回调函数


### 总结

1. 指令和表达式都可以直接访问域模型对象中的属性和方法
	- ng-app指令定义了AngularJS应用程序的根元素
	- ng-init指令为Angular应用程序定义了初始值，通常不会使用该指令初始化模型对象中的数据，而是使用控制器或模型对象来初始化数据
	- ng-model指令, 双向数据绑定，将模型对象中的属性和视图中的表单输入域建立对应关系
		- 为应用程序提供类型验证(number email required)
		- 为应用程序数据提供状态值(invalid, dirty,touched,error)
	- ng-repeat，根据迭代的数组元素个数，克隆当前元素		


