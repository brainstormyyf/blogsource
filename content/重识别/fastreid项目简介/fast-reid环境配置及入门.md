---
title: Fast-Reid环境配置及入门
date: 2024-02-27T19:47:46+08:00
draft: false
type: docs
linkTitle: Fast-Reid环境配置及入门
nav_weight: 2
authors:
  - YYF
---
<!--more-->

{{< bs/alert info >}}
本文主要介绍fast-reid的基础使用，度量学习和ReID最新技术建议学习相关论文。本文的项目运行环境为Ubuntu18.04.5 LTS，Python3.8，Pytorch1.8.1+cu111。
</br></br>
对于fast-reid首先去官方仓库下载对应的代码到本地，仓库地址：https://github.com/JDAI-CV/fast-reid 。
</br>
然后安装对应的Python库。具体代码如下：
</br></br>
git clone https://github.com/JDAI-CV/fast-reid
</br>
cd fast-reid
</br>
python3 -m pip install -r docs/requirements.txt
{{< /bs/alert >}}


此外为了加速索引速度，进入[fast-reid/fastreid/evaluation/rank_cylib/](https://github.com/JDAI-CV/fast-reid/tree/master/fastreid/evaluation/rank_cylib)目录，输入make all编译文件以加速查询。如果发现编译所使用的python版本不是系统默认版本，比如我用的是python3.8，需要修改Makefile文件。如下所示：

```shell
all:
  # python3 setup.py build_ext --inplace
  python3.8 setup.py build_ext --inplace
  rm -rf build
clean:
  rm -rf build
  rm -f rank_cy.c *.so
```

## fast-reid开源项目结构如下图所示：

![glbsb](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402271952237.webp?width=700#center)

其中最主要的是configs文件夹，fastreid文件夹，projects文件夹，tools文件夹和MODEL_ZOO.md。configs文件夹提供了不同模型的结构和训练实现脚本。fastreid文件夹提供了fast-reid的源代码实现。projects提供了一些基于fast-reid的项目代码，里面所有的项目代码非常有用，建议都跑跑。tools文件夹提供了模型训练和部署代码。MODEL_ZOO.md提供了不同数据集下的预训练模型，可以down下来跑一跑。