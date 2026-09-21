<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { site } from '$lib/site';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const nav = [
		{ href: '/', label: '首页' },
		{ href: '/projects', label: '项目' },
		{ href: '/blog', label: '博客' },
		{ href: '/ai', label: 'AI' },
		{ href: '/about', label: '关于' }
	];

	const active = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<svelte:head>
	<title>{page.data.title ? `${page.data.title} · ${site.name}` : site.title}</title>
	<meta name="description" content={page.data.description ?? site.description} />
	<meta property="og:site_name" content={site.name} />
	<meta property="og:title" content={page.data.title ?? site.title} />
	<meta property="og:description" content={page.data.description ?? site.description} />
	<meta property="og:url" content={site.url + page.url.pathname} />
	<link rel="canonical" href={site.url + page.url.pathname} />
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<header class="sticky top-0 z-10 border-b border-line/70 bg-bg/80 backdrop-blur">
		<nav class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
			<a href="/" class="font-mono text-sm font-semibold tracking-tight">
				<span class="text-accent">~</span>/{site.name.toLowerCase()}
			</a>
			<ul class="flex gap-1 text-sm">
				{#each nav as item}
					<li>
						<a
							href={item.href}
							class="rounded-md px-3 py-1.5 transition-colors hover:bg-panel hover:text-fg {active(item.href) ? 'text-fg' : 'text-muted'}"
							aria-current={active(item.href) ? 'page' : undefined}
						>{item.label}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</header>

	<main class="flex-1">
		{@render children()}
	</main>

	<footer class="border-t border-line/70">
		<div class="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 font-mono text-xs text-muted md:flex-row md:justify-between">
			<span>&copy; {new Date().getFullYear()} {site.name}. Built with SvelteKit, deployed on Vercel.</span>
			<span class="flex gap-4">
				<a href={site.github} class="hover:text-accent">GitHub</a>
				<a href={site.bilibili} class="hover:text-accent">Bilibili</a>
				<a href="/rss.xml" class="hover:text-accent">RSS</a>
			</span>
		</div>
	</footer>
</div>
