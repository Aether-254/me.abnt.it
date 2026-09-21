export const site = {
	name: 'Aether_254',
	handle: 'Aether-254',
	url: 'https://me.abnt.it',
	title: 'Aether_254',
	description: 'Minecraft mod 开发、Unity 游戏、LLM 基础设施与逆向分析。',
	location: 'Shanghai, China',
	email: '_aether_254@abnt.it',
	github: 'https://github.com/Aether-254',
	bilibili: 'https://space.bilibili.com/650545272'
};

export const links = [
	{ label: 'GitHub', href: site.github, note: '@Aether-254' },
	{ label: 'Bilibili', href: site.bilibili, note: 'Aether_255' },
	{ label: 'Mail', href: `mailto:${site.email}`, note: site.email },
	{ label: 'abnt.it', href: 'https://abnt.it', note: 'Minecraft 无规则服务器' },
	{ label: 'AetherAC', href: 'https://aetherac.abnt.it', note: '反作弊项目' },
	{ label: 'api.abnt.it', href: 'https://api.abnt.it', note: 'LLM 公益 API' }
];

export const skills: { group: string; items: string[] }[] = [
	{ group: 'Languages', items: ['C', 'C++', 'C#', 'Java', 'Kotlin', 'Python', 'TypeScript', 'JavaScript', 'GLSL'] },
	{ group: 'Frontend', items: ['Svelte', 'React', 'Vue', 'Next.js', 'Tailwind CSS', 'Electron'] },
	{ group: 'Runtime & Build', items: ['Node.js', 'Gradle', 'Docker', 'Kubernetes', 'Git'] },
	{ group: 'Game', items: ['Unity', 'Minecraft Fabric / NeoForge', 'Mixin'] }
];

export const now = [
	{ title: 'Minecraft mods', detail: 'Java / Kotlin / Gradle / GLSL，Create 生态附属与 Fabric 1.21.11 移植。' },
	{ title: 'LLM / ML', detail: '模型部署、推理网关，api.abnt.it 公益站运维（Docker / k8s）。' },
	{ title: 'Unity', detail: 'Equilibrium：基于真实物理与化学的 2D 硬核工厂建造游戏（C#）。' },
	{ title: 'Reverse / Security', detail: 'Java Agent 反作弊分析、VMProtect 样本、Windows 取证。' }
];

export const featured = [
	{
		name: 'Equilibrium',
		repo: 'Aether-254/Equilibrium_pub',
		tag: 'Unity · C#',
		desc: '2D 硬核工厂建造游戏，拥有活的经济系统。生产链基于真实物理与化学。'
	},
	{
		name: 'LeavesHack 1.21.11',
		repo: 'Aether-254/LeavesHack_1.21.11',
		tag: 'Java · Fabric',
		desc: '改善无政府服务器生存体验的客户端模组集合。'
	},
	{
		name: 'Selective-XRay',
		repo: 'Aether-254/Selective-XRay',
		tag: 'Java · Fabric / Quilt / NeoForge',
		desc: '可配置的客户端 X-ray 渲染器，支持三大加载器。'
	},
	{
		name: 'Create 附属系列',
		repo: 'Aether-254?tab=repositories&q=create-',
		tag: 'Java · NeoForge 1.21.1 / Fabric 1.21.11',
		desc: '十余个 Create 机械动力附属：仓库互联、正则过滤、递归打包、应力历史等。'
	},
	{
		name: 'LECIA.Enhanced',
		repo: 'Aether-254/LECIA.Enhanced',
		tag: 'C# · 硬件',
		desc: '把 ClassIsland 课表通过串口 / UDP 推送到 ESP32 等外部设备。'
	},
	{
		name: 'repo_health',
		repo: 'Aether-254/repo_health',
		tag: 'Python · CLI',
		desc: '扫描任意 GitHub 仓库并输出健康度摘要。'
	}
];
