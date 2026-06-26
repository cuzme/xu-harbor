<div align="center">

# xu-harbor

**A Vue 3 monorepo harbor for shared components, utilities, and frontend packages.**

基于 pnpm + Turbo + Lerna 的 Vue 3 monorepo，沉淀可复用的业务组件与前端公共能力。

<br />

[![license](https://img.shields.io/github/license/cuzme/xu-harbor?style=flat-square)](LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![vue](https://img.shields.io/badge/vue-3.x-42b883?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![element plus](https://img.shields.io/badge/element--plus-2.x-409eff?style=flat-square)](https://element-plus.org/)

[![npm version](https://img.shields.io/npm/v/@yobiccc/pro-components?style=flat-square)](https://www.npmjs.com/package/@yobiccc/pro-components)

[快速开始](#快速开始) · [Packages](#packages) · [脚手架](#脚手架) · [本地开发](#本地开发) · [提交规范](#提交规范) · [发布](#发布)

</div>

---

## 特性

- **Monorepo 架构** — pnpm workspace + Turbo 任务编排 + Lerna 独立版本发布
- **Vue 3 + TSX** — 基于 Element Plus 二次封装，保留类型提示
- **双格式产物** — ESM (`.mjs`) + CJS (`.cjs`)，统一生成 `.d.ts` 类型声明
- **按需引入** — 支持具名导入单个组件，独立样式入口 `@yobiccc/pro-components/style.css`
- **脚手架** — `@yobiccc/cli` 一键拉取模板创建项目，registry 与模板可配置
- **工程化完备** — ESLint + Prettier + husky + lint-staged，提交前自动校验暂存代码
- **规范发布** — Conventional Commits 驱动版本号与 `CHANGELOG.md` 自动生成

---

## Packages

| 包名                                                | 版本                                                                                                                                    | 说明                           |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| [@yobiccc/pro-components](./packages/proComponents) | [![npm](https://img.shields.io/npm/v/@yobiccc/pro-components?style=flat-square)](https://www.npmjs.com/package/@yobiccc/pro-components) | 基于 Element Plus 的业务组件库 |
| [@yobiccc/cli](./packages/cli)                      | [![npm](https://img.shields.io/npm/v/@yobiccc/cli?style=flat-square)](https://www.npmjs.com/package/@yobiccc/cli)                       | 快速创建前端项目的命令行脚手架 |

---

## 快速开始

### 安装

```bash
pnpm add @yobiccc/pro-components vue element-plus @element-plus/icons-vue @vueuse/core lodash-es
```

### 引入样式

```ts
// main.ts
import "@yobiccc/pro-components/style.css";
import "element-plus/dist/index.css";
```

### 全量注册

```ts
import { createApp } from "vue";
import ElementPlus from "element-plus";
import ProComponents from "@yobiccc/pro-components";
import App from "./App.vue";

const app = createApp(App);

app.use(ElementPlus);
app.use(ProComponents);
app.mount("#app");
```

### 按需使用

```vue
<script setup lang="ts">
import { ButtonPlus } from "@yobiccc/pro-components";
</script>

<template>
  <ButtonPlus type="primary" size="default">Click me</ButtonPlus>
</template>
```

### ButtonPlus Props

| 属性   | 类型                              | 默认值      | 说明                                 |
| ------ | --------------------------------- | ----------- | ------------------------------------ |
| `type` | `ButtonType`                      | `'primary'` | 按钮类型，同 Element Plus `ElButton` |
| `size` | `'large' \| 'default' \| 'small'` | `'default'` | 按钮尺寸                             |

---

## 脚手架

`@yobiccc/cli` 提供命令 `yobi`，用于快速拉取模板创建前端项目。

```bash
# 全局安装
pnpm add -g @yobiccc/cli

# 创建项目（交互式输入名称、选择模板）
yobi create

# 查看所有模板 / 帮助
yobi list
yobi --help
```

registry 与模板均可配置：在执行目录放 `yobi.cli.config.{json,mjs}` 即可扩展或覆盖内置模板，registry 可经 `--registry`、环境变量 `YOBI_CLI_REGISTRY` 或配置文件覆盖。详见 [packages/cli/README](./packages/cli/README.md)。

---

## 本地开发

### 环境要求

- Node.js >= 18
- pnpm >= 10

### 安装依赖

```bash
pnpm install
```

### 常用命令

```bash
# 构建所有包
pnpm build

# 仅构建组件库
pnpm --filter @yobiccc/pro-components build

# 代码检查 & 格式化
pnpm lint
pnpm lint:fix
pnpm format

# 文档站（VitePress）
pnpm docs:dev
pnpm docs:build

# 发布前检查（lint:fix → format → build）
pnpm release:prepare
```

---

## 项目结构

```text
xu-harbor/
├── packages/
│   ├── proComponents/         # @yobiccc/pro-components 组件库
│   │   ├── src/
│   │   │   ├── components/    # 业务组件
│   │   │   └── utils/         # 工具函数
│   │   ├── es/                # ESM 构建产物（git ignored）
│   │   └── lib/               # CJS 构建产物（git ignored）
│   └── cli/                   # @yobiccc/cli 命令行脚手架
│       ├── bin/               # 可执行入口
│       ├── src/               # CLI 源码
│       └── dist/              # 构建产物（git ignored）
├── apps/
│   └── docs/                  # VitePress 文档站（@xu-harbor/docs）
├── .husky/                    # Git Hooks（pre-commit → lint-staged）
├── turbo.json                 # Turbo 任务配置
├── lerna.json                 # Lerna 独立版本发布 + conventional commits
└── pnpm-workspace.yaml
```

---

## 提交规范

仓库通过 husky `pre-commit` 钩子调用 lint-staged，**提交前自动**对暂存代码按包执行 `eslint --fix` 与 `prettier`，无法自动修复的错误会中断提交。

提交信息需遵循 [Conventional Commits](https://www.conventionalcommits.org/)，因为版本号与 `CHANGELOG.md` 由提交类型自动推导：

| 提交类型                                      | 影响                                          |
| --------------------------------------------- | --------------------------------------------- |
| `feat:`                                       | minor 版本，归入 changelog 的 **Features**    |
| `fix:`                                        | patch 版本，归入 changelog 的 **Bug Fixes**   |
| `perf:`                                       | patch 版本，归入 changelog 的 **Performance** |
| 提交体含 `BREAKING CHANGE:`                   | major 版本                                    |
| `chore:` `docs:` `style:` `refactor:` `test:` | 不触发发布，不进 changelog 正文               |

---

## 发布

仓库使用 Lerna **independent** 模式，各包独立版本号，并启用 `conventionalCommits`：发布时自动决定版本号、生成各包 `CHANGELOG.md`、打 tag 并推送。

```bash
# 稳定版发布（按提交自动 bump 版本 + 生成 CHANGELOG）
pnpm publish-stable

# 仅发布本地已有版本（不 bump）
pnpm exec lerna publish from-package
```

各包变更记录见对应目录下的 `CHANGELOG.md`（发布后自动生成，GitHub 可直接浏览）。

---

## 技术栈

<p>
  <img src="https://img.shields.io/badge/Vue-3-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Turbo-EF4444?style=for-the-badge&logo=turbo&logoColor=white" alt="Turbo" />
  <img src="https://img.shields.io/badge/Lerna-9333EA?style=for-the-badge" alt="Lerna" />
  <img src="https://img.shields.io/badge/Element_Plus-409EFF?style=for-the-badge" alt="Element Plus" />
</p>

---

## License

[MIT](./LICENSE) © [yobi](https://github.com/cuzme)
