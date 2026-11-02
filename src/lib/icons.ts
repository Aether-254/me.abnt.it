// Brand marks come from @lobehub/icons-static-svg (MIT). They are monochrome and use currentColor,
// so they follow the page theme. Only the icons listed here are bundled.
import claude from '@lobehub/icons-static-svg/icons/claude.svg?raw';
import claudecode from '@lobehub/icons-static-svg/icons/claudecode.svg?raw';
import openai from '@lobehub/icons-static-svg/icons/openai.svg?raw';
import codex from '@lobehub/icons-static-svg/icons/codex.svg?raw';
import gemini from '@lobehub/icons-static-svg/icons/gemini.svg?raw';
import zhipu from '@lobehub/icons-static-svg/icons/zhipu.svg?raw';
import zai from '@lobehub/icons-static-svg/icons/zai.svg?raw';
import grok from '@lobehub/icons-static-svg/icons/grok.svg?raw';
import kimi from '@lobehub/icons-static-svg/icons/kimi.svg?raw';
import qwen from '@lobehub/icons-static-svg/icons/qwen.svg?raw';
import deepseek from '@lobehub/icons-static-svg/icons/deepseek.svg?raw';
import minimax from '@lobehub/icons-static-svg/icons/minimax.svg?raw';
import microsoft from '@lobehub/icons-static-svg/icons/microsoft.svg?raw';
import githubcopilot from '@lobehub/icons-static-svg/icons/githubcopilot.svg?raw';
import cursor from '@lobehub/icons-static-svg/icons/cursor.svg?raw';
import opencode from '@lobehub/icons-static-svg/icons/opencode.svg?raw';

const clean = (svg: string) =>
	svg.replace(/<title>.*?<\/title>/s, '').replace('<svg ', '<svg aria-hidden="true" focusable="false" ');

export const brandIcons = {
	claude: clean(claude),
	claudecode: clean(claudecode),
	openai: clean(openai),
	codex: clean(codex),
	gemini: clean(gemini),
	zhipu: clean(zhipu),
	zai: clean(zai),
	grok: clean(grok),
	kimi: clean(kimi),
	qwen: clean(qwen),
	deepseek: clean(deepseek),
	minimax: clean(minimax),
	microsoft: clean(microsoft),
	githubcopilot: clean(githubcopilot),
	cursor: clean(cursor),
	opencode: clean(opencode)
} as const;

export type BrandIconKey = keyof typeof brandIcons;

export const isBrandIcon = (k: string | undefined): k is BrandIconKey => !!k && k in brandIcons;
