---
title: "HB Framework Showcases"
description: Who's using HB framework?
layout: landing
date: 2023-09-02T23:39:04+08:00
draft: false
series:
  - Showcases
categories:
tags:
images:
authors:
  - HB
aliases:
  - docs/sites
menu:
  main:
    parent: docs
    name: Showcases
    params:
      icon:
        vendor: bs
        name: globe
        color: green
---

# {{< param title >}} { .mb-3 }

Sharing with us about your sites built with HB, once the request is approved, your sites will be shown on our homepage and this page.
{ .lead .mb-5 }

## How to Add My Sites?

### Using CMS (Recommended)

We set up a CMS for open authoring, you can add and modify your sites [here](https://hbstack.dev/admin/#/collections/sites).

### Using CLI or GitHub Web UI

Create a data file with following format to describe your site under the [/data/sites/](https://github.com/hbstack/site/blob/main/data/sites/) folder, then create a PR and waiting for reviewing and merging.

{{< bs/alert warning >}}
{{< markdownify >}}
The data file naming convention: use the domain name and replace the dot (`.`) with the dash (`-`), for example, `example.org` should saved as `example-org.toml`.
{{< /markdownify >}}
{{< /bs/alert >}}

```toml
domain = "example.org"
title = "Site title"
date = "2023-xx-xx"
# logo = ""
# logo_width = 100
# logo_height = 100
```

| Property | Type | Description |
| -------- | :--: | ----------- |
| `domain` | string | Site domain, **required**. |
| `title` | string | Site title, **required**, please take as short as possible, otherwise it'll be truncated. |
| `date` | date | The date you're requesting to add the site, such as `2023-09-01`, **required**. |
| `logo` | string | Site logo, optional. |
| `logo_width` | number | Logo intrinsic width, required when `logo` is set. |
| `logo_height` | number | Logo intrinsic height, required when `logo` is set. |

## Sites Using HB Framework {.text-center .mt-5}

{{< sites >}}
