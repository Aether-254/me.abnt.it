export interface GhRepo {
	name: string;
	full_name: string;
	html_url: string;
	description: string | null;
	language: string | null;
	stargazers_count: number;
	forks_count: number;
	pushed_at: string;
	fork: boolean;
	archived: boolean;
	topics: string[];
}

export async function fetchRepos(fetchFn: typeof fetch, user: string): Promise<GhRepo[]> {
	const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
	const token = process.env.GITHUB_TOKEN;
	if (token) headers.Authorization = `Bearer ${token}`;
	const out: GhRepo[] = [];
	for (let page = 1; page <= 3; page++) {
		const res = await fetchFn(
			`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed&page=${page}`,
			{ headers }
		);
		if (!res.ok) break;
		const batch = (await res.json()) as GhRepo[];
		out.push(...batch);
		if (batch.length < 100) break;
	}
	return out
		.filter((r) => !r.fork && !r.archived)
		.map((r) => ({
			name: r.name,
			full_name: r.full_name,
			html_url: r.html_url,
			description: r.description,
			language: r.language,
			stargazers_count: r.stargazers_count,
			forks_count: r.forks_count,
			pushed_at: r.pushed_at,
			fork: r.fork,
			archived: r.archived,
			topics: r.topics ?? []
		}));
}
