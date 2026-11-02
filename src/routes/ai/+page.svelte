<script lang="ts">
	import { aiConfig, fmtCost, fmtTokens, type Ranked } from '$lib/ai';
	import BrandIcon from '$lib/components/BrandIcon.svelte';
	import StatIcon from '$lib/components/StatIcon.svelte';
	let { data } = $props();
	const ai = $derived(data.ai);
	const L = aiConfig.labels;

	// CMS strings may contain {days} / {updated} placeholders.
	const fill = (s: string, vars: Record<string, string | number>) =>
		s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
	const updated = $derived(
		ai ? new Date(ai.updatedAt).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }) : ''
	);

	const pct = (n: number) => `${Math.round(n * 100)}%`;
	const maxHeat = $derived(ai ? Math.max(1, ...ai.heatmap.map((d) => d.tokens)) : 1);
	const heat = (t: number) => (t === 0 ? 0 : Math.min(4, 1 + Math.floor((t / maxHeat) * 4)));
	const weeks = $derived.by(() => {
		if (!ai) return [];
		const first = new Date(ai.heatmap[0].date + 'T00:00:00Z').getUTCDay();
		const cells: ({ date: string; tokens: number } | null)[] = [...Array(first).fill(null), ...ai.heatmap];
		const out: typeof cells[] = [];
		for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7));
		return out;
	});
</script>

{#snippet bars(list: Ranked[])}
	<ol class="mt-4 space-y-3">
		{#each list as r (r.id)}
			<li class="grid grid-cols-[minmax(0,13rem)_1fr_auto] items-center gap-3 text-sm">
				<span class="flex min-w-0 items-center gap-2.5">
					<BrandIcon name={r.icon} class="text-xl text-fg" />
					<span class="min-w-0">
						<span class="block truncate" title={r.id}>{r.name}</span>
						{#if r.note}<span class="block truncate text-xs text-muted" title={r.note}>{r.note}</span>{/if}
					</span>
				</span>
				<span class="h-2 overflow-hidden rounded-full bg-line">
					<span class="block h-full rounded-full bg-accent" style="width:{Math.max(1, r.share * 100)}%"></span>
				</span>
				<span class="w-28 text-right font-mono text-xs text-muted">{fmtTokens(r.tokens)} <span class="inline-block w-9 text-fg">{pct(r.share)}</span></span>
			</li>
		{/each}
	</ol>
{/snippet}

{#snippet favorite(r: Ranked | null)}
	{#if r}
		<dd class="mt-2 flex items-center gap-2.5">
			<BrandIcon name={r.icon} class="text-2xl" />
			<span class="min-w-0">
				<span class="block truncate text-lg font-medium">{r.name}</span>
				{#if r.note}<span class="block truncate text-xs text-muted">{r.note}</span>{/if}
			</span>
		</dd>
		<dd class="mt-1 text-xs text-muted">{L.share} {pct(r.share)}</dd>
	{:else}
		<dd class="mt-2 text-lg font-medium">—</dd>
	{/if}
{/snippet}

<section class="mx-auto max-w-3xl px-6 py-16">
	<h1 class="text-3xl font-semibold tracking-tight md:text-4xl">AI</h1>
	<p class="mt-3 text-muted">{fill(aiConfig.intro, { days: ai?.days ?? 90 })}</p>

	{#if !ai}
		<p class="mt-12 rounded-xl border border-line bg-panel p-6 text-muted">{aiConfig.empty}</p>
	{:else}
		<dl class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
			<div>
				<dt class="eyebrow">{L.favoriteModel}</dt>
				{@render favorite(ai.favoriteModel)}
			</div>
			<div>
				<dt class="eyebrow">{L.favoriteTool}</dt>
				{@render favorite(ai.favoriteTool)}
			</div>
			<div>
				<dt class="eyebrow flex items-center gap-1.5"><StatIcon name="tokens" />{L.totalTokens}</dt>
				<dd class="mt-2 font-serif text-2xl">{fmtTokens(ai.totalTokens)}</dd>
			</div>
			<div>
				<dt class="eyebrow flex items-center gap-1.5"><StatIcon name="cost" />{L.totalCost}</dt>
				<dd class="mt-2 font-serif text-2xl">{fmtCost(ai.totalCost)}</dd>
				<dd class="mt-1 text-xs text-muted">{L.costNote}</dd>
			</div>
			<div>
				<dt class="eyebrow flex items-center gap-1.5"><StatIcon name="messages" />{L.messages}</dt>
				<dd class="mt-2 font-serif text-2xl">{ai.sessions.toLocaleString('en-US')}</dd>
			</div>
			<div>
				<dt class="eyebrow flex items-center gap-1.5"><StatIcon name="days" />{L.activeDays}</dt>
				<dd class="mt-2 font-serif text-2xl">{ai.activeDays} <span class="font-sans text-sm text-muted">/ {ai.days}</span></dd>
			</div>
		</dl>

		<div class="mt-12 overflow-x-auto">
			<div class="flex gap-1">
				{#each weeks as w}
					<div class="flex flex-col gap-1">
						{#each w as d}
							{#if d}
								<span class="size-3 rounded-[3px] heat-{heat(d.tokens)}" title="{d.date}: {fmtTokens(d.tokens)} tokens"></span>
							{:else}
								<span class="size-3"></span>
							{/if}
						{/each}
					</div>
				{/each}
			</div>
			<p class="mt-2 font-mono text-xs text-muted">{ai.since} — {ai.until}</p>
		</div>

		<h2 class="eyebrow mt-14">{L.byModel}</h2>
		{@render bars(ai.byModel)}

		<h2 class="eyebrow mt-14">{L.byTool}</h2>
		{@render bars(ai.byTool)}

		<p class="mt-14 text-sm leading-relaxed text-muted">
			{fill(aiConfig.footnote, { days: ai.days, updated })}
			<a href="https://tokens.ci/u/Aether-254" class="whitespace-nowrap text-accent hover:underline">{aiConfig.sourceLink}</a>
		</p>
	{/if}
</section>

<style>
	.heat-0 { background: var(--color-line); }
	.heat-1 { background: color-mix(in oklab, var(--color-accent) 30%, var(--color-line)); }
	.heat-2 { background: color-mix(in oklab, var(--color-accent) 55%, var(--color-line)); }
	.heat-3 { background: color-mix(in oklab, var(--color-accent) 80%, var(--color-line)); }
	.heat-4 { background: var(--color-accent); }
</style>
