---
title: FastReID A Pytorch Toolbox for General Instance Re-identification
date: 2024-02-29T10:49:33+08:00
draft: false
type: docs
linkTitle: FastReID
nav_weight: 1
---

<!--more-->


![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291056622.webp)



![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291056368.webp)

  


![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291056287.webp)

尽管近年来深度学习在很多单项任务上取得了相当或超过人类水平的成绩，这些深度学习模型都是为固定的任务所设计，无法动态地根据环境而更新。这意味着每当有来自新的分布的数据输入的时候，此类模型都需要同时在整个历史数据上重新进行训练。显然，在持续变化的现实情境中，进行这种数量级的训练是不现实的。

人工智能的一个关键挑战是建立能在动态变化的环境中运行的实体系统。这样的系统必须在动态变化的环境中，适应不同的任务。Easy for human！Hard for model！

  


![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291056736.webp)


![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291056758.webp)

CNN transformer 获取更具区分性的分类特征

Identity loss 三元组四元组 loss

Re-ranking给定一张query图片q和一个gallery的集和G, 我们把图像映射到一个语义特征空间并根据特征相似度排序得到初始检索列表。然后re-ranking方法能够进一步来修正初始检索结果。



![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291056594.webp)

不拘泥于重识别对象的类型


![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291056399.webp)

聚合（aggregation）指的是在Backbone输出不同尺度的特征图聚合成一个特征向量来表征一个目标



![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291056924.webp)

Auto-augment：直觉上讲，数据增强教会了模型数据不变性。通常图像的数据增强是一个手动设计并完成的过程，比如改变一些像素，水平翻转等。AutoAugment通过强化学习作为搜索策略来自动搜索和改进数据增强。



![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291057608.webp)



![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291057402.webp)

聚合（aggregation）指的是在Backbone输出的特征图聚合成一个特征向量来表征一个目标

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291057450.webp)



![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291057884.webp)


![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291057925.webp)

小的学习率先训练几个epoch，这是因为网络的参数是随机初始化的，一开始就采用较大的学习率容易数值不稳定。

为了重新训练分类网络以满足我们的任务要求，使用从任务中收集的数据对ImageNet预训练的模型进行微调。一般来说，我们会添加一个分类器，为了更好地初始化分类器的参数，在训练开始时冻结网络参数只训练分类器的参数，之后再进行整个的端到端训练。

find the most similar spatial feature in gallery feature、

reid涉及ranking list

拓展查询(QE, Query Expansion): 指对返回的前top@K个结果,包括查询样本本身,对它们的特征求和取平均,以此为检索特征，再做一次查询。目的是为了提高召回率。



![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291057015.webp)



![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291057060.webp)



![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E9%87%8D%E8%AF%86%E5%88%AB/202402291057907.webp)