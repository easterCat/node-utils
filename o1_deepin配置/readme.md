## deepin

Linux Deepin 是一个基于 DEB 包管理的一个独立操作系统，和那些 Ubuntu（下个大版本是基于 debian 开发) 的衍生版仅仅只是换主题、调整 ISO 预置的软件包不同。Linux Deepin 在大量吸纳 Debian/Ubuntu 仓库的软件包之外，构建了更大的 Deepin 软件仓库。Linux Deepin 的软件仓库不但包含 Debian/Ubuntu 的软件包，还包含了大量深度原创的软件以及第三方优质软件,采用 apt-get/dpkg 包管理方式。

## deepin 安装工具 apt

deepin 的包管理器的搜索和安装分别是两个命令。搜索命令是 apt-cache search xxx ，安装命令是 apt-get install xxx

```
# 搜索软件
apt-cache search atool
# 安装软件
sudo apt-get install atool
```

> centos 中使用 yum,unbantu 使用

```
sudo apt-get install yum
```

## deepin 安裝 Nginx

安装

```
sudo apt install nginx
```

查看版本

```
nginx -v
```

打开浏览器访问 localhost:80 就可以看到 welcome come to nginx 了

## nginx 文件

#### nginx.conf

```
#运行用户，默认即是nginx，可以不进行设置
user  nginx;
#Nginx进程，一般设置为和CPU核数一样
worker_processes  1;
#错误日志存放目录
error_log  /var/log/nginx/error.log warn;
#进程pid存放位置
pid        /var/run/nginx.pid;
events {
    worker_connections  1024; # 单个后台进程的最大并发数
}
http {
    include       /etc/nginx/mime.types;   #文件扩展名与类型映射表
    default_type  application/octet-stream;  #默认文件类型
    #设置日志模式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
    access_log  /var/log/nginx/access.log  main;   #nginx访问日志存放位置
    sendfile        on;   #开启高效传输模式
    #tcp_nopush     on;    #减少网络报文段的数量
    keepalive_timeout  65;  #保持连接的时间，也叫超时时间
    #gzip  on;  #开启gzip压缩
    include /etc/nginx/conf.d/*.conf; #包含的子配置项位置和文件
```

#### default.conf

```
server {
    listen       80;   #配置监听端口
    server_name  localhost;  //配置域名
    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;
    location / {
        root   /usr/share/nginx/html;     #服务默认启动目录
        index  index.html index.htm;    #默认访问文件
    }
    #error_page  404              /404.html;   # 配置404页面
    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;   #错误状态码的显示页面，配置后需要重启
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}
    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

## nginx 操作

#### 启动 Nginx

```
systemctl start nginx.service
```

#### 查询 Nginx 服务的运行状况

```
ps aux | grep nginx
```

#### 停止 Nginx 服务的四种方法

立即停止服务
`nginx -s stop`
这种方法比较强硬，无论进程是否在工作，都直接停止进程。

从容停止服务
`nginx -s quit`
这种方法较 stop 相比就比较温和一些了，需要进程完成当前工作后再停止。

杀死进程
`killall nginx`
这种方法也是比较野蛮的，我们直接杀死进程，但是在上面使用没有效果时，我们用这种方法还是比较好的。

`systemctl stop nginx.service`
systemctl 停止

#### 重启 Nginx 服务

```
systemctl restart nginx.service
```

#### 重新载入 Nginx 配置文件

在重新编写或者修改 Nginx 的配置文件后，都需要作一下重新载入，这时候可以用 Nginx 给的命令。
`nginx -s reload`

#### 查看端口号

Nginx 启动后会监听 80 端口，从而提供 HTTP 访问。如果 80 端口已经被占用则会启动失败。我么可以使用 netstat -tlnp 命令查看端口号的占用情况

## Docs

[deepin-linux 常用命令大全----每天一个 linux 命令](https://www.zcjun.com/linux/59.html)
[一个前端必会的 Nginx 免费教程](https://jspang.com/post/nginx.html#toc-096)
