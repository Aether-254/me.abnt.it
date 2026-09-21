---
title: 站点上线：me.abnt.it 是怎么搭的
date: 2026-09-21
summary: SvelteKit 5 + Tailwind 4 + mdsvex，Vercel 托管，Cloudflare 解析，Decap CMS 直接改仓库。
tags: [svelte, meta]
---

这个站是我的个人主页兼博客。技术栈选择很直接：

- **SvelteKit 5**，全站预渲染成静态文件，没有运行时服务器。
- **Tailwind CSS 4**，主题变量全部在 `app.css` 的 `@theme` 块里。
- **mdsvex** 把 `src/content/posts/*.md` 编译成 Svelte 组件，代码高亮用 shiki 在构建期完成。
- **项目页**在构建时从 GitHub API 拉取全部公开仓库，所以每次 push 触发的 Vercel 构建都会刷新列表。
- **Decap CMS** 挂在 `/admin`，用 GitHub OAuth 登录后直接向仓库提交 Markdown，不需要数据库。

## 为什么不用 Supabase

博客文章是版本化的文本，Git 本身就是最合适的存储。Supabase 留给未来真正需要状态的功能（评论、访问统计）再加。

## 部署

```bash
pnpm build
vercel --prod
```

DNS 在 Cloudflare 上给 `me` 加一条 CNAME 指到 `cname.vercel-dns.com`，仅 DNS 不代理，让 Vercel 自己签证书。
