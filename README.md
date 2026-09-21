# me.abnt.it

个人主页与博客。SvelteKit 5 + Tailwind CSS 4 + mdsvex，部署在 Vercel。

## 开发

```bash
pnpm install
pnpm dev
```

## 写文章

在 `src/content/posts/` 新建 `slug.md`，frontmatter 字段：`title`、`date`（YYYY-MM-DD）、`summary`、`tags`、可选 `draft`。
或者打开 `/admin`，用 GitHub 登录后通过 Decap CMS 编辑。

## 环境变量

| 变量 | 用途 |
| --- | --- |
| `GITHUB_TOKEN` | 构建时拉取仓库列表，避免匿名限流（可选） |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | Decap CMS 的 GitHub OAuth App（`/admin` 登录用） |

## 部署

推送到 `main` 即触发 Vercel 构建；手动可执行 `vercel --prod`。
