---
type: docs
title: Git指南：版本控制的力量
linkTitle: Git指南
description: ""
date: 2024-02-20T16:29:55+08:00
draft: false
nav_weight: 1
series:
  - 环境配置
tags:
  - git
images:
authors:
  - YYF
---

<!--more-->

在软件开发的世界中，版本控制是一个至关重要的工具。它允许开发者保存、追踪和恢复代码的各个版本。Git由 Linus Torvalds 创建，是目前最受欢迎的版本控制系统之一。在这篇博客中，我们将探讨 Git 是什么，为什么它是分布式的，以及如何使用它进行开发者之间的协作。

## 一、什么是 Git？

Git 是一个开源的分布式版本控制系统，用于追踪文件更改和帮助多人协作开发。它被设计成能够快速、高效地处理从很小到非常大的项目。
Git 的核心概念包括：

- <span style="background:#fff88f">仓库（Repository）：</span>
  仓库是 Git 中存储所有项目文件和相关元数据的地方。这些文件被称为“仓库”是因为它们存储了项目的完整历史和状态。仓库通常是一个目录，其中包含多个文件和子目录，以及指向这些文件的指针。仓库还包含一个名为.git的子目录，该子目录存储了所有的元数据和版本历史记录。
- <span style="background:#fff88f">提交（Commit）：</span>
  提交是 Git 中保存项目状态的一种方式，它代表项目在特定时间点的快照。每次提交都会保存一组父提交（即之前的提交），以及指向这些父提交的指针。提交还包含一个提交者信息，如提交者的用户名和电子邮件地址，以及一个提交消息，描述了本次提交的内容。

{{< bs/alert warning >}}
注意仓库、提交、工作区、暂存区之间的区别，仓库、工作区、暂存区均为存储目录/存储空间，而提交为动作。工作区、暂存区之间的区别见下文标题四。
{{< /bs/alert >}}

- <span style="background:#fff88f">分支（Branch）：</span>
  分支是 Git 中并行开发的关键特性。一个分支代表了一个独立的代码路径，允许开发者在不同的代码路径上工作，而不会相互干扰。创建分支时，Git 会复制当前分支的提交历史，并创建一个新的分支指向最后一个提交的副本。之后，开发者可以在新的分支上进行更改，并提交新的提交。
- <span style="background:#fff88f">合并（Merge）：</span>
  合并是将两个或多个分支的更改整合到一起的过程。当两个或多个开发者在同一时间段内对同一部分代码进行了更改，并且这些更改需要合并在一起时，就需要进行合并。Git 提供了一种自动合并更改的方法，它会尝试找出两个分支的共同祖先，并合并更改。
- <span style="background:#fff88f">远程仓库（Remote）：</span>
  远程仓库是存储在网络上的 Git 仓库，允许团队成员协作。远程仓库通常托管在代码托管平台（如 GitHub、GitLab 或 Bitbucket）上。通过将本地仓库与远程仓库关联，开发者可以推送更改到远程仓库，并与他人共享。其他开发者可以从远程仓库克隆或拉取更改，以便协作和同步。

## 二、Git 是分布式的，这意味着什么？

### 1.集中式版本控制系统

想象一个实体文件柜，里面有一个文件夹，包含所有项目文件。每当有人需要操作一个文件时，他们必须拿起它，从文件夹中取出，然后在完成工作后放回文件夹。因此为了避免任何可能的冲突，不可能让两个人同时工作在同一个文件上。

这是集中式版本控制系统的工作方式，用户需要“检出”和“检入”文件，即当有人需要编辑特定文件时，他们需要检出该文件，从仓库中移除，然后在完成工作后检入文件，将其返回仓库。

![patqd](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/git/202402201839602.webp#center)
### 2.分布式版本控制系统

在像Git这样的分布式系统中，多个用户可以同时访问同一远程仓库的文件。每当有人需要编辑文件时，他们可以简单地将文件（或整个仓库）克隆到本地机器上，然后将修改后的文件推送到远程仓库。这样，多人可以同时工作在同一个项目上，甚至可以编辑同一个文件。

![agp1h](https://gitee.com/yao_yi_feng/fighouse/raw/master/img/%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE/git/202402201839657.webp#center)

这就是大型开源项目能够分布式的原因，来自世界各地的人们可以共同工作在同一个项目上，管理修改和可能的冲突（在这里也会发生合并冲突）。

### 3.分布式的优势

Git 的分布式特性是其最强大的特点之一。在分布式系统中，每个开发者的工作站上都有一个完整的代码库副本，包括所有历史提交记录和版本信息。这意味着开发者可以在本地进行大多数操作，如提交、创建分支、合并等，而不需要连接到网络或中央服务器。

- <span style="background:#fff88f">去中心化：</span>
  在 Git 中，没有中央服务器或单一的权威源。每个开发者的工作站上都有一个完整的代码库，这意味着他们可以在没有网络连接的情况下继续工作。
  这种去中心化的结构提高了系统的可靠性，因为没有任何单一的故障点。即使某个中央服务器出现问题，开发工作仍然可以继续。
- <span style="background:#fff88f">性能优化：</span>
  大多数 Git 操作，如提交、创建分支和合并，都可以在本地执行。这大大提高了操作的速度和效率，特别是在处理大型项目时。
  本地操作减少了网络延迟和中央服务器的负载，使得团队可以更快地迭代和协作。
- <span style="background:#fff88f">安全性：</span>
  Git 使用加密哈希来确保数据的完整性和一致性。每次提交都会生成一个唯一的哈希值，用于标识该提交。这使得检测数据是否被篡改变得非常容易。
  分布式结构意味着每个开发者都有责任确保他们的工作站上的代码库是完整和可信的。
- <span style="background:#fff88f">灵活性：</span>
  开发者可以在本地创建分支、提交更改，并在准备好后推送这些更改到远程仓库。这使得并行开发变得简单，因为多个开发者可以在同一时间处理不同的任务。
  即使在网络不可用的情况下，开发者也可以继续工作，这确保了开发的连续性。
- <span style="background:#fff88f">协作简单：</span>
  开发者可以通过简单的命令，如 git pull 和 git push，从远程仓库拉取和推送更改。这使得团队成员之间的协作和同步变得非常直接和高效。
  通过特性分支和合并请求（pull requests），团队成员可以在本地工作，并在合并到主分支之前与他人共享和讨论更改。
- <span style="background:#fff88f">数据完整性：</span>
  Git 中的数据完整性是通过一系列的加密哈希来保证的。每次提交都会生成一个唯一的哈希值，用于标识该提交。这使得检测数据是否被篡改变得非常容易。

## 三、安装和配置git

安装和设置 Git 是一个简单的过程，可以通过以下步骤来完成。以下指南适用于 Windows、macOS 和 Linux 系统。

### 1.在 Windows 上安装 Git

1. **下载 Git**：
   访问 [Git 官网](https://git-scm.com/) 并下载适用于 Windows 的安装程序。
2. **安装 Git**：
   运行下载的安装程序，并按照安装向导的指示进行安装。
3. **配置**：
   安装完成后，你可以选择配置 Git。打开命令提示符或 PowerShell，运行以下命令来设置你的 Git 用户名和电子邮件地址：

   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your_email@example.com"
   ```

   这些设置将用于所有你通过 Git 进行的提交。

### 2.在 macOS 上安装 Git

1. **使用 Homebrew 安装 Git**：
   macOS 用户可以使用 Homebrew 包管理器来安装 Git。首先，打开终端并运行以下命令来安装 Homebrew（如果尚未安装）：

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

   然后，使用 Homebrew 安装 Git：

   ```bash
   brew install git
   ```

2. **配置**：
   安装完成后，你可以配置 Git。在终端中运行以下命令来设置你的 Git 用户名和电子邮件地址：

   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your_email@example.com"
   ```

### 3.在 Linux 上安装 Git

1. **使用包管理器安装 Git**：
   Linux 发行版的包管理器中通常都包含 Git。以下是使用一些常见发行版包管理器的示例：
   - **Ubuntu/Debian**:
     ```bash
     sudo apt-get update
     sudo apt-get install git
     ```
   - **Fedora**:
     ```bash
     sudo dnf install git
     ```
   - **Arch Linux**:
     ```bash
     sudo pacman -S git
     ```
2. **配置**：
   安装完成后，你可以配置 Git。在终端中运行以下命令来设置你的 Git 用户名和电子邮件地址：
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your_email@example.com"
   ```

### 4.验证 Git 安装

安装 Git 后，打开命令提示符、PowerShell、终端（macOS/Linux）并运行以下命令来验证 Git 是否正确安装：

```bash
git --version
```

如果 Git 已正确安装，这将显示安装的 Git 版本号。
现在你已经安装了 Git，你可以开始使用它来管理你的代码仓库了。记得，Git 是一个分布式版本控制系统，这意味着你可以在本地执行大多数操作，然后将更改推送到远程仓库与他人共享。

## 四、git的工作区和暂存区

1. <span style="background:#fff88f">工作区（Working Directory）</span>
   工作区是你电脑上的一个目录，它包含了你正在工作的文件。你可以在这个目录中编辑文件、创建新文件或删除文件。工作区是Git中文件更改的起始点。当你第一次克隆一个仓库时，工作区会包含所有文件的最新版本。
2. <span style="background:#fff88f">暂存区/索引区（Staging Area）</span>
   <span style="background:#b1ffff">暂存区是一个介于工作区和仓库之间的小型区域</span>，它用于暂存即将进行的提交。当你使用 `git add`命令时，文件的更改会被添加到暂存区。暂存区允许你选择性地将更改组织成更小、更有意义的提交。你可以添加一部分文件的更改到暂存区，然后提交它们，而不必将所有更改都包含在一个提交中。
   简而言之，工作区是你实际编辑文件的地方，而暂存区是你准备下一次提交的地方。当你准备好提交更改时，你会将工作区中已完成的更改添加到暂存区，然后一次性提交暂存区中的所有更改。
   下面是一个简单的例子，展示了工作区和暂存区的使用过程：

```bash
# 编辑工作区中的文件
edit file1.txt
# 将更改添加到暂存区
git add file1.txt
# 编辑另一个文件
edit file2.txt
# 只暂存file1.txt的更改，file2.txt的更改不包含在这次提交中
git commit -m "Update file1.txt"
# 现在将file2.txt的更改添加到暂存区
git add file2.txt
# 提交file2.txt的更改
git commit -m "Update file2.txt"
```

在这个例子中，我们首先在工作区中编辑了 `file1.txt`，然后将其更改添加到暂存区，并提交了一个包含这些更改的 commit。接着，我们编辑了 `file2.txt`，但没有立即提交它。最后，我们将 `file2.txt`的更改添加到暂存区，并提交了一个新的 commit。这样，我们就有了两个独立的提交，每个提交都包含了不同的文件更改。


