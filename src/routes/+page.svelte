<script lang="ts">
	import { site, links, skills, now, featured } from '$lib/site';
	import { formatDate } from '$lib/blog';
	import RepoCard from '$lib/components/RepoCard.svelte';
	import sparkleRaw from '$lib/assets/sparkle.svg?raw';

	// Inline so the icon inherits currentColor from the button; decorative, so hidden from screen readers.
	const sparkle = sparkleRaw.replace('<svg ', '<svg aria-hidden="true" focusable="false" ');

	let { data } = $props();
</script>

<section class="mx-auto max-w-5xl px-6 pt-24 pb-16">
{@html '<!-- TXT 4.abnt.it -->'}
	<p class="text-sm font-medium tracking-wide text-accent">你好，欢迎来到</p>
	<h1 class="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
		{site.name}
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
		写 Minecraft mod，做 Unity 游戏，折腾 LLM 基础设施，偶尔也逆向点东西。
		这里是我的个人主页和博客。
	</p>
	<div class="mt-8 flex flex-wrap gap-3">
		{#each links as l}
			{#if l.featured}
				<a href={l.href} target="_blank" rel="noopener" class="group inline-flex items-center gap-2 rounded-lg border border-accent/60 bg-accent/10 px-4 py-2 text-sm transition-colors hover:border-accent hover:bg-accent/15">
					<span class="brand-icon text-base text-accent">{@html sparkle}</span>
					<span class="font-medium text-fg">{l.label}</span>
					<span class="rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold leading-none text-bg">Featured</span>
					<span class="font-mono text-xs text-muted group-hover:text-accent">{l.note}</span>
				</a>
			{:else}
				<a href={l.href} target="_blank" rel="noopener" class="group rounded-lg border border-line bg-panel px-4 py-2 text-sm transition-colors hover:border-accent">
					<span class="text-fg">{l.label}</span>
					<span class="ml-2 font-mono text-xs text-muted group-hover:text-accent">{l.note}</span>
				</a>
			{/if}
		{/each}
	</div>
	<dl class="mt-10 flex gap-10 text-sm">
		<div><dt class="text-muted">公开仓库</dt><dd class="font-serif text-2xl">{data.stats.repos}</dd></div>
		<div><dt class="text-muted">获得 Star</dt><dd class="font-serif text-2xl">{data.stats.stars}</dd></div>
		<div><dt class="text-muted">所在地</dt><dd class="font-serif text-2xl">{site.location}</dd></div>
	</dl>
</section>

<section class="mx-auto max-w-5xl px-6 py-12">
	<h2 class="eyebrow">最近在做</h2>
	<div class="mt-6 grid gap-4 md:grid-cols-2">
		{#each now as n}
			<div class="rounded-xl border border-line bg-panel p-5">
				<h3 class="font-semibold">{n.title}</h3>
				<p class="mt-2 text-sm leading-relaxed text-muted">{n.detail}</p>
			</div>
		{/each}
	</div>
</section>

<section class="mx-auto max-w-5xl px-6 py-12">
	<div class="flex items-baseline justify-between">
		<h2 class="eyebrow">精选项目</h2>
		<a href="/projects" class="text-sm text-accent hover:underline">查看全部项目 →</a>
	</div>
	<div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each featured as f}
			<a href="https://github.com/{f.repo}" target="_blank" rel="noopener" class="flex flex-col rounded-xl border border-line bg-panel p-5 transition-colors hover:border-accent-2">
				<span class="font-mono text-xs text-accent-2">{f.tag}</span>
				<h3 class="mt-2 font-semibold">{f.name}</h3>
				<p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{f.desc}</p>
			</a>
		{/each}
	</div>
</section>

{#if data.recent.length}
	<section class="mx-auto max-w-5xl px-6 py-12">
		<h2 class="eyebrow">最近更新</h2>
		<div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each data.recent as repo}<RepoCard {repo} />{/each}
		</div>
	</section>
{/if}

<section class="mx-auto max-w-5xl px-6 py-12">
	<h2 class="eyebrow">技术栈</h2>
	<div class="mt-6 grid gap-6 md:grid-cols-2">
		{#each skills as s}
			<div>
				<h3 class="font-sans text-sm font-semibold text-muted">{s.group}</h3>
				<ul class="mt-2 flex flex-wrap gap-2">
					{#each s.items as item}
						<li class="rounded-md border border-line px-2.5 py-1 font-mono text-xs">{item}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
</section>

{#if data.posts.length}
	<section class="mx-auto max-w-5xl px-6 py-12">
		<div class="flex items-baseline justify-between">
			<h2 class="eyebrow">最新文章</h2>
			<a href="/blog" class="text-sm text-accent hover:underline">查看全部文章 →</a>
		</div>
		<ul class="mt-6 divide-y divide-line">
			{#each data.posts as p}
				<li class="py-4">
					<a href="/blog/{p.slug}" class="group flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
						<time class="shrink-0 font-mono text-xs text-muted">{formatDate(p.date)}</time>
						<span class="font-medium group-hover:text-accent">{p.title}</span>
						<span class="text-sm text-muted md:ml-auto md:truncate md:max-w-xs">{p.summary}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
{/if}
