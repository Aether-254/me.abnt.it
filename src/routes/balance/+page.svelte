<script lang="ts">
	import type { TxStatus } from './+page';
	let { data } = $props();

	const total = $derived(data.accounts.reduce((n, a) => n + a.balance, 0));
	const channelName = (id: string) => data.accounts.find((a) => a.id === id)?.name ?? id;
	const cny = (n: number) =>
		new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', signDisplay: 'exceptZero' }).format(n);
	const cnyPlain = (n: number) => new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(n);

	const statusStyle: Record<TxStatus, string> = {
		PAID: 'border-accent/40 text-accent',
		REFUNDED: 'border-accent-2/40 text-accent-2',
		CANCELLED: 'border-line text-muted line-through'
	};
</script>

<section class="mx-auto max-w-3xl px-6 py-16">
	<h1 class="text-3xl font-semibold tracking-tight md:text-4xl">Balance</h1>
	<p class="mt-3 text-muted">手动录入，更新于 {data.updated}。</p>

	<div class="mt-10 grid gap-4 sm:grid-cols-3">
		<div class="rounded-xl border border-line bg-panel p-5 sm:col-span-1">
			<p class="font-mono text-xs uppercase tracking-widest text-muted">Total</p>
			<p class="mt-2 text-2xl font-semibold tabular-nums">{cnyPlain(total)}</p>
		</div>
		{#each data.accounts as a}
			<div class="rounded-xl border border-line bg-panel p-5">
				<p class="font-mono text-xs uppercase tracking-widest text-muted">{a.name}</p>
				<p class="mt-2 text-2xl font-semibold tabular-nums">{cnyPlain(a.balance)}</p>
			</div>
		{/each}
	</div>

	<h2 class="mt-14 font-mono text-sm uppercase tracking-widest text-muted">Recent <span class="text-line">/ {data.transactions.length}</span></h2>
	<ul class="mt-4 divide-y divide-line">
		{#each data.transactions as t}
			<li class="flex items-center gap-4 py-4">
				<time class="w-24 shrink-0 font-mono text-xs text-muted">{t.date}</time>
				<div class="min-w-0 flex-1">
					<p class="truncate font-medium {t.status === 'CANCELLED' ? 'text-muted line-through' : ''}">{t.title}</p>
					<p class="mt-0.5 truncate text-xs text-muted">{channelName(t.channel)}{t.note ? ` · ${t.note}` : ''}</p>
				</div>
				<span class="rounded-full border px-2 py-0.5 font-mono text-[10px] {statusStyle[t.status]}">{t.status}</span>
				<span class="w-24 shrink-0 text-right font-mono text-sm tabular-nums {t.status === 'CANCELLED' ? 'text-muted' : t.amount < 0 ? 'text-fg' : 'text-accent'}">
					{cny(t.status === 'REFUNDED' ? Math.abs(t.amount) : t.amount)}
				</span>
			</li>
		{:else}
			<li class="py-6 text-muted">还没有记录。</li>
		{/each}
	</ul>
</section>
