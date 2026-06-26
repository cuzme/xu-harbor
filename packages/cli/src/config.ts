import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { log } from './utils/log';

export interface Template {
  /** 模板展示名称 */
  name: string;
  /** 模板描述 */
  description: string;
  /** 模板 git 仓库地址 */
  gitUrl: string;
  /** 克隆分支 */
  branch: string;
}

export type TemplateMap = Record<string, Template>;

export interface CliConfig {
  /** 检查脚手架更新所用的 npm registry */
  registry: string;
  /** 可选模板列表 */
  templates: TemplateMap;
}

export const DEFAULT_REGISTRY = 'https://registry.npmjs.org/';

/**
 * 内置示例模板，均指向公开仓库。
 * 如需私有/内网模板，可在项目根目录新增 yobi.cli.config.{json,mjs} 进行扩展或覆盖。
 */
export const DEFAULT_TEMPLATES: TemplateMap = {
  'vitesse-lite': {
    name: 'Vue3 + Vite 轻量模板 (示例)',
    description: '基于 Vite + Vue3 + TypeScript 的轻量起始模板 (Vitesse Lite)',
    gitUrl: 'https://github.com/antfu-collective/vitesse-lite.git',
    branch: 'main',
  },
};

const CONFIG_BASENAMES = ['yobi.cli.config.mjs', 'yobi.cli.config.json'];

const readJsonConfig = (filePath: string): Partial<CliConfig> => {
  return JSON.parse(readFileSync(filePath, 'utf-8')) as Partial<CliConfig>;
};

const readModuleConfig = async (filePath: string): Promise<Partial<CliConfig>> => {
  const mod = await import(pathToFileURL(filePath).href);
  return (mod.default ?? mod) as Partial<CliConfig>;
};

/** 从 cwd 读取用户配置文件（可选） */
const loadUserConfig = async (cwd: string): Promise<Partial<CliConfig>> => {
  for (const basename of CONFIG_BASENAMES) {
    const filePath = resolve(cwd, basename);
    if (!existsSync(filePath)) continue;
    try {
      if (basename.endsWith('.json')) return readJsonConfig(filePath);
      return await readModuleConfig(filePath);
    } catch (error) {
      log.warning(`读取配置文件 ${basename} 失败，已忽略：${(error as Error).message}`);
      return {};
    }
  }
  return {};
};

interface ResolveConfigOptions {
  /** 来自命令行 --registry 的覆盖值 */
  registry?: string;
  /** 工作目录，默认 process.cwd() */
  cwd?: string;
}

/**
 * 合并配置，优先级（从高到低）：
 * registry: CLI 选项 > 环境变量 YOBI_CLI_REGISTRY > 配置文件 > 默认值
 * templates: 配置文件覆盖/扩展内置示例
 */
export const getConfig = async (options: ResolveConfigOptions = {}): Promise<CliConfig> => {
  const cwd = options.cwd ?? process.cwd();
  const userConfig = await loadUserConfig(cwd);

  const registry =
    options.registry ?? process.env.YOBI_CLI_REGISTRY ?? userConfig.registry ?? DEFAULT_REGISTRY;

  const templates: TemplateMap = {
    ...DEFAULT_TEMPLATES,
    ...(userConfig.templates ?? {}),
  };

  return { registry, templates };
};
