export const site = {
	name: 'Aether_254',
	handle: 'Aether-254',
	url: 'https://me.abnt.it',
	title: 'Aether_254',
	description: 'Aether_254 的个人主页与博客：Minecraft mod 开发、Unity 游戏、LLM 基础设施与逆向分析。',
	location: '上海',
	email: '484029294@qq.com',
	github: 'https://github.com/Aether-254',
	bilibili: 'https://space.bilibili.com/650545272'
};

export const links: { label: string; href: string; note: string; featured?: boolean }[] = [
	{ label: 'Aether Pro', href: 'https://pro.abnt.it', note: 'pro.abnt.it', featured: true },
	{ label: 'GitHub', href: site.github, note: '@Aether-254' },
	{ label: 'Bilibili', href: site.bilibili, note: 'Aether_255' },
	{ label: '邮箱', href: `mailto:${site.email}`, note: site.email },
	{ label: 'abnt.it', href: 'https://abnt.it', note: 'Minecraft 无规则服务器' },
	{ label: 'AetherAC', href: 'https://aetherac.abnt.it', note: '反作弊项目' },
	{ label: 'api.abnt.it', href: 'https://api.abnt.it', note: 'LLM 公益 API 站' }
];

export const skills: { group: string; items: string[] }[] = [
	{ group: '编程语言', items: ['C', 'C++', 'C#', 'Java', 'Kotlin', 'Python', 'TypeScript', 'JavaScript', 'GLSL'] },
	{ group: '前端', items: ['Svelte', 'React', 'Vue', 'Next.js', 'Tailwind CSS', 'Electron'] },
	{ group: '运行与构建', items: ['Node.js', 'Gradle', 'Docker', 'Kubernetes', 'Git'] },
	{ group: '游戏', items: ['Unity', 'Minecraft Fabric / NeoForge', 'Mixin'] }
];

export const now = [
	{ title: 'Minecraft mod', detail: 'Java / Kotlin / Gradle / GLSL。在做 Create 生态的附属 mod，以及 Fabric 1.21.11 的版本移植。' },
	{ title: 'LLM / ML', detail: '模型部署与推理网关，同时运维公益 API 站 api.abnt.it（Docker / k8s）。' },
	{ title: 'Unity 游戏', detail: 'Equilibrium：一款以真实物理与化学为基础的 2D 硬核工厂建造游戏（C#）。' },
	{ title: '逆向与安全', detail: 'Java Agent 反作弊分析、VMProtect 样本分析、Windows 取证。' }
];

export const featured = [
	{
		name: 'ask-jev',
		repo: 'Aether-254/ask-jev',
		tag: 'TypeScript · MCP / AI',
		desc: 'TypeSafe Jev 的 Codex / Claude 插件，支持 choice、score、noul 以及批量结构化判断。'
	},
	{
		name: 'Equilibrium',
		repo: 'Aether-254/Equilibrium_pub',
		tag: 'Unity · C#',
		desc: '2D 硬核工厂建造游戏。经济系统是“活”的，生产链则建立在真实的物理与化学之上。'
	},
	{
		name: 'LeavesHack 1.21.11',
		repo: 'Aether-254/LeavesHack_1.21.11',
		tag: 'Java · Fabric',
		desc: '为无政府服务器的生存体验打造的客户端模组合集。'
	},
	{
		name: 'Selective-XRay',
		repo: 'Aether-254/Selective-XRay',
		tag: 'Java · Fabric / Quilt / NeoForge',
		desc: '可配置的客户端 X-ray 渲染器，同时支持 Fabric、Quilt 与 NeoForge。'
	},
	{
		name: 'Create 附属系列',
		repo: 'Aether-254?tab=repositories&q=create-',
		tag: 'Java · NeoForge 1.21.1 / Fabric 1.21.11',
		desc: '十余个 Create（机械动力）附属，涵盖仓库互联、正则过滤、递归打包、应力历史等功能。'
	},
	{
		name: 'LECIA.Enhanced',
		repo: 'Aether-254/LECIA.Enhanced',
		tag: 'C# · 硬件',
		desc: '把 ClassIsland 的课表通过串口或 UDP 推送到 ESP32 等外部设备。'
	},
	{
		name: 'repo_health',
		repo: 'Aether-254/repo_health',
		tag: 'Python · CLI',
		desc: '扫描任意 GitHub 仓库，输出一份仓库健康度摘要。'
	}
];
