<script lang="ts">
	import { page } from '$app/state';
</script>

<section class="mx-auto max-w-3xl px-6 py-32 text-center">
	<p class="font-mono text-6xl font-semibold text-accent">{page.status}</p>
	<p class="mt-4 text-muted">{page.error?.message ?? 'Something went wrong'}</p>
	<a href="/" class="mt-8 inline-block font-mono text-sm text-muted hover:text-accent">&larr; 回首页</a>
</section>
