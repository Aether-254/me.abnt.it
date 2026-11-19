# me.abnt.it

个人主页与博客。SvelteKit 5 + Tailwind CSS 4 + mdsvex，部署在 Vercel。

## 开发

```bash
pnpm install
pnpm dev
```

## 写文章

在 `src/content/posts/` 新建 `slug.md`，frontmatter 字段：`title`、`date`（YYYY-MM-DD）、`summary`、`tags`、可选 `draft`。
或者打开 [me.abnt.it/admin](https://me.abnt.it/admin)，进入 Pages CMS，用 GitHub 登录后编辑。

### 网页编辑器

Pages CMS 的配置在 `.pages.yml`，直接读取和提交此仓库 `main` 分支的文件，没有独立内容数据库。

- 文章：富文本 / Markdown 源码双模式，支持图片上传，标题、摘要、日期、标签单独填写。
- 想暂不发布时打开“草稿”；关闭“草稿”并保存后，会出现在博客列表和 RSS 中。
- 创建时可以指定文件名，发布后不允许在 CMS 中改名，避免链接及评论映射失效。
- 图片保存在 `static/uploads/`，正文中的图片地址为 `/uploads/...`。
- AI 页的文案、标签、模型和工具覆盖规则均可编辑；`site.ts` 保留代码编辑入口。
- 保存会提交到 GitHub，并触发原有 Vercel 部署；提交成功不代表部署已经完成，发布后请检查 Vercel 结果。
- 仓库本身是公开的，草稿只是不在站点列表展示，Markdown 文件及 Git 历史仍然公开，请勿写入秘密。

首次使用需要在 [Pages CMS](https://app.pagescms.org) 登录，并将 GitHub App 安装到 **Only select repositories → me.abnt.it**。无需向 CMS 提供个人访问令牌。

### 文章评论

每篇文章底部使用 Giscus，对应 `Aether-254/me.abnt.it` 仓库的 `Announcements` Discussions 分类。首次评论或回应时由 Giscus 创建讨论。

- 通过 `/blog/<slug>` 严格匹配，每篇文章独立；SvelteKit 站内跳转会重建评论组件。
- 滚动到评论区附近才加载第三方脚本，首页和列表页不加载。
- 中文界面，自定义主题跟随系统明暗模式；评论异常时保留 GitHub 讨论区入口。
- 仓库已启用 Discussions；还需将 [Giscus App](https://github.com/apps/giscus) 安装到 **Only select repositories → me.abnt.it**。
- `giscus.json` 将嵌入来源限定为 `https://me.abnt.it`。本地和其他域名预览不能直接嵌入线上评论。
- 评论区不需要站点 API Key 或 GitHub Token。评论者通过 Giscus 自己的 GitHub OAuth 登录，评论内容公开。

Decap 的静态管理页和旧 OAuth 代理已移除；旧的 GitHub OAuth App 不再使用，可在确认迁移完成后自行撤销。

## 环境变量

| 变量 | 用途 |
| --- | --- |
| `GITHUB_TOKEN` | 构建时拉取仓库列表，避免匿名限流（可选） |

## 部署

推送到 `main` 即触发 Vercel 构建；手动可执行 `vercel --prod`。
