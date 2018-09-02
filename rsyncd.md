 ### Rsunc configuration file `(通用配置文件，可以在不同的模块当中覆盖掉)`
  2 motd file=/etc/rsyncd.motd `rsync服务器介绍`
  3 read>list=yes
  4 uid=root  `发送文件给rsync服务器上那个用户`
  5 gid=root `发送文件给rsync服务器上那个组`
  6 use chroot=no
  7 max connections=5
  8 use chroot `在传输文件之前，服务器守护程序在将chroot 到文件系统的目录中`
  8 log file=/var/log/rsyncd.log 
  9 pid file=/var/run/rsyncd.pid `进程记录文件，用来停止启动rsync服务`
 10 lock file=/var/run/rsync.lock
 11 
 ###Remote sync configuration module
 [testsync] `模块名`
 comment=testsync directory `模块作用说明`
 path=/home/haiping/testhello `模块对应的同步文件夹路径`
 read only=no `是否只读，允许不允许进行文件同步`
 auth users = root  `认证用户是root  ，是必须在服务器上存在的用户`
 list=yes `思是把rsync 服务器上提供同步数据的目录在服务器上模块是否显示列出来`

