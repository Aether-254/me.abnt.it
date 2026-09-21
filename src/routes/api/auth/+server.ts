// GitHub OAuth proxy for Decap CMS. Requires env GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET
// from a GitHub OAuth App whose callback URL is https://me.abnt.it/api/auth/callback.
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = ({ url }) => {
	const clientId = process.env.GITHUB_CLIENT_ID;
	if (!clientId) return new Response('GITHUB_CLIENT_ID not configured', { status: 500 });
	const state = crypto.randomUUID();
	const authorize = new URL('https://github.com/login/oauth/authorize');
	authorize.searchParams.set('client_id', clientId);
	authorize.searchParams.set('redirect_uri', `${url.origin}/api/auth/callback`);
	authorize.searchParams.set('scope', 'repo,user');
	authorize.searchParams.set('state', state);
	redirect(302, authorize.toString());
};
