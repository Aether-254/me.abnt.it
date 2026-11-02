<script lang="ts">
	import { brandIcons, isBrandIcon } from '$lib/icons';

	// `name` is a key from brandIcons; anything unknown (or empty) falls back to a neutral sparkle,
	// so a model without a mapped icon still lines up with the others.
	let { name, class: cls = '' }: { name?: string; class?: string } = $props();
</script>

<span class="brand-icon inline-flex shrink-0 {cls}" aria-hidden="true">
	{#if isBrandIcon(name)}
		{@html brandIcons[name]}
	{:else}
		<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" focusable="false">
			<path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9L12 3.5z" />
			<path d="M18.5 16.5v3M17 18h3" />
		</svg>
	{/if}
</span>
