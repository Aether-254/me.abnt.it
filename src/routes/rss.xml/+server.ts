import { getPosts } from '$lib/blog';
import { site } from '$lib/site';

export const prerender = true;

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

export function GET() {
	const items = getPosts()
		.map(
			(p) => `<item>
  <title>${esc(p.title)}</title>
  <link>${site.url}/blog/${p.slug}</link>
  <guid>${site.url}/blog/${p.slug}</guid>
  <pubDate>${new Date(p.date).toUTCString()}</pubDate>
  <description>${esc(p.summary)}</description>
</item>`
		)
		.join('\n');
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(site.name)}</title>
<link>${site.url}</link>
<description>${esc(site.description)}</description>
<language>zh-CN</language>
${items}
</channel></rss>`;
	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
