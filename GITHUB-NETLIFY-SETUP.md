# GitHub + Netlify 发布设置指南

这份说明面向第一次使用 GitHub 的团队成员。目标是把 `research.conservision.com` 的网站内容放到 GitHub，由 Netlify 自动发布。

## 一、你要记住的三个名字

```text
本地项目文件夹：
/Users/weiq/Documents/Codex/ConserVision 网站部署/research-site

GitHub 仓库：
建议命名为 conservision-research

网站域名：
research.conservision.com
```

## 二、第一次上传到 GitHub

如果你不熟悉命令行，建议使用 GitHub Desktop。

1. 安装并登录 GitHub Desktop。
2. 点击 `File`。
3. 点击 `Add Local Repository...`。
4. 选择这个文件夹：

```text
/Users/weiq/Documents/Codex/ConserVision 网站部署/research-site
```

5. 如果 GitHub Desktop 提示这还不是一个 Git 仓库，选择 `create a repository`。
6. Repository name 建议填写：

```text
conservision-research
```

7. Local path 保持为 `research-site` 这个文件夹。
8. 点击 `Create Repository`。
9. 点击 `Publish repository` 上传到 GitHub。

注意：如果页面上有隐私选项，建议先选择 Private。确认无敏感内容后，再决定是否公开。

## 三、连接 Netlify

1. 登录 Netlify。
2. 进入原来部署 `research.conservision.com` 的那个 Site。
3. 找到 `Site configuration` 或 `Build & deploy`。
4. 选择连接 GitHub repository。
5. 选择刚才上传的仓库 `conservision-research`。
6. 按下面方式填写：

如果 GitHub 仓库根目录就是 `research-site`：

```text
Base directory: 留空
Build command: 留空
Publish directory: .
```

如果 GitHub 仓库根目录是上一级 `ConserVision 网站部署`：

```text
Base directory: research-site
Build command: 留空
Publish directory: .
```

7. 保存设置。
8. 触发一次 Deploy。
9. 打开下面地址检查：

```text
https://research.conservision.com/
https://research.conservision.com/evaluation/2026/
https://research.conservision.com/ftg/2004-review/
```

## 四、推荐的 GitHub 团队分工

如果你们使用 GitHub Organization，建议建这几个 Team：

```text
research-admins       网站负责人
evaluation-editors    ICOMOS evaluation 负责人
ftg-editors           FTG 负责人
shared-editors        Quarterly Sharing / shared 负责人
```

本项目已经准备了 `.github/CODEOWNERS` 文件。以后有人修改对应专题时，GitHub 可以自动提醒对应负责人审核。

如果你们还没有 GitHub Organization，也可以先不用 Team，直接把 `.github/CODEOWNERS` 里的团队名改成个人 GitHub 用户名，例如：

```text
/evaluation/ @someone
/ftg/ @another-person
```

## 五、建议开启的 GitHub 保护规则

在 GitHub 仓库里：

1. 打开 `Settings`。
2. 找到 `Branches` 或 `Rulesets`。
3. 保护 `main` 分支。
4. 建议开启：

```text
Require a pull request before merging
Require approvals
Require review from Code Owners
```

这样同事修改专题页面时，不会直接影响正式网站。需要先经过 Pull Request 和审核。

## 六、日常修改网页的最简单方式

1. 打开 GitHub 仓库。
2. 进入自己负责的文件夹。
3. 点开要改的文件。
4. 点击右上角铅笔图标。
5. 修改内容。
6. 页面底部选择 `Create a new branch for this commit and start a pull request`。
7. 点击 `Propose changes`。
8. 创建 Pull Request。
9. 等待预览链接和负责人审核。

## 七、每个专题应该怎么放文件

建议每个专题都按这个形式整理：

```text
topic-name/
  index.html
  styles.css
  app.js
  assets/
  data/
```

不是每个页面都必须有 `app.js` 或 `data/`。如果只是普通文字页面，一个 `index.html` 就可以。

## 八、Quarterly Sharing 的建议位置

现在 `shared/` 里已经有共用样式。为了避免“共用资源”和“Quarterly Sharing 页面”混在一起，建议未来这样调整：

```text
shared/
  research.css

quarterly-sharing/
  index.html
  data/
  assets/
```

对应网址：

```text
https://research.conservision.com/quarterly-sharing/
```

如果你仍然希望网址叫：

```text
https://research.conservision.com/shared/
```

也可以在 `shared/` 里增加 `index.html`，但要注意不要误删 `research.css`。
