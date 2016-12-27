## JS 事件轮训机制深入理解

众所周知，JS是单线程运行的，当我们实现功能比较复杂的逻辑或者代码中涉及大量计算的时候，会阻塞主线程的执行，用户体验不是很好，所以JS提供了基于事件的异步执行，就是可以将某一个特定功能封装到一个函数，通过事件轮训的机制来完成与主线程的交互。

1. 时间片轮转：
	时间片轮转是计算机操作系统任务调度的时间表，就是将一段时间分割成很多块，在不同的时间片内，将cpu的控制权转让给其他进程，将之前的进程挂起，等待下一次获得执行的时间片来唤醒任务继续执行。时间片轮转的概念使得计算机中的很多应用程序能够宏观上并行，就是用户不会感觉到内部cpu任务的转换，但是却可以同时打开多个应用程序而互不干扰，宏观上看上去好像可以同步执行。举个栗子，你通过qq扯淡的时候可以同时打开网易云音乐听歌。

2. 事件的轮训机制：
	我们在主线程上注册的每一个异步的回调函数，浏览器内核会有相应的模块儿（timer模块儿）来管理这些回调函数，一旦这些函数满足了触发条件，那么它就会被推入事件队列当中，当主线程上任务执行完毕，主线程在空闲的时候会不断的检查事件队列当中是否有可执行的任务，如果有的化，那么主线程会调用相应的回调函数来完成之前注册的任务。

demo1 ： 

	console.log('start') ;

	setTimeout(function(){
		console.log('hello');
	}, 200)

	setTimeout(function(){
		console.log('world') ;
	}, 300)

	console.log('end');


	如果这个一眼看出了，结果那么改动一下。

demo2 ：
	
	console.log('start');

	setTimeout(function(){
		console.log('hello');
	} , 200);
	
	setTimeout(function(){
		console.log('world');
	}, 300)

	for(var i = 0 ; i < 100000; i++)
	{
		console.log(i);
	}

	console.log('end');

	
### JS 代码的执行流程

	先看一段简单的代码：
	function A()
	{
		var a = 3 ;
		B(3) ;
	}	

	function B(num)
	{
		var newNum = num * num ;
		console.log(newNum);
	}

	A();