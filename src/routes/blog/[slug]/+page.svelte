<script lang="ts">
	import Comments from '$lib/components/Comments.svelte';
	let { data } = $props();
	const Post = $derived(data.component as any);
</script>

<Post {...data.meta} />

{#key data.meta.slug}
	<Comments slug={data.meta.slug} />
{/key}

<div class="mx-auto max-w-3xl px-6 pb-16">
	<a href="/blog" class="font-mono text-sm text-muted hover:text-accent">&larr; 返回列表</a>
</div>
