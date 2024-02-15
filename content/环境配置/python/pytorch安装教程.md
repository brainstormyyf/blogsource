---
type: docs
title: Pytorch安装教程
linkTitle: Pytorch安装教程
description: ""
date: 2024-02-15T16:19:16+08:00
draft: false
nav_weight: 4
series:
  - 环境配置
tags:
  - pytorch
images: 
authors:
  - YYF
---
PyTorch环境搭建（windows版）
<!--more-->

首先确定自己电脑上是否有nvidia的显卡（就是游戏显卡RTX3050，RTX3060......这些，必须是nvidia的显卡）

如果自己电脑上没有显卡，就配置cpu版的pytorch即可。安装cpu版的pytorch参考步骤1，4，如果自己电脑上有gpu,就安装gpu版的pytorch，参考步骤1，2，3。

## 1.Anaconda安装

anaconda是python的包管理器，可以很方便的管理不同项目的python环境，解决不同项目python包的环境冲突问题。

TIPS：我们做python项目时要养成良好的习惯，不同的python项目要采取不同的python虚拟环境，不同的虚拟环境之间相互隔离，python版本和包均不共用。python虚拟环境的创建和管理常用anaconda.

安装步骤： 1、官网下载安装包：[https://www.anaconda.com/distribution/](https://link.zhihu.com/?target=https%3A//www.anaconda.com/distribution/) 2、运行并选择安装路径，等待安装完成。(要记得勾选 Add Anaconda to the system PATH environment variable，是为了将Anaconda添加到环境变量中。是的它显示不建议你这样做，但我建议你这样做，要不然还要自己手动把他添加到环境变量里)

![62w0u?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/62w0u.webp?width=500px#center)

3、查看是否安装成功，cmd中输入conda回车，是否出现如下信息，有则说明安装成功。

![oxizd?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/oxizd.webp?width=500px#center)

  

## 2.CUDA与CuDNN安装

### (1)先检查自己的电脑所支持的CUDA版本是多少。

桌面右键点击进去NVIDIA控制面板，找到左下角的系统信息，点击组件，出现如下界面。

![1l3bp?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/1l3bp.webp?width=500px#center)

  

从NVCUDA.DLL 这一行后面的CUDA 11.4说明我的电脑所支持的最高版本是11.4。

### (2)官网下载相对应的CUDA: 
([https://developer.nvidia.com/cuda-toolkit-archive](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/cuda-toolkit-archive))

![ysz87?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/ysz87.webp?width=500px#center)

我所支持的版本是11.4，所以我下载的是红色箭头所标出的那行。点击以后出现如下页面，选择第一个下载即可。

![ujskz?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/ujskz.webp?width=500px#center)

下载完成后，在所在的文件夹下运行安装即可。 然后查看CUDA是否安装成功： cmd中运行到安装的文件目录下：

cd C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v10.1\bin

然后执行nvcc -V，查看是否出现如下信息，有则说明CUDA安装成功。

![mdsh9?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/mdsh9.webp?width=500px#center)

如果输入nvcc -V 出现错误，考虑是否将Anaconds加入环境变量PATH中。

![00p67?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/00p67.webp?width=500px#center)

![mddct?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/mddct.webp?width=500px#center)

### (3)安装相对应版本的cuDNN。

进入官网： [https://developer.nvidia.com/rdp/cudnn-download](https://link.zhihu.com/?target=https%3A//developer.nvidia.com/rdp/cudnn-download) 需要注册并登录账号（这个需要一段时间），然后选择相对应的版本下载。

  

![5wqw5?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/5wqw5.webp?width=500px#center)

![8nx55?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/8nx55.webp?width=550px#center)

我的是CUDA11.4，所以我选择的是第一个。等待下载完成后进行解压，得到一个cuda文件夹，进入之后，全选，复制到之前CUDA所安装的文件夹下，有重复的进行替换即可。

![6vugq?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/6vugq.webp?width=500px#center)

查看cuDNN是否安装成功： 步骤如下：（进入安装的路径）

![z412s?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/z412s.webp?width=500px#center)

出现如下Result = PASS 说明cuDNN安装成功。

可以再接着执行deviceQuery.exe，如果出现Result = PASS 说明CUDA和cuDNN都已经安装成功了。

![4wyyk?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/4wyyk.webp?width=500px#center)

## **3.gpu版Pytorch安装**

（1）先配置torch环境。

先打开Anaconda Prompt(anaconda)

![kxltq?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/kxltq.webp?width=450px#center)

下面我们分析一下anaconda prompt每一条命令行的结构。（base）指的是当前所在的python环境是base环境。C:UsersYYF>指的是当前anaconda prompt所在的文件夹位置，我们要执行相关指令只需要在>后面输入指令，回车运行即可。

![n1gqy?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/n1gqy.webp?width=300px#center)

然后我们然后输入

```bash
conda env list
```

![kp7kd?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/kp7kd.webp?width=500px#center)

这条语句会显示出当前已存在的python虚拟环境，如果是刚安装anaconda,应该只有一个base基环境。

下面我们新建立一个python虚拟环境(命名为new)

```text
conda create –n new python=3.9.10
```

-n就相当于参数--name,上面这条语句也可改为conda create --name python=3.9.10

(这儿python=xxx可以自己指定python版本，这儿的new是你所创建的虚拟环境的名称，大家可以自己取)

**然后激活环境：** 在anaconda prompt中输入：

```bash
conda activate new
```

此时我们可以看到（）里面已经变为new，说明我们已经进入new这个虚拟环境。

![xymr0?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/xymr0.webp?width=300px#center)

此时再进行python包的安装就是对这个虚拟环境操作，比如我们 pip install numpy（或者 conda install numpy）,再输入

```bash
conda list     # 显示当前虚拟环境的所有包环境
```

![b0gmv?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/b0gmv.webp?width=500px#center)

此时我们看到new这个虚拟环境里面已经有numpy这个包了。

（2）pytorch的安装

法一：打开pytorch官网：[https://pytorch.org/get-started/locally/](https://link.zhihu.com/?target=https%3A//pytorch.org/get-started/locally/)（pytorch当前建议版本）或者 [https://pytorch.org/get-started/previous-versions/](https://link.zhihu.com/?target=https%3A//pytorch.org/get-started/previous-versions/) （pytorch的老版本）找到自己所对应版本的使用conda命令安装即可（会慢一些，但建议新手这样做）。

![9sd6w?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/9sd6w.webp?width=550px#center)

法二：进入如下网址：[https://download.pytorch.org/whl/torch_stable.html](https://link.zhihu.com/?target=https%3A//download.pytorch.org/whl/torch_stable.html)，下载自己所需要的torch和torchvision。 可以按快捷键ctrl+F进行搜索。 （不建议新手这样做）

![8wrnx?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/8wrnx.webp?width=500px#center)

  

（3）等待安装完成。 **查看pytorch环境是否安装成功：**

![nv6rd?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/nv6rd.webp?width=500px#center)

要记得先进入之前创建的环境中，然后依次输入蓝色方格中的代码，没有报错，且最后输出True，则说明pytorch环境安装完成。

  

## 4.cpu版PyTorch安装

（1）先配置torch环境。

先打开Anaconda Prompt(anaconda)

![axqyz?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/axqyz.webp?width=450px#center)

  

下面我们分析一下anaconda prompt每一条命令行的结构。（base）指的是当前所在的python环境是base环境。C:UsersYYF>指的是当前anaconda prompt所在的文件夹位置，我们要执行相关指令只需要在>后面输入指令，回车运行即可。

![qt9gz?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/qt9gz.webp?width=300px#center)

然后我们然后输入

```bash
conda env list
```

![s7z0h?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/s7z0h.webp?width=500px#center)

这条语句会显示出当前已存在的python虚拟环境，如果是刚安装anaconda,应该只有一个base基环境。

下面我们新建立一个python虚拟环境(命名为new)

```bash
conda create –n new python=3.9.10
```

-n就相当于参数--name,上面这条语句也可改为conda create --name python=3.9.10

(这儿python=xxx可以自己指定python版本，这儿的new是你所创建的虚拟环境的名称，大家可以自己取)

**然后激活环境：** 在anaconda prompt中输入：

```bash
conda activate new
```

此时我们可以看到（）里面已经变为new，说明我们已经进入new这个虚拟环境。

![vkox4?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/vkox4.webp?width=300px#center)

此时再进行python包的安装就是对这个虚拟环境操作，比如我们 pip install numpy（或者 conda install numpy）,再输入

```bash
conda list     # 显示当前虚拟环境的所有包环境
```

![xmd5u?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/xmd5u.webp?width=500px#center)

此时我们看到new这个虚拟环境里面已经有numpy这个包了。

（2）pytorch的安装

打开pytorch官网：[https://pytorch.org/get-started/locally/](https://link.zhihu.com/?target=https%3A//pytorch.org/get-started/locally/)（pytorch当前建议版本）或者 [https://pytorch.org/get-started/previous-versions/](https://link.zhihu.com/?target=https%3A//pytorch.org/get-started/previous-versions/) （pytorch的老版本）找到自己所对应版本的使用conda命令安装即可（会慢一些，但建议新手这样做）。

![me3vp?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/me3vp.webp?width=500px#center)

（3）等待安装完成。 **查看pytorch环境是否安装成功：**

![w7nq1?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/python/pytorch%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B/w7nq1.webp?width=500px#center)

要记得先进入之前创建的环境中，然后依次输入蓝色方格中的代码，没有报错，则说明pytorch环境安装完成。

参考资料：
[深度学习 | NVIDIA 开发者](https://developer.nvidia.cn/deep-learning)
[浅析三种Anaconda虚拟环境创建方式和第三方包的安装-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1769692)
[《PyTorch深度学习实践》完结合集_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1Y7411d7Ys/?spm_id_from=333.337.search-card.all.click)
[PyTorch](https://pytorch.org/)