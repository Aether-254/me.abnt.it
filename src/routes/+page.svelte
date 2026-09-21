<script lang="ts">
	import { site, links, skills, now, featured } from '$lib/site';
	import { formatDate } from '$lib/blog';
	import RepoCard from '$lib/components/RepoCard.svelte';

	let { data } = $props();
</script>

<section class="mx-auto max-w-5xl px-6 pt-24 pb-16">
	<p class="font-mono text-sm text-accent">hello, world</p>
	<h1 class="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
		{site.name}
	</h1>
	<p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
		写 Minecraft mod、做 Unity 游戏、折腾 LLM 基础设施，偶尔逆向点东西。
		这里是个人主页与博客。
	</p>
	<div class="mt-8 flex flex-wrap gap-3">
		{#each links as l}
			<a href={l.href} target="_blank" rel="noopener" class="group rounded-lg border border-line bg-panel px-4 py-2 text-sm transition-colors hover:border-accent">
				<span class="text-fg">{l.label}</span>
				<span class="ml-2 font-mono text-xs text-muted group-hover:text-accent">{l.note}</span>
			</a>
		{/each}
	</div>
	<dl class="mt-10 flex gap-10 font-mono text-sm">
		<div><dt class="text-muted">public repos</dt><dd class="text-2xl">{data.stats.repos}</dd></div>
		<div><dt class="text-muted">stars</dt><dd class="text-2xl">{data.stats.stars}</dd></div>
		<div><dt class="text-muted">based in</dt><dd class="text-2xl">{site.location.split(',')[0]}</dd></div>
	</dl>
</section>

<section class="mx-auto max-w-5xl px-6 py-12">
	<h2 class="font-mono text-sm uppercase tracking-widest text-muted">Now</h2>
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
		<h2 class="font-mono text-sm uppercase tracking-widest text-muted">Featured</h2>
		<a href="/projects" class="text-sm text-accent hover:underline">全部项目</a>
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
		<h2 class="font-mono text-sm uppercase tracking-widest text-muted">Recently pushed</h2>
		<div class="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each data.recent as repo}<RepoCard {repo} />{/each}
		</div>
	</section>
{/if}

<section class="mx-auto max-w-5xl px-6 py-12">
	<h2 class="font-mono text-sm uppercase tracking-widest text-muted">Stack</h2>
	<div class="mt-6 grid gap-6 md:grid-cols-2">
		{#each skills as s}
			<div>
				<h3 class="text-sm font-semibold text-muted">{s.group}</h3>
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
			<h2 class="font-mono text-sm uppercase tracking-widest text-muted">Writing</h2>
			<a href="/blog" class="text-sm text-accent hover:underline">全部文章</a>
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
