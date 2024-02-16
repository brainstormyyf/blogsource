---
type: docs
title: Pip设置代理
linkTitle: Pip设置代理
description: ""
date: 2024-02-15T16:08:16+08:00
draft: false
nav_weight: 2
series:
  - 环境配置
tags:
  - python
images: 
authors:
  - YYF
---

<!--more-->

在使用github等网站时，我们有时会遇到访问不稳定或无法访问的问题。这时，很多人会选择使用代理来解决问题。但挂上代理之后，我们仍然可能会遇到一个新问题：在命令行中进行下载或配置时，网络问题依然存在。比如，使用pip进行软件包的下载和安装（pip install -r requirements.txt），或者使用git进行代码的下载(git clone ,git push)，都可能因为网络问题而受阻。在我确认已经打开了全局代理的情况下，仍然出现了网络问题，这说明使用命令行进行的操作并没有走代理。

有三种常用方式：

#### ①永久设置：

**linux系统下：**

```bash
vim /etc/profile：
    export http_proxy='http://代理服务器IP:端口号'
    export https_proxy='http://代理服务器IP:端口号'
source /etc/profile
```

**windows系统下：**

在C:\User\用户目录下，新建pip文件夹，然后在该文件夹下新建pip.ini文件。填写如下内容：

```txt
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
proxy     = http://XXXX.com:port
[install]
trusted-host=pypi.tuna.tsinghua.edu.cn
```

#### ②临时设置（重连后失效）：

可以直接在此次命令行窗口运行:

```bash
export http_proxy='http://代理服务器IP:端口号'
export https_proxy='http://代理服务器IP:端口号'
```

注意：设置之后可能使用ping时还是无法连接外网，但是pip时可以的，因为ping的协议不一样不能使用这个代理

#### ③单次设置：

直接在pip时设置代理也是可以的：

```bash
pip install -r requirements.txt --proxy=代理服务器IP:端口号
```