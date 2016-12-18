		引言： 前端项目构建，目的是将所有的css，js，html等文件的体量和个数尽量减少到最少和最小，减少网络请求的发送次数和数据的容量，提高访问速度，增加用户体验，在实际开发中和测试使用的文件并不相同，时机测试奔跑的工程是经过grunt构建以后的文件

1. 初始化插件配置
2. 加载插件任务
3. 注册构建任务

	### demo

		module.exports=function(grunt)
		{
			//初始化插件配置
			grunt.initConfig({
				 concat: {
            		options: { //可选项配置
                		separator: ';'   //使用;连接合并
            			},
            		build: {
                		src: ["src/js/*.js"],  //合并哪些js文件
                		dest: "build/js/built.js" //输出的js文件
            			}
        		},
				watch : {
            		scripts : {
                		files : ['src/js/*.js', 'src/css/*.css'],
                		tasks : ['concat', 'jshint', 'uglify', 'cssmin','htmlmin'],
                		options : {spawn : false}  //增量检查
           		 	}
        		}
			})
			//加载插件任务
			grunt.loadNpmTasks('grunt-contrib-concat');
			grunt.loadNpmTasks('grunt-contrib-watch');
			
			//注册构建任务
			grunt.registerTask('default', ['concat', 'watch'])
		}