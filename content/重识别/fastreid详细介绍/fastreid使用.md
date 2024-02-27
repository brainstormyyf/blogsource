---
title: Fastreid使用
date: 2024-02-27T20:15:54+08:00
draft: false
nav_weight: 4
type: docs
authors:
  - YYF
linkTitle: fastreid使用
---
<!--more-->


这里我的示例代码结构如下所示，个人习惯为了方便调试和后续接口使用，和官方仓库不一样。

```python
　　├── configs（配置文件路径）
　　　　├── Market1501
　　　　　　├── bagtricks_R50.yml
　　　　├── Base-bagtricks.yml
　　├── datasets（数据集目录）
　　　　　　├── Market-1501-v15.09.15 （这个数据集名不要改）
　　　　　　　　├── bounding_box_test (750人的19732张图像用于测试)
　　　　　　　　├── bounding_box_train (751人的12936张图像用于训练)
　　　　　　　　├── query (750人的3368张图像用于查询)
　　├── fastreid
　　├── model（预训练模型目录），下载好的预训练模型存放在这
　　├── demo.py（提取图像的特征，并保存），来自原来的demo目录
　　├── predictor.py （模型加载文件），来自原来的demo目录
　　├── train_net.py （模型训练与测试封装版代码），来自原来的tools目录
　　├── visualize_result.py （可视化特征提取结果），来自原来的demo目录
```

重点关注几个py文件，我直接挪到根目录下了。还有模型文件的保存路径，config预训练模型地址，数据集的名字也要注意的。各个文件具体使用可以看看下面介绍，都有代码注释。

**特别注意，py文件为了方便调试，我直接在代码里面设置了*args**的参数，实际使用要特别注意。

## demo.py

这个代码就是加载模型（调用predictor.py），提取查询图像的特征，并保存为npy文件。保存在demo_output文件夹下，一张图像对一个npy文件。这些包含特征向量的npy文件可供后续向量检索使用。

![1t6ha](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402272018471.webp?width=300#center)

```python
# encoding: utf-8
"""
@author:  liaoxingyu
@contact: sherlockliao01@gmail.com
提取图像的特征，并保存
"""

import argparse
import glob
import os
import sys

import torch.nn.functional as F
import cv2
import numpy as np
import tqdm
from torch.backends import cudnn

sys.path.append('.')

from fastreid.config import get_cfg
from fastreid.utils.logger import setup_logger
from fastreid.utils.file_io import PathManager

from predictor import FeatureExtractionDemo

# import some modules added in project like this below
# sys.path.append("projects/PartialReID")
# from partialreid import *

cudnn.benchmark = True
setup_logger(name="fastreid")


# 读取配置文件
def setup_cfg(args):
    # load config from file and command-line arguments
    cfg = get_cfg()
    # add_partialreid_config(cfg)
    cfg.merge_from_file(args.config_file)
    cfg.merge_from_list(args.opts)
    cfg.freeze()
    return cfg


def get_parser():
    parser = argparse.ArgumentParser(description="Feature extraction with reid models")
    parser.add_argument(
        "--config-file",  # config路径，通常包含模型配置文件
        metavar="FILE",
        help="path to config file",
    )
    parser.add_argument(
        "--parallel",  # 是否并行
        action='store_true',
        help='If use multiprocess for feature extraction.'
    )
    parser.add_argument(
        "--input",  # 输入图像路径
        nargs="+",
        help="A list of space separated input images; "
             "or a single glob pattern such as 'directory/*.webp'",
    )
    parser.add_argument(
        "--output",  # 输出结果路径
        default='demo_output',
        help='path to save features'
    )
    parser.add_argument(
        "--opts",
        help="Modify config options using the command-line 'KEY VALUE' pairs",
        default=[],
        nargs=argparse.REMAINDER,
    )
    return parser


def postprocess(features):
    # Normalize feature to compute cosine distance
    features = F.normalize(features)  # 特征归一化
    features = features.cpu().data.numpy()
    return features


if __name__ == '__main__':
    args = get_parser().parse_args()  # 解析输入参数
    # 调试使用，使用的时候删除下面代码
    # ---
    args.config_file = "./configs/Market1501/bagtricks_R50.yml"  # config路径
    args.input = "./datasets/Market-1501-v15.09.15/query/*.webp"  # 图像路径
    # ---

    cfg = setup_cfg(args)  # 读取cfg文件
    demo = FeatureExtractionDemo(cfg, parallel=args.parallel)  # 加载特征提取器，也就是加载模型

    PathManager.mkdirs(args.output)  # 创建输出路径
    if args.input:
        if PathManager.isdir(args.input[0]):  # 判断输入的是否为路径
            # args.input = glob.glob(os.path.expanduser(args.input[0])) # 原来的代码有问题
            args.input = glob.glob(os.path.expanduser(args.input))  # 获取输入路径下所有的文件路径
            assert args.input, "The input path(s) was not found"
        for path in tqdm.tqdm(args.input):  # 逐张处理
            img = cv2.imread(path)
            feat = demo.run_on_image(img)  # 提取图像特征
            feat = postprocess(feat)  # 后处理主要是特征归一化
            np.save(os.path.join(args.output, os.path.basename(path).split('.')[0] + '.npy'), feat)  # 保存图像对应的特征，以便下次使用
```

## visualize_result.py

这个代码就是加载模型（调用predictor.py），提取查询图像的特征，计算模型的各个精度指标。输出模型的ROC结果图，以及某张图像的匹配结果图像。输出目录为vis_rank_list。

ROC结果图如下图所示，ROC曲线下的面积AUC越大，表示模型效果越好。top1精度93.37左右。

![gbkkm](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402272018472.webp?width=500#center)

某张图像的匹配结果图像如下所示。每张图有1张查询图和5张查询结果图，左1为查询图像，其他为查询结果图。蓝色框表示查询结果错误，红色框表示查询结果正确。在查询结果图上有标题，比如0.976/false/cam1，表示当前查询结果图像和查询图像特征距离为0.976，查询结果为false(查询错误)，该查询结果来自cam1摄像头。查询图像上的标题，如0.9967/cam2，这里0.9967表示查询图像的查询结果精度指标，cam2表示查询图像来自cam2摄像头。

![h2666](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402272018473.webp?width=700#center)

![tg288](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402272018474.webp?width=700#center)

```python
# encoding: utf-8
"""
@author:  xingyu liao
@contact: sherlockliao01@gmail.com
可视化特征提取结果
"""

import argparse
import logging
import sys

import numpy as np
import torch
import tqdm
from torch.backends import cudnn

sys.path.append('.')

import torch.nn.functional as F
from fastreid.evaluation.rank import evaluate_rank
from fastreid.config import get_cfg
from fastreid.utils.logger import setup_logger
from fastreid.data import build_reid_test_loader
from predictor import FeatureExtractionDemo
from fastreid.utils.visualizer import Visualizer

# import some modules added in project
# for example, add partial reid like this below
# sys.path.append("projects/PartialReID")
# from partialreid import *

cudnn.benchmark = True
setup_logger(name="fastreid")

logger = logging.getLogger('fastreid.visualize_result')


# 读取配置文件
def setup_cfg(args):
    # load config from file and command-line arguments
    cfg = get_cfg()
    # add_partialreid_config(cfg)
    cfg.merge_from_file(args.config_file)
    cfg.merge_from_list(args.opts)
    cfg.freeze()
    return cfg


def get_parser():
    parser = argparse.ArgumentParser(description="Feature extraction with reid models")
    parser.add_argument(
        "--config-file",  # config路径，通常包含模型配置文件
        metavar="FILE",
        help="path to config file",
    )
    parser.add_argument(
        '--parallel',  # 是否并行
        action='store_true',
        help='if use multiprocess for feature extraction.'
    )
    parser.add_argument(
        "--dataset-name",  # 数据集名字
        help="a test dataset name for visualizing ranking list."
    )
    parser.add_argument(
        "--output",  # 输出结果路径
        default="./vis_rank_list",
        help="a file or directory to save rankling list result.",

    )
    parser.add_argument(
        "--vis-label",  # 输出结果是否查看
        action='store_true',
        help="if visualize label of query instance"
    )
    parser.add_argument(
        "--num-vis",  # 挑选多少张图像用于结果展示
        default=1000,
        help="number of query images to be visualized",
    )
    parser.add_argument(
        "--rank-sort",  # 结果展示是相似度排序方式，默认从小到大排序
        default="ascending",
        help="rank order of visualization images by AP metric",
    )
    parser.add_argument(
        "--label-sort",  # label结果展示是相似度排序方式，默认从小到大排序
        default="ascending",
        help="label order of visualization images by cosine similarity metric",
    )
    parser.add_argument(
        "--max-rank",  # 显示topk的结果，默认显示前10个结果
        default=5,
        help="maximum number of rank list to be visualized",
    )
    parser.add_argument(
        "--opts",
        help="Modify config options using the command-line 'KEY VALUE' pairs",
        default=[],
        nargs=argparse.REMAINDER,
    )
    return parser


if __name__ == '__main__':
    args = get_parser().parse_args()
    # 调试使用，使用的时候删除下面代码
    # ---
    args.config_file = "./configs/Market1501/bagtricks_R50.yml"  # config路径
    args.dataset_name = 'Market1501'  # 数据集名字
    args.vis_label = False  # 是否显示正确label结果
    args.rank_sort = 'descending'  # 从大到小显示关联结果
    args.label_sort = 'descending'  # 从大到小显示关联结果
    # ---

    cfg = setup_cfg(args)
    # 可以直接在代码中设置cfg中设置模型路径
    # cfg["MODEL"]["WEIGHTS"] = './configs/Market1501/bagtricks_R50.yml'
    test_loader, num_query = build_reid_test_loader(cfg, dataset_name=args.dataset_name)  # 创建测试数据集
    demo = FeatureExtractionDemo(cfg, parallel=args.parallel)  # 加载特征提取器，也就是加载模型

    logger.info("Start extracting image features")
    feats = []  # 图像特征，用于保存每个行人的图像特征
    pids = []  # 行人id，用于保存每个行人的id
    camids = []  # 拍摄的摄像头，行人出现的摄像头id
    # 逐张保存读入行人图像，并保存相关信息
    for (feat, pid, camid) in tqdm.tqdm(demo.run_on_loader(test_loader), total=len(test_loader)):
        feats.append(feat)
        pids.extend(pid)
        camids.extend(camid)

    feats = torch.cat(feats, dim=0)  # 将feats转换为tensor的二维向量，向量维度为[图像数，特征维度]
    # 这里把query和gallery数据放在一起了，需要切分query和gallery的数据
    q_feat = feats[:num_query]
    g_feat = feats[num_query:]
    q_pids = np.asarray(pids[:num_query])
    g_pids = np.asarray(pids[num_query:])
    q_camids = np.asarray(camids[:num_query])
    g_camids = np.asarray(camids[num_query:])

    # compute cosine distance 计算余弦距离
    q_feat = F.normalize(q_feat, p=2, dim=1)
    g_feat = F.normalize(g_feat, p=2, dim=1)
    distmat = 1 - torch.mm(q_feat, g_feat.t())  # 这里distmat表示两张图像的距离，越小越接近
    distmat = distmat.numpy()

    # 计算各种评价指标 cmc[0]就是top1精度，应该是93%左右，这里精度会有波动
    logger.info("Computing APs for all query images ...")
    cmc, all_ap, all_inp = evaluate_rank(distmat, q_pids, g_pids, q_camids, g_camids)
    logger.info("Finish computing APs for all query images!")

    visualizer = Visualizer(test_loader.dataset)  # 创建Visualizer类
    visualizer.get_model_output(all_ap, distmat, q_pids, g_pids, q_camids, g_camids)  # 保存结果

    logger.info("Start saving ROC curve ...")  # 保存ROC曲线
    fpr, tpr, pos, neg = visualizer.vis_roc_curve(args.output)
    visualizer.save_roc_info(args.output, fpr, tpr, pos, neg)
    logger.info("Finish saving ROC curve!")

    logger.info("Saving rank list result ...")  # 保存部分查询图像的关联结果，按照顺序排列
    query_indices = visualizer.vis_rank_list(args.output, args.vis_label, args.num_vis,
                                             args.rank_sort, args.label_sort, args.max_rank)
    logger.info("Finish saving rank list results!")
```

## train_net.py

这段代码调用config文件，训练或者测试模型。训练模型设置args.eval_only = False，反之为测试模型。测试模型结果如下图所示。代码封装的很不错，把该有的测试指标都贴上去了。

![gspfq](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E9%87%8D%E8%AF%86%E5%88%AB/202402272018475.webp?width=600#center)

另外这是封装过多的代码，如果想知道清晰的训练代码查看[fast-reid/tools/plain_train_net.py](https://github.com/JDAI-CV/fast-reid/blob/master/tools/plain_train_net.py)，这个文件提供了详细没有封装过多的训练代码。

```python
#!/usr/bin/env python
# encoding: utf-8
"""
@author:  sherlock
@contact: sherlockliao01@gmail.com
模型训练与测试封装版代码
"""

import sys

sys.path.append('.')

from fastreid.config import get_cfg
from fastreid.engine import DefaultTrainer, default_argument_parser, default_setup, launch
from fastreid.utils.checkpoint import Checkpointer


# 读取配置文件
def setup(args):
    """
    Create configs and perform basic setups.
    """
    cfg = get_cfg()
    cfg.merge_from_file(args.config_file)
    cfg.merge_from_list(args.opts)
    cfg.freeze()
    default_setup(cfg, args)
    return cfg


def main(args):
    cfg = setup(args)
    # 模型测试
    if args.eval_only:
        cfg.defrost()
        cfg.MODEL.BACKBONE.PRETRAIN = False
        model = DefaultTrainer.build_model(cfg)
        # 加载预训练模型
        Checkpointer(model).load(cfg.MODEL.WEIGHTS)  # load trained model

        res = DefaultTrainer.test(cfg, model)
        return res
    # 模型训练
    trainer = DefaultTrainer(cfg)

    trainer.resume_or_load(resume=args.resume)
    return trainer.train()


if __name__ == "__main__":
    args = default_argument_parser().parse_args()
    # 调试使用，使用的时候删除下面代码
    # ---
    args.config_file = "./configs/Market1501/bagtricks_R50.yml"  # config路径
    args.eval_only = True  # 是否测试模型,False表示训练模型，True表示测试模型
    # ---

    print("Command Line Args:", args)
    launch(
        main,
        args.num_gpus,
        num_machines=args.num_machines,
        machine_rank=args.machine_rank,
        dist_url=args.dist_url,
        args=(args,),
    )
```
