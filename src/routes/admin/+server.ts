import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = () => {
	redirect(302, 'https://app.pagescms.org/Aether-254/me.abnt.it/main/collection/posts');
};
