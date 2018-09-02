## HTML5特点

1. 用于即时 2D 绘图的 Canvas 标签
2. 定时媒体回放
3. 离线数据库存储
4. 文档编辑
5. 拖拽控制
6. 浏览历史管理

### HTML 5 有两大特点:
* 首先，强化了 Web 网页的表现性能。除了可描绘二维图形外，还准备了用于播放视频和音频的标签。
* 其次，追加了本地数据库等 Web 应用的功能。
* HTML5最激动人心的地方：
全新的，更合理的 Tag，多媒体对象将不再全部绑定在 object 或 embed Tag 中，而是视频有视频的 Tag，音频有音频的 Tag。本地数据库。这个功能将内嵌一个本地的 SQL 数据库，以加速交互式搜索，缓存以及索引功能。同时，那些离线 Web 程序也将因此获益匪浅。不需要插件的富动画。 Canvas对象将给浏览器带来直接在上面绘制矢量图的能力，这意味着我们可以脱离 Flash 和 Silverlight，直接在浏览器中显示图形或动画。一些最新的浏览器，除了 IE，已经开始支持 Canvas。浏览器中的真正程序。将提供 API 实现浏览器内的编辑，拖放，以及各种图形用户界面的能力。内容修饰 Tag 将被剔除，而使用 CSS。理论上讲， HTML 5 是培育新 Web 标准的土壤，让各种设想在他的组织者之间分享，但 HTML 5 目前仍处于试验阶段
* 新特性应该基于 HTML、 CSS、 DOM 以及 JavaScript。
* 减少对外部插件的需求（比如 Flash）
* 更优秀的错误处理
* 更多取代脚本的标记
* HTML 5 应该独立于设备
* 开发进程应对公众透明

1. video&audio标签
	Internet Explorer 8 不支持 video 元素。在 IE 9 中，将提供对使用 MPEG4 的 video 元素的支持
	属性：
		autoplay : autoplay 如果出现该属性，视频在就绪后马上播放
		controls : controls 如果出现该属性，则向用户显示控件，比如播放按钮
		height：piexs 设置视频元素的高度
		loop ：　loop 视频是否循环播放，用于广告视频
		preload ：preload　	如果出现该属性，则视频在页面加载时进行加载，并预备播放。如果使用 "autoplay"，则忽略该属性
		src：要播放的视频路径
		width：　视频元素的宽度

2. Canvas
	canvas 元素用于在网页上绘制图形。HTML 5 的 canvas 元素使用 JavaScript 在网页上绘制图像。canvas 元素本身是没有绘图能力的。所有的绘制工作必须JavaScript 内部完成：
3. Web存储, HTML5提供了两种客户端存储数据的方法：
	* localStorage 没有时间限制的存储
	* sessionStorage  针对一个session对象的数据存储
之前，这些都是由 cookie 完成的。但是 cookie 不适合大量数据的存储，因为它们由每个对服务器的请求来传递，这使得 cookie 速度很慢而且效率也不高,在 HTML5 中，数据不是由每个服务器请求传递的，而是只有在请求时使用数据。它使的在不影响网站性能的情况下存储大量数据成为可能。
	localStorage.lastName = 'helloworld' ; //设值
	var value = localStorage.lastName ;  //取值


4. H5新的表单属性
	* form属性：
		- autocomplete
		- novalidate
	* input属性：
		- autocopmlete
		- autofocus
		- form  `属性规定输入域所属的一个或多个表单。`
		- form overrides (formaction, formenctype, formmethod, formnovalidate, formtarget)
		- height和width
		- list
		- min， max, step
		- multiple
		- pattern(regexp)
		- placeholder
		- required
		- 

