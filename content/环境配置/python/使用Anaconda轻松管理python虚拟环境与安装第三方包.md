---
type: docs
title: "使用Anaconda管理python虚拟环境与安装第三方包"
linkTitle: "使用Anaconda管理python虚拟环境"
# description: "使用Anaconda轻松管理python虚拟环境与安装第三方包"
date: 2024-02-14T01:39:18+08:00
draft: false
nav_weight: 2
series:
  - 环境配置
tags:
images:
authors:
  - YYF
---

<!--more-->

anaconda下载地址（官网）：

[Free Download | Anaconda](https://www.anaconda.com/download/)

### 一、创建Anaconda虚拟环境

#### 步骤1：打开Anaconda Prompt (终端)

![](https://pic3.zhimg.com/80/v2-a079ea1a75615aa85c20effca929edde_1440w.webp?width=600px#center)

首先，在Windows系统中，通过开始菜单或搜索找到“Anaconda Prompt”，在Mac或Linux系统中，可以在终端中直接操作。


![kk2rm?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/46354916cca521c8c1683c314f037fdb_MD5.webp?width=600px#center)

#### 步骤2：创建虚拟环境

在命令行界面输入以下命令来创建一个新的虚拟环境。这里以创建一个名为 `my_project_env`，并指定Python版本为3.9.10（请根据实际情况替换）的环境为例：

```bash
conda create --name my_project_env python=3.9.10
```

注意：此处——name和—n等效

**解决创建环境时出现的： Collecting package ... failed**

创建环境时，可能会出现以下问题

![cuzsj?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/4f6cabe7a49cd131ebc0c534b5e7e8a0_MD5.webp?width=600px#center)

问题分析：因为网络问题导致的创建失败

解决方法：多试几次，仍然失败更换国内镜像源

1. 找到C盘**用户文件夹**下的.condarc文件

![2qg2l?width=600px#center?width=600px#center](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/d3d89d55e1bab3d24ef75cf88e771a21_MD5.webp?width=600px#center)

\2. 编辑.condarc文件，替换成以下内容，保存，重新打开cmd即可

```text
ssl_verify: true
channels:
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/win-64/
  - http://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/win-64 show_channel_urls: true

```


![yteih?width=600px#center?width=600px#center](undefined)

此方法直接更换成了清华源，速度更快，更稳，通过conda向虚拟环境安装第三方包时，用的也是清华源。

#### 步骤3：激活虚拟环境

虚拟环境创建完成后，需要激活它以便在该环境中执行后续操作。激活环境的命令如下：

```bash
conda activate my_project_env
```

当你成功激活虚拟环境后，命令行提示符前通常会显示当前活动环境的名称，例如 `(my_project_env)`。

查看所有虚拟环境的命令：

```bash
conda env list
```

### 二、在虚拟环境中安装第三方包

#### 方法1：使用Conda安装

对于那些在Conda仓库中存在的包，你可以直接用 `conda install` 命令进行安装。例如，要安装numpy库：

```bash
conda install numpy
```

#### 方法2：使用pip安装

对于Conda仓库中没有或者你想从PyPI获取的包，可以使用 `pip` 在虚拟环境中安装：

```bash
pip install pandas
```

pip安装速度过慢时，可以将pip更换为国内镜像源：

#### 安装特定版本的包

如果需要安装特定版本的第三方包，只需在包名后面加上版本号即可：

```bash
conda install scipy=1.7.3  # 使用conda安装Scipy的1.7.3版本
pip install tensorflow==2.8.0  # 使用pip安装TensorFlow的2.8.0版本
```

### 三、检查已安装的包

安装完成后，可以通过下面的命令查看虚拟环境中已经安装的所有包及其版本信息：

```bash
conda list
```

或者使用pip列出所有已安装的pip包：

```bash
pip list
```

### 四、关闭/退出虚拟环境

当完成工作并希望回到系统默认Python环境时，执行以下命令：

```bash
conda deactivate
```

至此，您已成功地使用Anaconda创建了一个虚拟环境，并在其中安装了所需的第三方包。这种做法有助于保持项目之间的依赖独立，使得代码更易于管理和部署。

### 五、删除虚拟环境

当某个项目完成或者不再需要某个虚拟环境时，可以使用以下命令将其彻底删除：

```bash
conda remove --name my_project_env --all
```

这里的 `my_project_env` 是你想要删除的虚拟环境名称。执行上述命令后，Anaconda将会从系统中移除该虚拟环境及其所有安装的包和配置文件。

**注意事项：**

- 删除操作不可逆，请在执行此命令前确保您确实不再需要该虚拟环境中的任何内容。
- 确认环境名称无误，避免误删其他正在使用的虚拟环境。

---

请根据实际需求和最新版Anaconda的更新情况调整上述命令中的具体版本信息。
