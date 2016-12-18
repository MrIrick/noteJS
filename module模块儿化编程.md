## 模块儿化编程

### CMD
	CMD方式与commonjs的模块儿暴露方式相似，exports都是模块儿的外部公开接口，通过require的方式引入外
	部模块儿，得到的都是一个对象，通过该对象访问模块儿提供的方法和属性(sea.js)
1. 语法
		define(function(require, exports, module){
			var module2 = require('./module2') //同步加载模块儿
			var message = 'hello world'
			module2.showMessage()
			function sayHello()
			{
				console.log(message)
			}
			exports.showMessage = showMessage ;
			
			require.async('./module3.js', function(module3){
				module3.sayWorld();
			})
		})
2. 页面的使用方式
		
		<script type="text/javascript" src="js/libs/sea.js"></script>
    	<script type="text/javascript">
        	seajs.use('./js/modules/main')
    	</script>

### AMD

1. 语法：
		
		require.config({
			baseUrl : 'js/',
			paths : {  //模块儿名和路径的映射
				'LoginController' : 'module/LoginController',
				'angular' : 'libs/angular'
				'angularMessage' : 'angular-messages',
				'jquery' : 'libs/jQuery'
			}
			
			shim :  
			{
				angular : 
				{
					exports : 'angular'
				}
				angularMessage : 
				{
					exports : 'angularMessage'
					devs : ['angular']
				}
			}
			
		})
		define(['jquery'], function($){
			$('body').css('background-color','red')

			function sayHello()
			{
				console.log('HelloWorld');
			}

			return {sayHello}
		})

		注意： define中对于模块儿的依赖，amd的处理方式是在config中匹配，依赖模块儿名必须和映射名一致