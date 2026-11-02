<script lang="ts">
	import RepoCard from '$lib/components/RepoCard.svelte';
	let { data } = $props();

	let lang = $state<string | null>(null);
	let q = $state('');

	const groups = [
		{ key: 'create', label: 'Create 附属', test: (n: string) => /^create-/i.test(n) },
		{ key: 'mc', label: '其他 Minecraft 项目', test: (n: string, l: string | null) => l === 'Java' || /mod|fabric|hack|xray|overlay|warning|toggle|vote|meter|bedtime|indicator|interference|history|damage|port|fly/i.test(n) },
		{ key: 'rest', label: '其他项目', test: () => true }
	];

	const filtered = $derived(
		data.repos.filter((r) =>
			(!lang || r.language === lang) &&
			(!q || (r.name + ' ' + (r.description ?? '')).toLowerCase().includes(q.toLowerCase()))
		)
	);
	const grouped = $derived.by(() => {
		const seen = new Set<string>();
		return groups.map((g) => ({
			...g,
			repos: filtered.filter((r) => !seen.has(r.name) && g.test(r.name, r.language) && seen.add(r.name))
		})).filter((g) => g.repos.length);
	});
</script>

<section class="mx-auto max-w-5xl px-6 py-16">
	<h1 class="text-3xl font-semibold tracking-tight md:text-4xl">项目</h1>
	<p class="mt-3 text-muted">数据来自 GitHub，构建时拉取并缓存，目前共有 {data.repos.length} 个非 fork 仓库。</p>

	<div class="mt-8 flex flex-wrap items-center gap-2">
		<input bind:value={q} placeholder="搜索项目…" class="rounded-md border border-line bg-panel px-3 py-1.5 font-mono text-sm outline-none focus:border-accent" />
		<button onclick={() => (lang = null)} class="rounded-md border px-3 py-1.5 font-mono text-xs {lang === null ? 'border-accent text-accent' : 'border-line text-muted'}">全部</button>
		{#each data.languages as l}
			<button onclick={() => (lang = lang === l ? null : l)} class="rounded-md border px-3 py-1.5 font-mono text-xs {lang === l ? 'border-accent text-accent' : 'border-line text-muted'}">{l}</button>
		{/each}
	</div>

	{#each grouped as g}
		<h2 class="eyebrow mt-12">{g.label} <span class="text-muted/60">· {g.repos.length}</span></h2>
		<div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each g.repos as repo (repo.name)}<RepoCard {repo} />{/each}
		</div>
	{:else}
		<p class="mt-12 text-muted">没有找到匹配的仓库。</p>
	{/each}
</section>
