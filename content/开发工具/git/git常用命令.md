---
type: docs
title: "Git常用命令"
linkTitle: "Git常用命令"
description: ""
date: 2024-02-20T17:42:22+08:00
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
## 一、仓库初始化和克隆
- 初始化新仓库：
```shell
git init
```
该命令会在当前目录下创建一个名为.git的隐藏文件夹，用于存储Git仓库的相关信息。

{{< bs/alert warning >}}
可在当前目录下创建一个.gitignore文件，用于指定 Git 应该忽略的文件和文件模式。这个文件非常有用，因为它可以帮助你隐藏不想提交到仓库的文件，比如编译生成的文件、日志文件、本地设置文件等。
{{< /bs/alert >}}

- 克隆远程仓库：
```shell
git clone [远程仓库地址] [本地目录名]      //若不指明本地目录名则是在当前目录下
```
  可选参数：
  - `-b [分支名]`：克隆特定分支。
## 二、仓库管理

在 Git 中，如果你想添加或者更改远程仓库的 URL，你可以使用 `git remote` 命令来添加一个新的远程仓库或修改现有的远程仓库。以下是一些相关的命令和步骤：
### 1.添加远程仓库
在本地仓库中，可以通过以下命令添加远程仓库：
```bash
git remote add [远程仓库名] [远程仓库地址]
```
   例如，将名为origin的远程仓库设置为https://github.com/username/my_project.git：
```bash
git remote add origin https://github.com/username/my_project.git
```
### 2.更改现有远程仓库的：
   如果你想要更改一个现有远程仓库的 URL，你可以先删除原来的远程仓库，然后添加一个新的远程仓库。
   删除远程仓库：
```bash
git remote rm [远程仓库名]
```
   然后，添加新的远程仓库：
```bash
git remote add [远程仓库名] [新的远程仓库地址]
```
### 3.查看远程仓库列表：
   要查看所有已添加的远程仓库，可以使用以下命令：
```bash
git remote -v
```
   这个命令会列出所有远程仓库的名称和 URL。
在进行远程仓库 URL 的更改时，请确保你的本地仓库中的所有更改都已经提交，并且与远程仓库同步。这样可以避免在更改 URL 过程中出现版本冲突或数据丢失的问题。如果你已经将更改推送到远程仓库，那么其他协作者可能无法通过旧的 URL 获取你的更改，因此你可能需要通知他们更新远程仓库的 URL。



## 三、暂存并提交更改
### 1.暂存更改
`git add` 是 Git 版本控制系统中一个非常重要的命令，它的作用是将工作目录中的文件更改添加到暂存区（Staging Area），为下一次的提交做准备。

```bash
git add [file_path]  //暂存特定文件或文件夹
git add .     //暂存所有更改
```

{{< bs/alert info >}}
暂存更改是一个关键步骤，因为它决定了下一次 git commit 将会包含哪些更改。
{{< /bs/alert >}}

### 2.查看暂存更改
查看暂存状态，这会告诉你哪些文件被暂存了，哪些文件还没有被暂存。
```bash
git status
```
### 3.提交更改
- 将更改提交到本地仓库，可以使用以下命令：
```bash
git commit -m "[提交消息]"
```
  可选参数：
  - `-a`：提交所有已跟踪的文件。
  - `--amend`：修改最后一次提交。

{{< bs/alert warning >}}
--amend作用是对上一次的提交进行修改。这个命令会将暂存区中的更改添加到上一次提交中，而不是创建一个新的提交。
{{< /bs/alert >}}

## 四、推送更改

要向远程仓库推送更改，你需要使用 `git push` 命令。以下是一些常用的 `git push` 命令和可选参数：
1. **基本推送**：将本地分支的更改推送到远程仓库的对应分支。
 ```bash
git push origin <分支名>
 ```
其中 `<分支名>` 是你想要推送的本地分支名，<span style="background:#fff88f">默认情况下，Git会将当前分支的更改推送到远程仓库中与之对应的同名分支。</span>`origin` 是远程仓库的默认名称，但你可以根据需要更改它。

如果你想要推送到远程仓库的其他分支，你需要指定远程分支的名称。例如，如果你想要将本地的 feature-branch 分支推送到远程仓库的 remote-feature-branch 分支，你可以这样做：
```bash
git push origin feature-branch:remote-feature-branch
```

在这个例子中，冒号前面的 feature-branch 是本地分支的名称，冒号后面的 remote-feature-branch 是远程分支的名称。

如果你想要推送当前分支到远程仓库的一个不同名称的分支，你可以省略本地分支名称，只指定远程分支名称：
```bash
git push origin :remote-feature-branch
```


2. **强制推送**：使用 `-f` 或 `--force` 参数，可以强制推送，这会覆盖远程仓库中的历史记录。**注意：这可能会丢失其他人的工作，因此请谨慎使用。**
```bash
git push -f origin <分支名>
```

3. **删除远程分支**：使用 `--delete` 参数，可以删除远程仓库中的分支。
```bash
git push origin --delete <分支名>
```

4. **跟踪分支**：如果你刚刚克隆了一个仓库，并且想要推送一个新的分支到远程仓库，你可以使用 `-u` 或 `--set-upstream` 参数来设置跟踪分支。
```bash
git push -u origin <分支名>
```
这样，以后你可以直接使用 `git push` 而不需要指定远程仓库和分支名。

5. **推送所有标签**：如果你想推送所有本地标签到远程仓库，可以使用 `--tags` 参数。
```bash
git push --tags
```

6. **dry run**：使用 `--dry-run` 参数，可以模拟推送过程，但不会实际修改远程仓库。
```bash
git push --dry-run origin <分支名>
```

7. **安静模式**：使用 `-q` 或 `--quiet` 参数，可以减少命令的输出。
```bash
git push -q origin <分支名>
```

8. **显示进度**：使用 `--progress` 参数，可以显示推送的进度。
```bash
git push --progress origin <分支名>
```
请记住，推送更改之前，通常需要先拉取远程仓库的最新更改，以避免冲突。你可以使用 `git pull` 命令来拉取远程分支的更新。
```bash
git pull origin <分支名>
```
在实际操作中，建议遵循团队的Git工作流程，并确保你的更改不会破坏其他人的工作。




## 五、分支管理
### 1.创建新分支：
```bash
git branch [分支名]
```
  可选参数：
  - `-b`：创建并切换到新分支。
### 2.切换分支：
```bash
git branch                //查看分支信息
git branch -a             //显示所有分支，包括远程分支
git checkout [分支名]      //切换分支
git checkout -b [分支名]   //创建并切换到新分支
```
### 3.合并分支：
```bash
git merge [分支名]
```
  可选参数：
  - `--no-ff`：禁用快速前进合并。
## 六、撤销更改
### 1.撤销工作区更改：
```bash
git checkout -- [文件名]
```
### 2.撤销提交：
```bash
git reset --hard [提交哈希]
```
  可选参数：
  - `--soft`：保留工作区和暂存区的更改。
  - `--mixed`：保留工作区的更改（默认）。
  - `--hard`：不保留工作区和暂存区的更改。
## 七、版本回退
- 切换到历史版本：
```bash
git checkout [提交哈希]
```
- 回退到历史版本
```bash
git reset --hard [提交哈希]
```
 可选参数：
  - `--soft`：保留工作区和暂存区的更改。
  - `--mixed`：保留工作区的更改（默认）。
  - `--hard`：不保留工作区和暂存区的更改。

{{< bs/alert warning >}}
git checkout 命令用于切换分支或切换到特定的提交。git reset命令通常用于撤销提交，回到特定的旧版本，并且丢弃所有在指定提交之后所做的更改。
{{< /bs/alert >}}

|  | git checkout | git reset |
|-------|-------|-------|
| 工作目录和暂存区 | <span style="background:#fff88f">会保留</span>工作目录和暂存区的更改 | 默认<span style="background:#fff88f">不保留</span>暂存区的更改，<span style="background:#fff88f">保留</span>工作区的更改，有--soft,--mixed,--hard三种参数可选 |
| 用途 | 通常用于开发过程中的分支切换或历史版本切换 | 通常用于撤销提交或重置到特定的旧版本 |

- 强制推送更改：
```bash
git push [远程仓库名] --force
git push [远程仓库名] -f
```
  可选参数：
  - `--set-upstream`：将本地分支与远程分支关联。
## 八、查看和比较更改
### 1. 查看提交历史：
```bash
git log
```
  可选参数：
  - `--oneline`：简化输出。
  - `--graph`：显示分支和合并的历史。
### 2. 查看文件更改：
```bash
git diff [文件名]
```
## 九、保存当前的工作进度
git stash 命令用于暂时存储你的工作进度。当你需要暂时中断当前的工作，比如切换到另一个分支处理紧急问题，或者拉取远程仓库的最新代码，但又不想丢失当前的工作进度时，git stash 非常有用。
<br />
<br />
①暂存当前工作进度：
```bash
git stash
```
②查看暂存列表：
```bash
git stash list
```
③应用暂存：
```bash
git stash apply
```
④删除暂存：
```bash
git stash drop
```
⑤清空暂存：
```bash
git stash clear
```
通过将这些命令按照类别进行整理，您可以更容易地找到并理解与您当前任务相关的Git命令。在使用Git时，建议从简单的命令开始，逐步学习并尝试更复杂的操作，以便更好地掌握Git的使用。
