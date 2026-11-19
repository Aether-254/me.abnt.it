<script lang="ts">
	import { onMount } from 'svelte';
	import { site } from '$lib/site';

	let { slug }: { slug: string } = $props();
	let container: HTMLDivElement;
	let status = $state<'waiting' | 'loading' | 'ready' | 'error'>('waiting');
	const discussions = 'https://github.com/Aether-254/me.abnt.it/discussions/categories/announcements';

	onMount(() => {
		let timer: ReturnType<typeof setTimeout>;
		let started = false;
		const receive = (event: MessageEvent) => {
			const frame = container.querySelector('iframe');
			if (event.origin !== 'https://giscus.app' || event.source !== frame?.contentWindow) return;
			const message = event.data?.giscus;
			if (!message || typeof message !== 'object') return;
			if ('error' in message) {
				status = 'error';
				clearTimeout(timer);
			} else if ('resizeHeight' in message || 'discussion' in message) {
				status = 'ready';
				clearTimeout(timer);
			}
		};
		window.addEventListener('message', receive);

		const load = () => {
			if (started) return;
			started = true;
			status = 'loading';
			const script = document.createElement('script');
			script.src = 'https://giscus.app/client.js';
			script.async = true;
			script.crossOrigin = 'anonymous';
			const config = {
				repo: 'Aether-254/me.abnt.it',
				'repo-id': 'R_kgDOUjpyAA',
				category: 'Announcements',
				'category-id': 'DIC_kwDOUjpyAM4DLgPc',
				mapping: 'specific',
				term: `/blog/${slug}`,
				strict: '1',
				'reactions-enabled': '1',
				'emit-metadata': '0',
				'input-position': 'top',
				theme: `${site.url}/giscus/theme.css`,
				lang: 'zh-CN'
			};
			for (const [key, value] of Object.entries(config)) script.setAttribute(`data-${key}`, value);
			script.onerror = () => { status = 'error'; clearTimeout(timer); };
			container.append(script);
			timer = setTimeout(() => { if (status === 'loading') status = 'error'; }, 25000);
		};
		const observer = new IntersectionObserver((entries) => {
			if (entries.some((entry) => entry.isIntersecting)) {
				load();
				observer.disconnect();
			}
		}, { rootMargin: '240px' });
		observer.observe(container);
		return () => {
			observer.disconnect();
			clearTimeout(timer);
			window.removeEventListener('message', receive);
			container.replaceChildren();
		};
	});
</script>

<svelte:head>
	<meta name="giscus:backlink" content={`${site.url}/blog/${slug}`} />
</svelte:head>

<section aria-labelledby="comments-title" class="mx-auto max-w-3xl px-6 pb-16">
	<div class="mb-6 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-10">
		<div>
			<p class="eyebrow mb-2">读到这里，聊两句</p>
			<h2 id="comments-title" class="text-2xl font-semibold">评论</h2>
		</div>
		<a href={discussions} target="_blank" rel="noreferrer" class="text-sm text-muted hover:text-accent">
			在 GitHub 查看讨论 &nearr;
		</a>
	</div>
	<p class="mb-5 text-sm leading-relaxed text-muted">使用 GitHub 登录即可留言或回应，评论会公开保存在本站的 GitHub Discussions 中。</p>
	{#if status === 'loading'}
		<p role="status" class="mb-4 text-sm text-muted">正在加载评论…</p>
	{:else if status === 'error'}
		<p role="status" class="mb-4 rounded-lg border border-line bg-panel p-4 text-sm leading-relaxed text-muted">
			评论暂时无法加载，可以稍后刷新页面，或<a href={discussions} class="text-accent underline underline-offset-4">直接前往 GitHub 讨论区</a>。
		</p>
	{/if}
	<div bind:this={container} class="giscus min-h-16" class:hidden={status === 'error'}></div>
	<noscript><p>评论需要 JavaScript，也可以<a href={discussions}>在 GitHub 讨论区留言</a>。</p></noscript>
</section>
