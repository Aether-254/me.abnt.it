---
title: Cloudflare™ Turnstile 逆向
date: 2026-11-19
summary: I Reverse Engineering
draft: false
---
Turnstile是Cloudflare开发的验证码系统，被用于无数网站的表单防护，拥有极其玄学的无感验证机制，还有让人怀疑人生的反复勾选循环，恶心了超过十万个甚至九万个自以为已经通过验证的合法用户。

哦对了，600010。

本文介绍 Turnstile 的 iFrame（这听起来像是一个苹果产品！）、JS、自定义 VM 是如何工作的，并告诉你为什么伪造 hostname 会使你变成滚木。

谁能想到，这一切的起因只是一个问题：能不能把服务方页面上的人机验证搬到我自己的 localhost 上完成。

---

1.滚木



&nbsp;