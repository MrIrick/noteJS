#IE6下fixed失效问题
## overflow
   - overflow 有三个属性
	- scroll 出现滚动条，不管内容有没有溢出都会出现难看的滚动条边框
	- auto 只有内容溢出时才会出现
	- hidden 溢出的内容会被隐藏，且滚动条被禁止出现
- overflow 设置给 html 或者 body
		<style>
		#box1{
            border: 1px solid #fab;
            width: 200px;
            height: 3000px;
            background-color: #bfa;
        }
		/*body{
            border:1px solid #000000;
            height:300px;
            margin:50px;
            overflow:scroll;
        }*/
		html{
            border:1px solid #000000;
            height:300px;
            margin:50px;
            overflow-x:auto;
        }
		</style>
		<div id="box1"></div>  
从浏览器渲染的效果看，当单独给html或者body设置overflow属性时，滚动条并没有加在html或body本身上，而是加到了document上。
但是，当同时给body和html添加overflow属性时，滚动条加在了body上。
## 利用overflow加absolute模拟fixed
		<style>
		*{
			marign: 0; padding: 0;
		}
		#box{
			width: 100px;
			height: 100px;
			background-color: #fab;
			position: absolute;
			left: 50px;
			top: 50px;
		}
		html{
			height: 100%; // 让html的高等于初始包含块
			overflow: hidden; // 禁掉系统自带的滚动条
		}
		body{
			height: 100%: // 让body的高等于html，最终让body等于初始包含块
			overflow: auto; // 同时开启body的overflow，把滚动条加到body上
			margin: 0; // 默认外边距清除
		}
		</style>
		<div id="box"></div>
		<div style="height:2000px"></div>  
首先通过两次`height: 100%`，让body等于初始包含块，然后禁掉系统默认滚动条的同时，开启body的滚动条。开启元素的`position:absolute`，此时元素就相对初始包含块定位，当把body往下拉时，拖动时拖动的是body，没有拖动初始包含块，元素不动
##用absolute加js模拟fixed
		<style>
		*{
			margin: 0; padding:0;
		}
		#box{
			width: 100px;
			height: 100px;
			background-color: #fab;
			position: absolute;
			left: 50px;
			top: 50px;
		}
		</style>
		<div id="box"></div>
		<div style="height:2000px"></div>
		<script src="text/javascript">
			var box = document.getElementById('box');
			window.onscroll = function(){
				left = document.documentElement.scrollLeft || document.body.scrollLeft;
				top = document.documentElement.scrollTop || document.body.scrollTop;
				box1.style.left = 50 + left + 'px';
				box1.style.top = 50 + top + 'px';
			}
		</script>  
动态的计算出滚动条滚动的距离，也就是body往上走的距离，让后把这个距离添加给absolute的元素，让它跟着移动相应距离。

