原文技术胖的 nginx [技术胖 专注于前端开发](https://jspang.com/posts/2018/10/05/nginx.html)

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

## 自定义错误页和访问设置

多错误指向一个页面

在/etc/nginx/conf.d/default.conf 是可以看到下面这句话的

`error_page 500 502 503 504 /50x.html;`

error_page 指令用于自定义错误页面，500，502，503，504 这些就是 HTTP 中最常见的错误代码，/50.html 用于表示当发生上述指定的任意一个错误的时候，都是用网站根目录下的/50.html 文件进行处理。

单独为错误置顶处理方式

`error_page 404 /404_error.html;`

新建一个 404_error.html 文件

```
<html>
   <meta charset="UTF-8">
   <body>
   <h1>404页面没有找到!</h1>
   </body>
   </html>
```

然后将/etc/nginx/nginx.conf 中注释一句话

`#include /etc/nginx/sites-enabled/*;`
  
然后重启我们的服务，再进行访问，你会发现 404 页面发生了变化。

#### 简单实现访问控制

有时候我们的服务器只允许特定主机访问，比如内部 OA 系统，或者应用的管理后台系统，更或者是某些应用接口，这时候我们就需要控制一些 IP 访问，我们可以直接在 location 里进行配置。

可以直接在 default.conf 里进行配置。

```
location / {
           deny   123.9.51.42;
           allow  45.76.202.231;
       }
```

## Nginx 访问权限详讲

Nginx 访问中，deny 是禁止访问，allow 是允许访问。

#### 指令优先级

```
location / {
           allow  45.76.202.231;
           deny   all;
       }
```

上面的配置表示只允许 45.76.202.231 进行访问，其他的 IP 是禁止访问的。但是如果我们把 deny all 指令，移动到 allow 45.76.202.231 之前，会发生什么那？会发现所有的 IP 都不允许访问了。这说明了一个问题：就是在同一个块下的两个权限指令，先出现的设置会覆盖后出现的设置（也就是谁先触发，谁起作用）。

#### 复杂访问控制权限匹配

在工作中，访问权限的控制需求更加复杂，例如，对于网站下的 img（图片目录）是运行所有用户访问，但对于网站下的 admin 目录则只允许公司内部固定 IP 访问。这时候仅靠 deny 和 allow 这两个指令，是无法实现的。我们需要 location 块来完成相关的需求匹配。

```
    location =/img{
        allow all;
    }
    location =/admin{
        deny all;
    }
```

=号代表精确匹配，使用了=后是根据其后的模式进行精确匹配。

#### 使用正则表达式设置访问权限

只有精确匹配有时是完不成我们的工作任务的，比如现在我们要禁止访问所有 php 的页面，php 的页面大多是后台的管理或者接口代码，所以为了安全我们经常要禁止所有用户访问，而只开放公司内部访问的。

```
location ~\.php$ {
        deny all;
    }
```

这样我们再访问的时候就不能访问以 php 结尾的文件了

## Nginx 设置虚拟主机

虚拟主机是指在一台物理主机服务器上划分出多个磁盘空间，每个磁盘空间都是一个虚拟主机，每台虚拟主机都可以对外提供 Web 服务，并且互不干扰。在外界看来，虚拟主机就是一台独立的服务器主机，这意味着用户能够利用虚拟主机把多个不同域名的网站部署在同一台服务器上，而不必再为简历一个网站单独购买一台服务器，既解决了维护服务器技术的难题，同时又极大地节省了服务器硬件成本和相关的维护费用。

> 配置虚拟主机可以基于端口号、基于 IP 和基于域名

#### 基于端口号配置虚拟主机

原理就是 Nginx 监听多个端口，根据不同的端口号，来区分不同的网站。可以直接配置在主文件里 etc/nginx/nginx.conf 文件里， 也可以配置在子配置文件里 etc/nginx/conf.d/default.conf。

修改配置文件中的 server 选项，这时候就会有两个 server。

```
server{
        listen 8001;
        server_name localhost;
        root /usr/share/nginx/html/html8001;
        index index.html;
}
```

编在 usr/share/nginx/html/html8001/目录下的 index.html 文件并查看结果
`<h1>welcome port 8001</h1>`

输入http://192.168.254.110:8001/就可以访问了

#### 基于 IP 的虚拟主机

基于 IP 和基于端口的配置几乎一样，只是把 server_name 选项，配置成 IP 就可以了。

比如上面的配置，我们可以修改为：

```
server{
        listen 80;
        server_name 112.74.164.244;
        root /usr/share/nginx/html/html8001;
        index index.html;
}
```

#### Nginx 使用域名设置虚拟主机

1.申请一个自己的域名

2.对域名进行解析 - nginx.jspang.com :这个域名映射到默认的 Nginx 首页位置 - nginx2.jspang.com : 这个域名映射到原来的 8001 端口的位置

3. 配置以域名为划分的虚拟主机

我们修改 etc/nginx/conf.d 目录下的 default.conf 文件，把原来的 80 端口虚拟主机改为以域名划分的虚拟主机

```
server {
    listen       80;
    server_name  nginx.jspang.com;
```

我们再把同目录下的 8001.conf 文件进行修改

```
server{
        listen 80;
        server_name nginx2.jspang.com;
        location / {
                root /usr/share/nginx/html/html8001;
                index index.html index.htm;
        }
}
```

4.进行重启，这时候我们在浏览器中访问这两个网页

这里我没有服务器，只有虚拟机，用 host 凑合一下，在本机修改 host

```
192.168.254.110 nginx.jspang.com
```

http://nginx.jspang.com/
http://nginx.jspang.com:8001/

## Nginx 反向代理的设置

现在的 web 模式基本的都是标准的 CS 结构，即 Client 端到 Server 端。那代理就是在 Client 端和 Server 端之间增加一个提供特定功能的服务器，这个服务器就是我们说的代理服务器。

\*正向代理：\*\*翻墙工具，就是一个典型的正向代理工具。它会把我们不让访问的服务器的网页请求，代理到一个可以访问该网站的代理服务器上来，一般叫做 proxy 服务器，再转发给客户。简单来说就是你想访问目标服务器的权限，但是没有权限。这时候代理服务器有权限访问服务器，并且你有访问代理服务器的权限，这时候你就可以通过访问代理服务器，代理服务器访问真实服务器，把内容给你呈现出来。

**反向代理：**反向代理跟代理正好相反（需要说明的是，现在基本所有的大型网站的页面都是用了反向代理），客户端发送的请求，想要访问 server 服务器上的内容。发送的内容被发送到代理服务器上，这个代理服务器再把请求发送到自己设置好的内部服务器上，而用户真实想获得的内容就在这些设置好的服务器上。proxy 服务器代理的并不是客户端，而是服务器,即向外部客户端提供了一个统一的代理入口，客户端的请求都要先经过这个 proxy 服务器。具体访问那个服务器 server 是由 Nginx 来控制的。再简单点来讲，一般代理指代理的客户端，反向代理是代理的服务器。

#### 反向代理的用途和好处

- 安全性：正向代理的客户端能够在隐藏自身信息的同时访问任意网站，这个给网络安全代理了极大的威胁。因此，我们必须把服务器保护起来，使用反向代理客户端用户只能通过外来网来访问代理服务器，并且用户并不知道自己访问的真实服务器是那一台，可以很好的提供安全保护。
- 功能性：反向代理的主要用途是为多个服务器提供负债均衡、缓存等功能。负载均衡就是一个网站的内容被部署在若干服务器上，可以把这些机子看成一个集群，那 Nginx 可以将接收到的客户端请求“均匀地”分配到这个集群中所有的服务器上，从而实现服务器压力的平均分配，也叫负载均衡。

#### 最简单的反向代理

在 conf.d 下新建 proxy.conf

```
server{
    listen 10086;
    server_name localhost;
    location / {
            proxy_pass http://192.168.254.110:8001/;
    }
}
```

修改 8001 下的 index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h1>我是8001，我是被代理的</h1>
</body>
</html>
```

访问http://nginx.jspang.com:10086/此时页面出现的是<我是 8001，我是被代理的>

一般我们反向代理的都是一个 IP，但是我这里代理了一个域名也是可以的。

#### 其它反向代理指令

- proxy_set_header :在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。

- proxy_connect_timeout:配置 Nginx 与后端代理服务器尝试建立连接的超时时间。

- proxy_read_timeout : 配置 Nginx 向后端服务器组发出 read 请求后，等待相应的超时时间。

- proxy_send_timeout：配置 Nginx 向后端服务器组发出 write 请求后，等待相应的超时时间。

- proxy_redirect :用于修改后端服务器返回的响应头中的 Location 和 Refresh。

## Nginx 适配 PC 或移动设备

现在很多网站都是有了 PC 端和 H5 站点的，因为这样就可以根据客户设备的不同，显示出体验更好的，不同的页面了。

###### \$http_user_agent 的使用：

Nginx 通过内置变量\$http_user_agent，可以获取到请求客户端的 userAgent，就可以用户目前处于移动端还是 PC 端，进而展示不同的页面给用户。

1.在/usr/share/nginx/目录下新建两个文件夹，分别为：pc 和 mobile 目录

```
cd /usr/share/nginx/
sudo mkdir /html/pc
sudo mkdir /html/mobile
sudo touch /html/pc/index.html /html/mobile/index.html
```

2.在 pc 和 mobile 的 index.html 中输入内容

```
 <h1>我是pc啦</h1>

 <h1>我是手机</h1>
```

3.进入 etc/nginx/conf.d 目录下，修改 8001.conf 文件，改为下面的形式:

```
server{
        listen 8001;
        server_name localhost;
        location / {
         root /usr/share/nginx/html/pc;
         if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
            root /usr/share/nginx/html/mobile;
         }
         index index.html;
        }
}
```

在本机输入http://nginx.jspang.com:8001/，然后再用device模式请求一次

## Nginx 的 Gzip 压缩配置

Gzip 是网页的一种网页压缩技术，经过 gzip 压缩后，页面大小可以变为原来的 30%甚至更小。更小的网页会让用户浏览的体验更好，速度更快。gzip 网页压缩的实现需要浏览器和服务器的支持

gzip 是需要服务器和浏览器同事支持的。当浏览器支持 gzip 压缩时，会在请求消息中包含 Accept-Encoding:gzip,这样 Nginx 就会向浏览器发送听过 gzip 后的内容，同时在相应信息头中加入 Content-Encoding:gzip，声明这是 gzip 后的内容，告知浏览器要先解压后才能解析输出。

#### gzip 的配置项

Nginx 提供了专门的 gzip 模块，并且模块中的指令非常丰富。

- gzip : 该指令用于开启或 关闭 gzip 模块。
- gzip_buffers : 设置系统获取几个单位的缓存用于存储 gzip 的压缩结果数据流。
- gzip_comp_level : gzip 压缩比，压缩级别是 1-9，1 的压缩级别最低，9 的压缩级别最高。压缩级别越高压缩率越大，压缩时间越长。
- gzip_disable : 可以通过该指令对一些特定的 User-Agent 不使用压缩功能。
- gzip_min_length:设置允许压缩的页面最小字节数，页面字节数从相应消息头的 Content-length 中进行获取。
- gzip_http_version：识别 HTTP 协议版本，其值可以是 1.1.或 1.0.
- gzip_proxied : 用于设置启用或禁用从代理服务器上收到相应内容 gzip 压缩。
- gzip_vary : 用于在响应消息头中添加 Vary：Accept-Encoding,使代理服务器根据请求头中的 Accept-Encoding 识别是否启用 gzip 压缩。

#### gzip 最简单的配置

```
http {
   .....
    gzip on;
    gzip_types text/plain application/javascript text/css;
   .....
}
```

gzip on 是启用 gizp 模块，下面的一行是用于在客户端访问网页时，对文本、JavaScript 和 CSS 文件进行压缩输出。

如果你是 windows 操作系统，你可以按 F12 键打开开发者工具，单机当前的请求，在标签中选择 Headers，查看 HTTP 响应头信息。你可以清楚的看见 Content-Encoding 为 gzip 类型。

## Docs

[deepin-linux 常用命令大全----每天一个 linux 命令](https://www.zcjun.com/linux/59.html)
[一个前端必会的 Nginx 免费教程](https://jspang.com/posts/2018/10/05/nginx.html#%E7%AC%AC06%E8%8A%82%EF%BC%9Anginx%E8%AE%BF%E9%97%AE%E6%9D%83%E9%99%90%E8%AF%A6%E8%AE%B2)
