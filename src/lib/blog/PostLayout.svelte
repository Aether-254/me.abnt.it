<script lang="ts">
	import { formatDate } from '$lib/blog';
	import type { Snippet } from 'svelte';

	let {
		title,
		date,
		summary,
		tags = [],
		children
	}: { title: string; date: string; summary: string; tags?: string[]; children: Snippet } = $props();
</script>

<article class="mx-auto max-w-3xl px-6 py-16">
	<header class="mb-10 border-b border-line pb-8">
		<p class="font-mono text-sm text-muted">{formatDate(date)}</p>
		<h1 class="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
		{#if summary}<p class="mt-4 text-lg text-muted">{summary}</p>{/if}
		{#if tags.length}
			<ul class="mt-4 flex flex-wrap gap-2">
				{#each tags as tag}
					<li><a href="/blog?tag={tag}" class="rounded-full border border-line px-3 py-0.5 font-mono text-xs text-muted hover:border-accent hover:text-accent">#{tag}</a></li>
				{/each}
			</ul>
		{/if}
	</header>
	<div class="prose prose-invert prose-lg max-w-none prose-a:text-accent prose-code:before:content-none prose-code:after:content-none">
		{@render children()}
	</div>
</article>
