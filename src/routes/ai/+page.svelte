<script lang="ts">
	import { fmtCost, fmtTokens, type Ranked } from '$lib/ai';
	let { data } = $props();
	const ai = $derived(data.ai);

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
	<ol class="mt-4 space-y-2.5">
		{#each list as r}
			<li class="grid grid-cols-[minmax(0,11rem)_1fr_auto] items-center gap-3 text-sm">
				<span class="truncate" title={r.name}>{r.name}</span>
				<span class="h-2 overflow-hidden rounded-full bg-line">
					<span class="block h-full rounded-full bg-accent" style="width:{Math.max(1, r.share * 100)}%"></span>
				</span>
				<span class="w-28 text-right font-mono text-xs text-muted">{fmtTokens(r.tokens)} <span class="inline-block w-9 text-fg">{pct(r.share)}</span></span>
			</li>
		{/each}
	</ol>
{/snippet}

<section class="mx-auto max-w-3xl px-6 py-16">
	<h1 class="text-3xl font-semibold tracking-tight md:text-4xl">AI</h1>
	<p class="mt-3 text-muted">过去 {ai?.days ?? 90} 天我怎么用 AI。</p>

	{#if !ai}
		<p class="mt-12 rounded-xl border border-line bg-panel p-6 text-muted">构建时没有拿到 tokens.ci 的数据，稍后再看。</p>
	{:else}
		<dl class="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3">
			<div>
				<dt class="font-mono text-xs uppercase tracking-widest text-muted">Favorite model</dt>
				<dd class="mt-1 text-lg font-medium">{ai.favoriteModel?.name ?? '—'}</dd>
				{#if ai.favoriteModel}<dd class="font-mono text-xs text-muted">{pct(ai.favoriteModel.share)} share</dd>{/if}
			</div>
			<div>
				<dt class="font-mono text-xs uppercase tracking-widest text-muted">Favorite tool</dt>
				<dd class="mt-1 text-lg font-medium">{ai.favoriteTool?.name ?? '—'}</dd>
				{#if ai.favoriteTool}<dd class="font-mono text-xs text-muted">{pct(ai.favoriteTool.share)} share</dd>{/if}
			</div>
			<div>
				<dt class="font-mono text-xs uppercase tracking-widest text-muted">Total tokens</dt>
				<dd class="mt-1 text-lg font-medium">{fmtTokens(ai.totalTokens)}</dd>
			</div>
			<div>
				<dt class="font-mono text-xs uppercase tracking-widest text-muted">Total cost</dt>
				<dd class="mt-1 text-lg font-medium">{fmtCost(ai.totalCost)}</dd>
				<dd class="font-mono text-xs text-muted">按公开定价折算</dd>
			</div>
			<div>
				<dt class="font-mono text-xs uppercase tracking-widest text-muted">Messages</dt>
				<dd class="mt-1 text-lg font-medium">{ai.sessions.toLocaleString('en-US')}</dd>
			</div>
			<div>
				<dt class="font-mono text-xs uppercase tracking-widest text-muted">Active days</dt>
				<dd class="mt-1 text-lg font-medium">{ai.activeDays} <span class="text-sm text-muted">/ {ai.days}</span></dd>
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

		<h2 class="mt-14 font-mono text-sm uppercase tracking-widest text-muted">By model</h2>
		{@render bars(ai.byModel)}

		<h2 class="mt-14 font-mono text-sm uppercase tracking-widest text-muted">By tool</h2>
		{@render bars(ai.byTool)}

		<p class="mt-14 text-sm text-muted">
			数据来自 <a href="https://tokens.ci/u/Aether-254" class="text-accent hover:underline">tokens.ci</a>，由各个编码工具的本地用量日志汇总上传，只含 token 数、模型名和时间戳。
			费用是按各家公开 API 定价折算的等价值，不是实际支出。页面在构建时生成，最后更新于 {new Date(ai.updatedAt).toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}。
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
