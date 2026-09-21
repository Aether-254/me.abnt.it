import { error } from '@sveltejs/kit';
import { getPost, getPosts } from '$lib/blog';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => getPosts().map((p) => ({ slug: p.slug }));

export const load: PageLoad = async ({ params }) => {
	const post = await getPost(params.slug);
	if (!post) error(404, 'Post not found');
	return { title: post.meta.title, description: post.meta.summary, meta: post.meta, component: post.component };
};
