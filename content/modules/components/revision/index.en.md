---
type: docs
title: "HB Revision Module"
linkTitle: "Revision"
description: "Describe page with extra info, such as the create date, modified date and so on."
date: 2023-12-22T14:45:40+08:00
draft: false
nav_weight: 1000
nav_icon:
  vendor: bs
  name: git
series:
  - Modules
categories:
  - Revision
tags:
  - Lastmod
images:
authors:
  - HB
---

{{% hb-module "revision" %}}

## Partial

The partial `hb/modules/revision/index` accepts the current page as the context.

```go-html-template
{{- partial "hb/modules/revision/index" . }}
```

## Site Parameters

{{< bs/config-toggle filename="hugo" title="Site Parameters" >}}
{{< code-snippet "params.yaml" >}}
{{< /bs/config-toggle >}}

| Name | Type | Default | Required | Description |
| --- | :-: | :-: | :-: | --- |
| `date_format` | string | `:date_full` | - | See [time.Format](https://gohugo.io/functions/time/format/).
| `icons` | boolean | `true` | - | Whether to show icons.
| `font_size` | string | `.825rem` | - | The font size of text.
| `created_at` | boolean | `true` | - | When `false`, hide the create date.
