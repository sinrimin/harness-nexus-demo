/** Demo overlay — the public demo's notice surfaces (VITE_DEMO_MODE builds). */
const en = {
  strip: 'Public demo · data resets daily · use throwaway credentials · open code',
  stripLink: 'view code',
  details: 'details',
  modalTitle: 'Public demo instance',
  modalP1: 'This is the public demo of Harness Nexus — anyone can register and explore.',
  modalP2:
    'Avoid real credentials and tokens; disposable or test credentials are recommended. Data lives in memory only and is never persisted — but absolute security is not guaranteed.',
  modalP3:
    'To point your agent tool at this demo’s /mcp endpoint, run it in a disposable isolated environment (e.g. a Docker container), or use the official client box image — one command, see the README.',
  modalP4: 'Administrator features are disabled; the exact code this site runs is open for inspection:',
  modalAck: 'Got it',
};

const zh: typeof en = {
  strip: '公开演示 · 数据每日清空 · 推荐一次性凭据 · 代码可查',
  stripLink: '查看代码',
  details: '详情',
  modalTitle: '公开演示实例',
  modalP1: '这里是 Harness Nexus 的公开演示，任何人都可以注册体验。',
  modalP2:
    '请避免使用真实凭据与真实 Token，推荐使用一次性/测试凭据。本站数据仅存于内存、不会持久存储，但不保证数据绝对安全。',
  modalP3:
    '若要让你的 Agent 工具连接本演示的 /mcp 端点，请在一次性隔离环境（如 Docker 容器）中运行，或直接使用官方客户端镜像——一条命令，见 README。',
  modalP4: '管理员功能已禁用；本站运行的代码完全开源可查：',
  modalAck: '我已知晓，开始体验',
};

export const demoStrings = { en, zh };
