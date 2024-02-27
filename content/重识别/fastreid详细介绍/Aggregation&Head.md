---
title: Aggregation&Head
date: 2024-02-27T20:41:08+08:00
draft: false
linkTitle: Aggregation&Head
nav_weight: 8
authors:
  - YYF
type: docs
---

<!--more-->


## Aggregation

fastreid架构图中聚合层（Aggregation）的目的是将主干网产生的特征图聚合成一个全局特征图。

![hemt7](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402272042115.webp?width=600#center)

主要采取上图中的四种池化操作。

## Head

Head：获取网络输出内容，利用之前提取的特征，做出预测。

![gjsla](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402272042117.webp?width=600#center)

如上图所示，一共提供了三种head：

Linear head、BN head和Reduction head可供选择。

### 配置方法

![bi8bt](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402272042118.webp?width=400#center)