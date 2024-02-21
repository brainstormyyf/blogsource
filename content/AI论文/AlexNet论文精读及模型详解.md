---
title: AlexNet论文精读及模型详解
date: 2024-02-21T23:21:06+08:00
draft: false
type: docs
nav_weight: 1
series:
  - AI论文
authors:
  - YYF
linkTitle: AlexNet论文精读
---
<!--more-->
## 一、论文总览

该论文提出了一种基于深度卷积神经网络（CNN）的图像分类方法，并在ILSVRC-2010和ILSVRC-2012图像分类挑战赛中取得了新的记录。主要工作和贡献如下：

1. 训练了当时最大的卷积神经网络，包含**5个卷积层和3个全连接层**，参数量达6000万个，在ILSVRC-2010测试集上取得了top-1错误率37.5%,top-5错误率17.0%,明显优于之前的方法。

2. 提出了几个新的网络架构优化技巧，如**ReLU激活函数、数据增强、局部响应归一化（Local Response Normalization）、重叠池化(Overlapping Pooling)**等，这些技巧显著提升了网络的性能。

3. **模型并行**（model parrallel）: 使用了两个GTX 580 3GB显卡并行训练，实现了高效的GPU卷积操作，显著减少了训练时间。

4. 使用了**随机失活（dropout）** 等正则化方法来控制过拟合，并详细分析了其有效性。

5. 在ILSVRC-2012比赛中使用该模型，取得了top-5错误率18.2%的成绩，显著优于第二名的16.4%。

6. 获得了大量视觉知识，如不同层级的卷积核表示，高维特征向量的相似度计算等。

总体而言，该论文通过构建当时最大的卷积神经网络并使用各种优化技巧，在ImageNet等大规模图像数据集上取得了新的state-of-the-art结果，对后续的计算机视觉研究产生了重大影响。

## 二、数据预处理/增强

使用的是ImageNet数据集，将所有图像缩放到256x256大小，如果图像尺寸不是正方形，先按比例缩小，然后从中间裁剪出256x256大小的正方形区域。

![](https://pic4.zhimg.com/80/v2-232b7d5a42f970c5c691dddb09d9c413_1440w.webp?width=800#center)

注意：此处是直接使用的原始RGB图片，没有进行SIFT的特征提取，这也被看作端到端的训练模型，简化了训练以及推理的流程，这种端到端的思想深刻影响了深度学习模型的发展，目前大多数模型均是采用端到端的方法进行训练的。

**同时论文使用两种方法进行数据增强**，**第一种**是对每张图片进行裁取和翻转，经过处理每张图片会得到十张图片输入模型预测出结果。**第二种**是对图片的RGB三个颜色通道进行平移和调整，即进行RGB通道强度调整。

![](https://pic4.zhimg.com/80/v2-32f593496d43e6fcaaf60d841ae7227f_1440w.webp?width=800#center)

## 三、AlexNet网络结构分析

论文中的模型作者用了两块GPU进行训练，即使用了模型并行的方法，这种方法会给模型的工程实践带来困难，所以在之后随着显卡性能的提升已很少使用，但目前在NLP领域，LLM（large language model）的训练再次遇到了算力瓶颈，以GPT为代表的大模型再次使用模型并行的方法进行训练。

![](https://pic1.zhimg.com/80/v2-ad67370beec3bf80e152c9a9ddf16440_1440w.webp?width=800#center)

模型一共有八层，前五层是CNN层，紧接着跟着两个全连接层，最后是一个1000类的softmax分类层。第二层，第四层，第五层的CNN层后面均跟着Max pooling层和LRM层（local response normalization，作用是防止过拟合）。两层全连接层均使用了Dropout的方法防止过拟合。实际上这两层全连接层是参数最多的，构成了模型训练的瓶颈，也是可能造成过拟合的罪魁祸首，为了防止过拟合，这两层全连接层都使用了Dropout的方法。

LRM层现在基本已不再使用，其作用现在普遍认为也比较小，故本文不再做介绍，只需知道论文作者使用其本意是为了防止过拟合，提升模型泛化能力。

其结构图可以简化为在单块gpu上进行训练的。

![](https://pic1.zhimg.com/80/v2-8b071d057557722d413b991bf124f45c_1440w.webp?width=800#center)

图片来源：https://blog.csdn.net/guzhao9901/article/details/118552085?spm=1001.2014.3001.5506

原图输入256 × 256，实际上进行了随机裁剪，实际大小为227 × 227。

<span style="background:#fff88f">①卷积层C1</span>

C1的基本结构：卷积–>局部响应归一化(LRN)–>ReLU–>池化

- 卷积：输入为227 × 227 × 3，使用96个11×11×3的卷积核，padding = 0，stride = 4。 FeatureMap为(227-11+0×2+4)/4 = 55，即55×55×96。
- 局部响应归一化(LRN)：对ReLU激活函数前的输出进行局部响应归一化处理。
- 激活函数：采用ReLU激活函数。
- 池化：3×3的池化核，padding = 0，stride = 2，池化后的FeatureMap为(55-3+0×2+2)/2=27, 即C1输出为27×27×96（若按照论文将数据分到两个GPU中处理，每组输出为27×27×48）。

<span style="background:#fff88f">②卷积层C2</span>

C2的基本结构：卷积–>局部响应归一化(LRN)–>ReLU–>池化

- 卷积：输入为27×27×96，使用256个5×5×96的卷积核，padding = 2， stride = 1。 FeatureMap为(27-5+2×2+1)/1 = 27，即27×27×256。
- 局部响应归一化(LRN)：在ReLU激活之前同样执行局部响应归一化操作。
- 激活函数：使用ReLU激活函数。
- 池化：3 × 3的池化核，padding = 0，stride = 2，池化后的FeatureMap为(27-3+0+2)/2=13, 即C2输出为13×13×256（若按论文方式分配到两个GPU，则每组输出为13×13×128）。

<span style="background:#fff88f">③卷积层C3</span>

C3的基本结构为：卷积–>ReLU

- 卷积：输入为13×13×256，使用384个3×3×256的卷积核，padding = 1，stride = 1。 FeatureMap为(13-3+1×2+1)/1 = 13，即13×13×384。
- 激活函数：采用ReLU激活函数，C3输出为13×13×384（若按照论文将数据分配到两个GPU中处理，则每组输出为13×13×192）。

<span style="background:#fff88f">④ 卷积层C4</span>

C4的基本结构为：卷积–>ReLU

- 卷积：输入为13×13×384，使用384个3×3×384的卷积核，padding = 1，stride = 1。 FeatureMap为13×13×384。
- 激活函数：采用ReLU激活函数，C4输出为13×13×384（若按论文方式分配到两个GPU，则每组输出为13×13×192）。

<span style="background:#fff88f">⑤ 卷积层C5</span>

C5的基本结构为：卷积–>ReLU–>池化

- 卷积：输入为13×13×384，使用256个3×3×384的卷积核，padding = 1，stride = 1。 FeatureMap大小仍为13×13×256。
- 激活函数：采用ReLU激活函数。
- 池化：池化核大小为3 × 3，padding = 0，stride = 2，池化后的FeatureMap为(13-3+0×2+2)/2=6, C5输出为6×6×256（若按照论文分到两个GPU中处理，每组输出为6×6×128）。

<span style="background:#fff88f">⑥全连接层FC6</span>

FC6的基本结构为：卷积（全连接实现）–>ReLU–>Dropout

- 全连接：实际上通过卷积进行等效的全连接操作，输入为6×6×256，使用4096个6×6×256的卷积核，padding = 0，stride = 1， FeatureMap大小为1×1×4096。
- 激活函数：采用ReLU激活函数。
- Dropout：在全连接层中应用Dropout技术，随机丢弃一部分神经元节点，以防止过拟合，最终FC6输出为1×1×4096。

<span style="background:#fff88f">⑦全连接层FC7</span>

FC7的基本结构为：全连接–>ReLU–>Dropout

- 全连接：直接进行全连接操作，输入维度为1×1×4096。
- 激活函数：采用ReLU激活函数。
- Dropout：同样应用Dropout防止过拟合，FC7输出为1×1×4096。

<span style="background:#fff88f">⑧ 全连接层FC8</span>

FC8的基本结构为：全连接–>softmax

- 全连接：对上一层的输出进行全连接操作，输入维度为1×1×4096。
- softmax：最后采用softmax激活函数进行分类，输出维度为1×1×1000，对应1000类物体类别概率分布。

## 四、ReLU激活函数

$$ReLU(x)=max(0,x)$$

ReLU函数的导数：
```katex
\frac{dReLU(x)}{dx} = \begin{cases} 1 & \text{if } x > 0 \ 0 & \text{if } x \leq 0 \end{cases}
```

$${\sigma(x)} = \frac{1}{1 + e^{-x}}$$

Sigmoid函数的导数：

$$\frac{d\sigma(x)}{dx} = \sigma(x) * (1 - \sigma(x)) = \frac{e^{-x}}{(1 + e^{-x})^2}$$

![](https://pic2.zhimg.com/80/v2-ca071a601cdb4bcd05b90b231e1c5135_1440w.webp?width=500#center)

一个sigmoid函数大致相当于两个ReLU函数

关于ReLU的具体分析可以见这篇文章：（暂未更新）

## 五、重叠池化（overlapping pooling）

重叠池化(overlapping pooling)是一种改进传统的池化层的策略。传统的池化层通常由间隔一定距离的池化单元组成，每个单元对相邻的神经元输出进行汇总。相邻池化单元所覆盖的区域不重叠。**而重叠池化则通过设置池化单元之间的间隔小于池化区域大小来实现重叠**，例如使用间隔2像素的池化单元和区域大小为3x3的池化单元。文中提到，相比传统的非重叠池化，使用重叠池化可以将模型在ImageNet数据集上的top-1错误率降低0.4%，top-5错误率降低0.3%。因此，重叠池化是一种改进池化层设计的策略，能够提高模型性能。

## 六、Dropout

dropout是一种有效的正则化方法，可以减少深度卷积神经网络中全连接层过拟合的问题。

**注意：dropout是解决的全连接层过拟合的问题，所以论文中的两个全连接层使用了dropout，而CNN层没有使用dropout**

dropout的主要思想是：在每次前向传播时，以一定概率（如0.5）将每个隐藏神经元的输出置为0，使得每个神经元在每次前向传播时都有一定的概率不参与计算。论文中认为，这样做的目的是打破全连接层中不同神经元之间的复杂共适应性，迫使每个神经元学习更强大的特征表示，对不同的随机子集都有效。在测试时，不进行dropout，而是将每个神经元的输出乘以一定比例（如0.5），近似于取所有可能dropout网络结果的几何平均。

现在普遍认为dropout相当于一个L2正则项，可以有效减少过拟合问题，同时让模型更强大。**值得注意的是，dropout在训练时会增加迭代收敛次数，但可以大大提高模型的泛化能力。**

## 七、训练细节

1. 使用**随机梯度下降（SGD Stochastic Gradient Descent**进行训练，批大小为128，动量为0.9，权重衰减为0.0005。发现权重衰减对模型学习非常重要。
2. 对每个层的权重进行高斯初始化，均值为0，标准差为0.01。**注意对权重进行均值为0标准差为0.01的高斯初始化现在非常常见，只有对一些特别深的网络例如GPT这样的模型，才会对权重做均值为0标准差为0.02的高斯初始化。** 对第二、四、五卷积层以及全连接隐藏层的神经元偏置进行常数1初始化，其余层偏置初始化为常数0。**（偏置常数1初始化理论性不强，多为实验炼丹结果，现在普遍将偏置初始化为常数0，结果也不差）**
3. 使用所有层相等的固定学习率，并在验证损失停止改善时手动将学习率变为原来的十分之一。初始学习率为0.01，训练过程中降低3次。
4. 训练了大约90个周期，耗时5-6天在两块NVIDIA GTX 580 3GB GPU上进行训练。
5. 损失函数是最小化交叉熵，即最大化标签的正确对数概率。

## 八、PyTorch代码实现

```python3
import time
import torch
from torch import nn, optim
import torchvision
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

class AlexNet(nn.Module):
    def __init__(self):
        super(AlexNet, self).__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(1, 96, 11, 4), # in_channels, out_channels, kernel_size, stride, padding
            nn.ReLU(),
            nn.MaxPool2d(3, 2), # kernel_size, stride
            # 减小卷积窗口，使用填充为2来使得输入与输出的高和宽一致，且增大输出通道数
            nn.Conv2d(96, 256, 5, 1, 2),
            nn.ReLU(),
            nn.MaxPool2d(3, 2),
            # 连续3个卷积层，且使用更小的卷积窗口。除了最后的卷积层外，进一步增大了输出通道数。
            # 前两个卷积层后不使用池化层来减小输入的高和宽
            nn.Conv2d(256, 384, 3, 1, 1),
            nn.ReLU(),
            nn.Conv2d(384, 384, 3, 1, 1),
            nn.ReLU(),
            nn.Conv2d(384, 256, 3, 1, 1),
            nn.ReLU(),
            nn.MaxPool2d(3, 2)
        )
         # 这里全连接层的输出个数比LeNet中的大数倍。使用丢弃层来缓解过拟合
        self.fc = nn.Sequential(
            nn.Linear(256*5*5, 4096),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(4096, 4096),
            nn.ReLU(),
            nn.Dropout(0.5),
            # 输出层。由于这里使用Fashion-MNIST，所以用类别数为10，而非论文中的1000
            nn.Linear(4096, 10),
        )

    def forward(self, img):
        feature = self.conv(img)
        output = self.fc(feature.view(img.shape[0], -1))
        return output
```

