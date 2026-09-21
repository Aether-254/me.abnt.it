import { getPosts } from '$lib/blog';
import { site } from '$lib/site';

export const prerender = true;

export function GET() {
	const urls = ['/', '/projects', '/blog', '/ai', '/about', ...getPosts().map((p) => `/blog/${p.slug}`)];
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${site.url}${u}</loc></url>`).join('\n')}
</urlset>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
