<script lang="ts">
	let { name }: { name: 'tokens' | 'cost' | 'messages' | 'days' } = $props();
</script>

<svg
	class="size-4 shrink-0"
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.7"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
	focusable="false"
>
	{#if name === 'tokens'}
		<path d="M12 3l9 5-9 5-9-5 9-5z" />
		<path d="M3 12.5l9 5 9-5" />
		<path d="M3 17l9 5 9-5" />
	{:else if name === 'cost'}
		<circle cx="12" cy="12" r="9" />
		<path d="M12 7v10" />
		<path d="M15 9.5c0-1-1.3-1.7-3-1.7s-3 .7-3 1.8 1.3 1.5 3 1.9 3 .8 3 1.9-1.3 1.8-3 1.8-3-.7-3-1.7" />
	{:else if name === 'messages'}
		<path d="M4 5.5h16v11H9.5L4 20.5v-15z" />
	{:else}
		<rect x="4" y="5" width="16" height="15" rx="2" />
		<path d="M4 10h16M9 3v4M15 3v4" />
	{/if}
</svg>
