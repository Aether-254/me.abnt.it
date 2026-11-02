<script lang="ts">
	import { site, links, skills } from '$lib/site';
</script>

<svelte:head><title>关于 · {site.name}</title></svelte:head>

<section class="mx-auto max-w-3xl px-6 py-16">
	<h1 class="text-3xl font-semibold tracking-tight md:text-4xl">关于</h1>
	<div class="prose mt-8 max-w-none">
		<p>我是 {site.name}，人在上海，平时主要写 Java、Kotlin、C# 和 TypeScript。兴趣集中在三个方向：</p>
		<ul>
			<li><strong>Minecraft mod 开发</strong>：基于 Fabric 与 NeoForge，做 Create（机械动力）附属和跨版本移植（涉及 Mixin、字节码校验与 Gradle 工具链），也写一些 GLSL 着色器。</li>
			<li><strong>游戏开发</strong>：用 Unity 和 C#。目前在做 <a href="https://github.com/Aether-254/Equilibrium_pub">Equilibrium</a>，一款以真实物理与化学为基础的 2D 工厂建造游戏。</li>
			<li><strong>LLM 与基础设施</strong>：维护公益 LLM API 站 <a href="https://api.abnt.it">api.abnt.it</a>（Docker / k8s），同时在学习模型的训练与推理。</li>
		</ul>
		<p>另外也做些逆向与安全分析：Java Agent 反作弊（<a href="https://aetherac.abnt.it">AetherAC</a>）、VMProtect 样本、Windows 取证。我还运营着一个 Minecraft 无规则服务器 <a href="https://abnt.it">abnt.it</a>。</p>

		<h2>联系方式</h2>
		<ul>
			{#each links.slice(0, 3) as l}<li>{l.label}：<a href={l.href}>{l.note}</a></li>{/each}
		</ul>

		<h2>关于本站</h2>
		<p>本站使用 SvelteKit 5、Tailwind CSS 4 和 mdsvex 构建，部署在 Vercel，DNS 由 Cloudflare 托管。博客文章是仓库里的 Markdown 文件，项目列表则在构建时从 GitHub API 拉取。</p>
	</div>

	<h2 class="eyebrow mt-12">技术栈</h2>
	<div class="mt-4 grid gap-6 md:grid-cols-2">
		{#each skills as s}
			<div>
				<h3 class="font-sans text-sm font-semibold text-muted">{s.group}</h3>
				<ul class="mt-2 flex flex-wrap gap-2">
					{#each s.items as item}<li class="rounded-md border border-line px-2.5 py-1 font-mono text-xs">{item}</li>{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>
