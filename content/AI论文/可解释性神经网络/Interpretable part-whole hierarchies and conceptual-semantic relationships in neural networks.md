---
title: Interpretable part-whole hierarchies and conceptual-semantic relationships in neural networks
date: 2024-02-29T11:43:54+08:00
draft: false
type: docs
linkTitle: GLOM
nav_weight: 1
authors:
  - YYF
description: 这篇论文是Hinton的GLOM这个idea的具体实现
---
<!--more-->


![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148732.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148733.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148734.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148735.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148736.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148737.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148738.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148739.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148740.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148741.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148742.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148743.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148744.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148745.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148746.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148747.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148748.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148749.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148750.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148751.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148752.webp)

![](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E8%AE%BA%E6%96%87%E9%98%85%E8%AF%BB/%E5%8F%AF%E8%A7%A3%E9%87%8A%E6%80%A7%E7%A5%9E%E7%BB%8F%E7%BD%91%E7%BB%9C/202402291148753.webp)

