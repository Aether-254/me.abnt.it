<script lang="ts">
	import type { GhRepo } from '$lib/github';
	let { repo }: { repo: GhRepo } = $props();

	const colors: Record<string, string> = {
		Java: '#b07219', Kotlin: '#a97bff', 'C#': '#178600', 'C++': '#f34b7d', C: '#555555',
		Python: '#3572a5', TypeScript: '#3178c6', JavaScript: '#f1e05a', Svelte: '#ff3e00',
		HTML: '#e34c26', GLSL: '#5586a4', Shell: '#89e051', Go: '#00add8', Rust: '#dea584'
	};
	const rel = (iso: string) => {
		const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
		return d < 1 ? 'today' : d < 30 ? `${d}d ago` : d < 365 ? `${Math.floor(d / 30)}mo ago` : `${Math.floor(d / 365)}y ago`;
	};
</script>

<a href={repo.html_url} target="_blank" rel="noopener" class="flex flex-col rounded-xl border border-line bg-panel p-5 transition-colors hover:border-accent">
	<h3 class="font-mono text-sm font-semibold break-all">{repo.name}</h3>
	<p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{repo.description ?? '—'}</p>
	<div class="mt-4 flex items-center gap-4 font-mono text-xs text-muted">
		{#if repo.language}
			<span class="flex items-center gap-1.5">
				<span class="inline-block size-2.5 rounded-full" style="background:{colors[repo.language] ?? '#8b93a1'}"></span>{repo.language}
			</span>
		{/if}
		{#if repo.stargazers_count}<span>star {repo.stargazers_count}</span>{/if}
		<span class="ml-auto">{rel(repo.pushed_at)}</span>
	</div>
</a>
