# ConserVision Research 网站协作指南

这个文件夹是 `research.conservision.com` 的网站内容。以后通过 GitHub 和 Netlify 发布时，请把这个 `research-site` 文件夹作为网站项目根目录。

## 当前页面结构

```text
research-site/
  index.html                 网站首页
  evaluation/                ICOMOS evaluation 专题
  ftg/                       Filling the Gaps 专题
  shared/                    共用样式，以及未来 Quarterly Sharing 页面
  netlify.toml               Netlify 发布和跳转配置
  _redirects                 Netlify 跳转配置
```

目前已经有内容的专题：

- `evaluation/2026/`：ICOMOS Evaluation Explorer 2026 页面。
- `ftg/2004-review/`：Filling the Gaps 2004 Review 页面。

未来计划补充：

- `shared/`：Quarterly Sharing 档案资料汇总页面，以及全站共用样式。

## 日常协作规则

请尽量按专题文件夹分工：

- 负责 ICOMOS evaluation 的同事主要修改 `evaluation/`。
- 负责 FTG 的同事主要修改 `ftg/`。
- 负责 Quarterly Sharing 的同事主要修改 `shared/`，未来也可以新增 `quarterly-sharing/` 页面入口。
- `index.html`、`netlify.toml`、`_redirects` 建议由网站负责人统一维护。

## 不建议随意修改的文件

这些文件会影响整个网站访问方式，修改前请先和网站负责人确认：

- `netlify.toml`
- `_redirects`
- `index.html`
- `.github/CODEOWNERS`

## GitHub 上的推荐工作流程

1. 在 GitHub 上打开本仓库。
2. 找到自己负责的专题文件夹。
3. 点击要修改的文件，例如 `index.html`、`app.js`、`styles.css` 或 `data/` 里的数据文件。
4. 点击铅笔图标编辑。
5. 保存时选择创建一个新分支，不要直接提交到 `main`。
6. 创建 Pull Request。
7. 等待对应专题负责人检查。
8. 审核通过后合并，Netlify 会自动发布。

## Netlify 发布说明

Netlify 应连接到这个 GitHub 仓库，并使用下面设置：

```text
Base directory: 留空，或指向 research-site（取决于仓库是否只包含本文件夹）
Build command: 留空
Publish directory: .
```

如果 GitHub 仓库的根目录就是 `research-site`，则 `Publish directory` 填 `.`。

如果 GitHub 仓库的根目录是上一级 `ConserVision 网站部署`，则建议 Netlify 设置：

```text
Base directory: research-site
Build command: 留空
Publish directory: .
```

## 建议使用的页面地址

```text
https://research.conservision.com/
https://research.conservision.com/evaluation/
https://research.conservision.com/evaluation/2026/
https://research.conservision.com/ftg/
https://research.conservision.com/ftg/2004-review/
```

以后新增专题时，建议使用类似结构：

```text
research-site/new-topic/
  index.html
  assets/
  data/
```

对应网址就是：

```text
https://research.conservision.com/new-topic/
```
