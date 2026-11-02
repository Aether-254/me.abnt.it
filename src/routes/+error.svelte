<script lang="ts">
	import { page } from '$app/state';

	// SvelteKit's default messages are English; show Chinese for the common cases.
	const message = $derived(
		page.status === 404
			? '这个页面不存在，或者已经搬走了。'
			: page.status >= 500
				? '服务器出了点问题，请稍后再试。'
				: (page.error?.message ?? '出了点问题。')
	);
</script>

<section class="mx-auto max-w-3xl px-6 py-32 text-center">
	<p class="font-serif text-6xl font-semibold text-accent">{page.status}</p>
	<p class="mt-4 text-muted">{message}</p>
	<a href="/" class="mt-8 inline-block text-sm text-muted hover:text-accent">&larr; 回到首页</a>
</section>
