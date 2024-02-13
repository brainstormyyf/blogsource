---
type: docs
title: "HB 修訂模塊"
linkTitle: "修訂"
description: "描述頁面的額外信息，如創建日期、修改日期等。"
date: 2023-12-22T14:45:40+08:00
draft: false
nav_weight: 1000
nav_icon:
  vendor: bs
  name: git
series:
  - 模塊
categories:
  - 修訂
tags:
  - Lastmod
images:
authors:
  - HB
---

{{% hb-module "revision" %}}

## 模板

模板 `hb/modules/revision/index` 接受當前頁面變量作為上下文。

```go-html-template
{{- partial "hb/modules/revision/index" . }}
```

## 站點參數

{{< bs/config-toggle filename="hugo" title="站點參數" >}}
{{< code-snippet "params.yaml" >}}
{{< /bs/config-toggle >}}

| Name | Type | Default | Required | Description |
| --- | :-: | :-: | :-: | --- |
| `date_format` | string | `:date_full` | - | 另請參閱 [time.Format](https://gohugo.io/functions/time/format/)。
| `icons` | boolean | `true` | - | 是否顯示圖標。
| `font_size` | string | `.825rem` | - | 文本字體大小。
| `created_at` | boolean | `true` | - | 為 `false` 時，隱藏創建日期。
