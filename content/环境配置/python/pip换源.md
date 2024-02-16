---
title: pip修改国内镜像源（临时/永久）
linkTitle: pip换源
type: docs
date: 2024-02-14T01:20:01+08:00
draft: false
images:
nav_weight: 1
series:
  - 环境配置
categories:
tags:
  - python
authors:
  - YYF
---

<!--more-->

### 1.临时换源：

**清华源**

```bash
pip install xxxx -i https://pypi.tuna.tsinghua.edu.cn/simple
```

**阿里源**

```bash
pip install xxxx -i https://mirrors.aliyun.com/pypi/simple/
```

**腾讯源**

```bash
pip install xxxx -i http://mirrors.cloud.tencent.com/pypi/simple
```

**豆瓣源**

```bash
pip install xxxx -i http://pypi.douban.com/simple/
```

**将xxxx换成需要安装的包的名字**

### 2.永久换源：

**清华源**

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

**阿里源**

```bash
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
```

**腾讯源**

```bash
pip config set global.index-url http://mirrors.cloud.tencent.com/pypi/simple
```

**豆瓣源**

```bash
pip config set global.index-url http://pypi.douban.com/simple/
```

### 3.换回默认源

```bash
pip config unset global.index-url
```
