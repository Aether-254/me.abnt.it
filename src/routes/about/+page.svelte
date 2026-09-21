<script lang="ts">
	import { site, links, skills } from '$lib/site';
</script>

<svelte:head><title>关于 · {site.name}</title></svelte:head>

<section class="mx-auto max-w-3xl px-6 py-16">
	<h1 class="text-3xl font-semibold tracking-tight md:text-4xl">关于</h1>
	<div class="prose prose-invert mt-8 max-w-none prose-a:text-accent">
		<p>我是 {site.name}，在{site.location.split(',')[0]}。主要写 Java / Kotlin / C# / TypeScript，兴趣集中在三块：</p>
		<ul>
			<li><strong>Minecraft mod 开发</strong>：Fabric 与 NeoForge，Create 机械动力附属，跨版本移植（Mixin、字节码校验、Gradle 工具链），以及一部分 GLSL 着色器。</li>
			<li><strong>游戏开发</strong>：Unity / C#，正在做的 <a href="https://github.com/Aether-254/Equilibrium_pub">Equilibrium</a> 是一款基于真实物理化学的 2D 工厂建造游戏。</li>
			<li><strong>LLM 与基础设施</strong>：维护公益 LLM API 站 <a href="https://api.abnt.it">api.abnt.it</a>（Docker / k8s），学习模型训练与推理。</li>
		</ul>
		<p>此外也做一些逆向与安全分析：Java Agent 反作弊（<a href="https://aetherac.abnt.it">AetherAC</a>）、VMProtect 样本、Windows 取证。运营 Minecraft 无规则服务器 <a href="https://abnt.it">abnt.it</a>。</p>

		<h2>联系</h2>
		<ul>
			{#each links.slice(0, 3) as l}<li>{l.label}: <a href={l.href}>{l.note}</a></li>{/each}
		</ul>

		<h2>本站</h2>
		<p>SvelteKit 5 + Tailwind CSS 4 + mdsvex，部署在 Vercel，DNS 走 Cloudflare。博客文章为仓库内 Markdown，项目列表构建时从 GitHub API 拉取。</p>
	</div>

	<h2 class="mt-12 font-mono text-sm uppercase tracking-widest text-muted">Stack</h2>
	<div class="mt-4 grid gap-6 md:grid-cols-2">
		{#each skills as s}
			<div>
				<h3 class="text-sm font-semibold text-muted">{s.group}</h3>
				<ul class="mt-2 flex flex-wrap gap-2">
					{#each s.items as item}<li class="rounded-md border border-line px-2.5 py-1 font-mono text-xs">{item}</li>{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>
