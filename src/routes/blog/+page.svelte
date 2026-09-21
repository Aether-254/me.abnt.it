<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { formatDate } from '$lib/blog';
	let { data } = $props();

	const tag = $derived(browser ? page.url.searchParams.get('tag') : null);
	const posts = $derived(tag ? data.posts.filter((p) => p.tags?.includes(tag)) : data.posts);
</script>

<section class="mx-auto max-w-3xl px-6 py-16">
	<h1 class="text-3xl font-semibold tracking-tight md:text-4xl">博客</h1>
	<p class="mt-3 text-muted">Minecraft mod 开发、Unity、LLM、逆向，以及不知道该放哪的东西。</p>

	{#if data.tags.length}
		<ul class="mt-6 flex flex-wrap gap-2">
			<li><a href="/blog" class="rounded-full border px-3 py-0.5 font-mono text-xs {tag ? 'border-line text-muted' : 'border-accent text-accent'}">all</a></li>
			{#each data.tags as t}
				<li><a href="/blog?tag={t}" class="rounded-full border px-3 py-0.5 font-mono text-xs {tag === t ? 'border-accent text-accent' : 'border-line text-muted hover:border-accent'}">#{t}</a></li>
			{/each}
		</ul>
	{/if}

	<ul class="mt-10 divide-y divide-line">
		{#each posts as p}
			<li class="py-6">
				<a href="/blog/{p.slug}" class="group block">
					<time class="font-mono text-xs text-muted">{formatDate(p.date)}</time>
					<h2 class="mt-1 text-xl font-medium group-hover:text-accent">{p.title}</h2>
					<p class="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
				</a>
			</li>
		{:else}
			<li class="py-6 text-muted">还没有文章。</li>
		{/each}
	</ul>
</section>
