import config from '../content/ai.json';

export interface TokensDay {
	date: string;
	totals: { tokens: number; cost: number; messages: number };
	clients: { client: string; cost: number; messages: number; models: Record<string, { tokens: number; cost: number }> }[];
}

export interface TokensProfile {
	user: { username: string; displayName: string; rank: number };
	stats: { totalTokens: number; totalCost: number; activeDays: number; sessionCount: number };
	updatedAt: string;
	contributions: TokensDay[];
}

export interface Ranked {
	/** Raw id from tokens.ci (model id or client id). */
	id: string;
	name: string;
	/** Key into brandIcons; unknown keys render a neutral fallback icon. */
	icon: string;
	/** Optional Chinese description, editable in the CMS. */
	note: string;
	tokens: number;
	cost: number;
	share: number;
}

export interface AiSummary {
	days: number;
	since: string;
	until: string;
	updatedAt: string;
	totalTokens: number;
	totalCost: number;
	sessions: number;
	activeDays: number;
	favoriteModel: Ranked | null;
	favoriteTool: Ranked | null;
	byModel: Ranked[];
	byTool: Ranked[];
	heatmap: { date: string; tokens: number }[];
}

/** One CMS-editable override. `match` is a case-insensitive regex (or plain id) tested against the raw id; first hit wins. */
export interface AiOverride {
	match: string;
	name?: string;
	note?: string;
	icon?: string;
}

export const aiConfig = config as typeof config & { models: AiOverride[]; tools: AiOverride[] };

const MODEL_NAMES: [RegExp, string][] = [
	[/^claude-fable-5-1$/, 'Claude Fable 5.1'],
	[/^(claude-)?fable-5$/, 'Claude Fable 5'],
	[/^claude-opus-5$/, 'Claude Opus 5'],
	[/^claude-opus-4-8$/, 'Claude Opus 4.8'],
	[/^claude-sonnet-5$/, 'Claude Sonnet 5'],
	[/^claude-haiku-4-5$/, 'Claude Haiku 4.5'],
	[/^gpt-6-astra$/, 'GPT 6 Astra'],
	[/^gpt-5\.6-sol$/, 'GPT 5.6 Sol'],
	[/^gpt-5\.6-terra$/, 'GPT 5.6 Terra'],
	[/^gpt-5\.6-luna$/, 'GPT 5.6 Luna'],
	[/^gpt-5\.2$/, 'GPT 5.2'],
	[/^gpt-5-mini/, 'GPT 5 mini'],
	[/^glm-5\.3-flash$/, 'GLM 5.3 Flash'],
	[/^glm-5\.3$/, 'GLM 5.3'],
	[/^grok-4\.6$/, 'Grok 4.6'],
	[/^kimi-k3$/, 'Kimi K3'],
	[/^qwen3\.8-max$/, 'Qwen 3.8 Max'],
	[/^deepseek-v4-flash$/, 'DeepSeek V4 Flash'],
	[/^minimax-m2\.1$/, 'MiniMax M2.1'],
	[/^minimax-m3$/, 'MiniMax M3'],
	[/^mai-code-1-flash$/, 'MAI Code 1 Flash']
];

const TOOL_NAMES: Record<string, string> = {
	claude: 'Claude Code',
	codex: 'Codex',
	opencode: 'OpenCode',
	zcode: 'ZCode',
	copilot: 'GitHub Copilot',
	cursor: 'Cursor'
};

// Vendor guesses, used when the CMS has no icon for an id. Order matters: first hit wins.
const MODEL_ICONS: [RegExp, string][] = [
	[/claude|opus|sonnet|haiku|fable/i, 'claude'],
	[/gpt|^o\d|codex/i, 'openai'],
	[/gemini/i, 'gemini'],
	[/glm/i, 'zhipu'],
	[/grok/i, 'grok'],
	[/kimi/i, 'kimi'],
	[/qwen/i, 'qwen'],
	[/deepseek/i, 'deepseek'],
	[/minimax/i, 'minimax'],
	[/^mai-/i, 'microsoft']
];

const TOOL_ICONS: Record<string, string> = {
	claude: 'claudecode',
	codex: 'codex',
	opencode: 'opencode',
	zcode: 'zai',
	copilot: 'githubcopilot',
	cursor: 'cursor'
};

const HIDDEN_MODELS = /^(auto|gpt-reserve|oswe-vscode-prime|capi-.*|agnes-.*|bailu-.*)$/;

function matches(pattern: string, id: string) {
	try {
		return new RegExp(pattern, 'i').test(id);
	} catch {
		// Not a valid regex: treat it as a plain id.
		return pattern.toLowerCase() === id.toLowerCase();
	}
}

/** Drop a routing prefix such as `anthropic/` or `codex/`: same model, different route. */
const normId = (id: string) => id.replace(/^.*\//, '');

const findOverride = (list: AiOverride[], id: string) =>
	list.find((o) => o.match && (matches(o.match, id) || matches(o.match, normId(id))));

const BRAND_CASE: Record<string, string> = {
	gpt: 'GPT',
	glm: 'GLM',
	mai: 'MAI',
	claude: 'Claude',
	deepseek: 'DeepSeek',
	minimax: 'MiniMax',
	kimi: 'Kimi',
	qwen: 'Qwen',
	grok: 'Grok',
	gemini: 'Gemini'
};

/** Best-effort readable name for ids missing from MODEL_NAMES: `claude-sonnet-5-5` -> `Claude Sonnet 5.5`. */
function autoName(id: string) {
	const tokens: string[] = [];
	for (const p of normId(id).split('-')) {
		const last = tokens[tokens.length - 1];
		if (/^\d+$/.test(p) && last && /^\d+(\.\d+)*$/.test(last)) tokens[tokens.length - 1] = `${last}.${p}`;
		else tokens.push(p);
	}
	return tokens.map((t) => BRAND_CASE[t.toLowerCase()] ?? (/^[a-z]/.test(t) ? t[0].toUpperCase() + t.slice(1) : t)).join(' ');
}

export function prettyModel(id: string) {
	const key = normId(id);
	for (const [re, name] of MODEL_NAMES) if (re.test(key)) return name;
	return autoName(id);
}

export function prettyTool(id: string) {
	return TOOL_NAMES[id] ?? id;
}

export function describeModel(id: string): Pick<Ranked, 'name' | 'icon' | 'note'> {
	const o = findOverride(aiConfig.models, id);
	return {
		name: o?.name || prettyModel(id),
		icon: o?.icon || MODEL_ICONS.find(([re]) => re.test(normId(id)))?.[1] || '',
		note: o?.note ?? ''
	};
}

export function describeTool(id: string): Pick<Ranked, 'name' | 'icon' | 'note'> {
	const o = findOverride(aiConfig.tools, id);
	return {
		name: o?.name || prettyTool(id),
		icon: o?.icon || TOOL_ICONS[id] || '',
		note: o?.note ?? ''
	};
}

export async function fetchAiSummary(fetchFn: typeof fetch, user: string, days = 90): Promise<AiSummary | null> {
	const res = await fetchFn(`https://tokens.ci/api/users/${user}`, {
		headers: { Accept: 'application/json', 'User-Agent': 'me.abnt.it' }
	});
	if (!res.ok) return null;
	const data = (await res.json()) as TokensProfile;

	const until = new Date(data.updatedAt);
	const since = new Date(until);
	since.setUTCDate(since.getUTCDate() - days);
	const sinceKey = since.toISOString().slice(0, 10);

	const window = data.contributions.filter((d) => d.date >= sinceKey);
	const models = new Map<string, Ranked>();
	const tools = new Map<string, Ranked>();
	let totalTokens = 0;
	let totalCost = 0;
	let sessions = 0;

	for (const day of window) {
		totalTokens += day.totals.tokens;
		totalCost += day.totals.cost;
		for (const c of day.clients) {
			sessions += c.messages;
			const tool = tools.get(c.client) ?? { id: c.client, ...describeTool(c.client), tokens: 0, cost: 0, share: 0 };
			for (const [rawId, m] of Object.entries(c.models)) {
				tool.tokens += m.tokens;
				tool.cost += m.cost;
				// Merge routes to the same model (`codex/gpt-6-astra` + `gpt-6-astra`) into one row.
				const id = normId(rawId);
				if (HIDDEN_MODELS.test(id)) continue;
				const model = models.get(id) ?? { id, ...describeModel(rawId), tokens: 0, cost: 0, share: 0 };
				model.tokens += m.tokens;
				model.cost += m.cost;
				models.set(id, model);
			}
			tools.set(c.client, tool);
		}
	}

	const rank = (m: Map<string, Ranked>) => {
		const list = [...m.values()].filter((r) => r.tokens > 0).sort((a, b) => b.tokens - a.tokens);
		const sum = list.reduce((n, r) => n + r.tokens, 0) || 1;
		return list.map((r) => ({ ...r, share: r.tokens / sum }));
	};
	const byModel = rank(models);
	const byTool = rank(tools);

	const heatmap: { date: string; tokens: number }[] = [];
	const byDate = new Map(window.map((d) => [d.date, d.totals.tokens]));
	for (let i = days - 1; i >= 0; i--) {
		const d = new Date(until);
		d.setUTCDate(d.getUTCDate() - i);
		const key = d.toISOString().slice(0, 10);
		heatmap.push({ date: key, tokens: byDate.get(key) ?? 0 });
	}

	return {
		days,
		since: sinceKey,
		until: until.toISOString().slice(0, 10),
		updatedAt: data.updatedAt,
		totalTokens,
		totalCost,
		sessions,
		activeDays: window.filter((d) => d.totals.tokens > 0).length,
		favoriteModel: byModel[0] ?? null,
		favoriteTool: byTool[0] ?? null,
		byModel,
		byTool,
		heatmap
	};
}

export function fmtTokens(n: number) {
	if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`;
	if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
	if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
	return String(n);
}

export function fmtCost(n: number) {
	if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
	return `$${n.toFixed(n >= 100 ? 0 : 1)}`;
}
