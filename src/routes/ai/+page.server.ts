import { fetchAiSummary } from '$lib/ai';
import { site } from '$lib/site';
import type { PageServerLoad } from './$types';

// Rendered on demand and cached at the edge for an hour instead of frozen at build time.
export const prerender = false;
export const config = { isr: { expiration: 3600 } };

export const load: PageServerLoad = async ({ fetch }) => {
	const ai = await fetchAiSummary(fetch, site.handle).catch(() => null);
	return { title: 'AI', description: '过去 90 天我怎么用 AI：模型、工具、token 与花费。', ai };
};
