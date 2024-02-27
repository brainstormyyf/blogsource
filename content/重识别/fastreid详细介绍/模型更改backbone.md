---
title: 更改backbone
linkTitle: 更改backbone
date: 2024-02-27T20:28:58+08:00
draft: false
nav_weight: 6
authors:
  - YYF
type: docs
---

<!--more-->

```Python
class Baseline(nn.Module):
    """
    Baseline architecture. Any models that contains the following two components:
    1. Per-image feature extraction (aka backbone)
    2. Per-image feature aggregation and loss computation
    """
```

fastreid不仅具有系统配置可管理（Manageable system configuration）的优点，同时其还有模块化和可扩展性的特性（Modular and extensible design），这也使得该项目的灵活性大大增强。

![qoqcb](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402272031182.webp?width=700#center)

## 类型：

![vtjrg](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402272031183.webp?width=300#center)

如图所示，fastreid提供了丰富的backbone可供选择，如：resnet、vit等等。

该部分用于对上一阶段经过预处理后的图片进行特征提取，得到对应的特征图。

## 配置方法

更改backbone需要在最底层的配置文件Base-bagtricks.yml中更改对应的Backbone name，如下如所示：

![mv27c](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402272031184.webp?width=600#center)

