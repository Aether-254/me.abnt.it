<script lang="ts">
	let { data } = $props();
	const Post = $derived(data.component as any);
</script>

<Post {...data.meta} />

<div class="mx-auto max-w-3xl px-6 pb-16">
	<a href="/blog" class="font-mono text-sm text-muted hover:text-accent">&larr; 返回列表</a>
</div>
