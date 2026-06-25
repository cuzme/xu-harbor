<div align="center">

# xu-harbor

**A Vue 3 monorepo harbor for shared components, utilities, and frontend packages.**

基于 pnpm + Turbo + Lerna 的 Vue 3 monorepo，沉淀可复用的业务组件与前端公共能力。

<br />

[![license](https://img.shields.io/github/license/cuzme/xu-harbor?style=flat-square)](LICENSE)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![vue](https://img.shields.io/badge/vue-3.x-42b883?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![element plus](https://img.shields.io/badge/element--plus-2.x-409eff?style=flat-square)](https://element-plus.org/)

[![npm version](https://img.shields.io/npm/v/@yobiccc/pro-componens?style=flat-square)](https://www.npmjs.com/package/@yobiccc/pro-componens)
[![npm downloads](https://img.shields.io/npm/dm/@yobiccc/pro-componens?style=flat-square)](https://www.npmjs.com/package/@yobiccc/pro-componens)

[快速开始](#快速开始) · [组件文档](#packages) · [本地开发](#本地开发) · [发布](#发布)

</div>

---

## 特性

- **Monorepo 架构** — pnpm workspace + Turbo 任务编排 + Lerna 独立版本发布
- **Vue 3 + TSX** — 基于 Element Plus 二次封装，保留类型提示
- **双格式产物** — ESM (`.mjs`) + CJS (`.cjs`)，自动生成 `.d.mts` / `.d.cts`
- **按需引入** — 支持具名导入单个组件，独立样式入口 `@yobiccc/pro-componens/style.css`
- **工程化完备** — ESLint、Prettier、Git Hooks 一应俱全

---

## Packages

| 包名 | 版本 | 说明 |
| --- | --- | --- |
| [@yobiccc/pro-componens](./packages/proComponens) | [![npm](https://img.shields.io/npm/v/@yobiccc/pro-componens?style=flat-square)](https://www.npmjs.com/package/@yobiccc/pro-componens) | 基于 Element Plus 的业务组件库 |

---

## 快速开始

### 安装

```bash
pnpm add @yobiccc/pro-componens element-plus vue
```

### 引入样式

```ts
// main.ts
import '@yobiccc/pro-componens/style.css';
import 'element-plus/dist/index.css';
```

### 全量注册

```ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import ProComponens from '@yobiccc/pro-componens';
import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(ProComponens);
app.mount('#app');
```

### 按需使用

```vue
<script setup lang="ts">
import { ButtonPlus } from '@yobiccc/pro-componens';
</script>

<template>
  <ButtonPlus type="primary" size="default">Click me</ButtonPlus>
</template>
```

### ButtonPlus Props

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `type` | `ButtonType` | `'primary'` | 按钮类型，同 Element Plus `ElButton` |
| `size` | `'large' \| 'default' \| 'small'` | `'default'` | 按钮尺寸 |

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
pnpm --filter @yobiccc/pro-componens build

# 代码检查 & 格式化
pnpm lint
pnpm lint:fix
pnpm format

# 发布前检查（lint:fix → format → build）
pnpm release:prepare
```

---

## 项目结构

```text
xu-harbor/
├── packages/
│   └── proComponens/          # @yobiccc/pro-componens 组件库
│       ├── src/
│       │   ├── components/    # 业务组件
│       │   └── utils/         # 工具函数
│       ├── es/                # ESM 构建产物（git ignored）
│       └── lib/               # CJS 构建产物（git ignored）
├── turbo.json                 # Turbo 任务配置
├── lerna.json                 # Lerna 独立版本发布
└── pnpm-workspace.yaml
```

---

## 发布

仓库使用 Lerna **independent** 模式，各包独立版本号。

```bash
# 稳定版发布
pnpm publish-stable

# 仅发布本地已有版本（不 bump）
pnpm exec lerna publish from-package
```

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
