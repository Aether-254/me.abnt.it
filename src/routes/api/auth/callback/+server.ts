import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = async ({ url }) => {
	const code = url.searchParams.get('code');
	const clientId = process.env.GITHUB_CLIENT_ID;
	const clientSecret = process.env.GITHUB_CLIENT_SECRET;
	if (!code || !clientId || !clientSecret) return new Response('bad request', { status: 400 });

	const res = await fetch('https://github.com/login/oauth/access_token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code })
	});
	const data = (await res.json()) as { access_token?: string; error?: string };
	const status = data.access_token ? 'success' : 'error';
	const payload = data.access_token
		? { token: data.access_token, provider: 'github' }
		: { error: data.error ?? 'unknown' };

	// Decap expects the popup to postMessage back to the opener in this exact handshake form.
	const html = `<!doctype html><html><body><script>
(function () {
  function receive(e) {
    window.opener.postMessage('authorization:github:${status}:${JSON.stringify(payload)}', e.origin);
    window.removeEventListener('message', receive, false);
  }
  window.addEventListener('message', receive, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;
	return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
};
