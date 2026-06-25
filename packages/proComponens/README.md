<div align="center">

# @yobiccc/pro-componens

基于 [Element Plus](https://element-plus.org/) 封装的 Vue 3 业务组件库，支持 TypeScript、按需引入与独立样式加载。

<br />

[![npm version](https://img.shields.io/npm/v/@yobiccc/pro-componens?style=flat-square)](https://www.npmjs.com/package/@yobiccc/pro-componens)
[![npm downloads](https://img.shields.io/npm/dm/@yobiccc/pro-componens?style=flat-square)](https://www.npmjs.com/package/@yobiccc/pro-componens)
[![license](https://img.shields.io/npm/l/@yobiccc/pro-componens?style=flat-square)](https://github.com/cuzme/xu-harbor/blob/main/LICENSE)
[![vue](https://img.shields.io/badge/vue-3.x-42b883?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org/)

[安装](#安装) · [快速上手](#快速上手) · [组件](#组件) · [仓库](https://github.com/cuzme/xu-harbor)

</div>

---

## 特性

- 基于 Element Plus 二次封装，降低业务侧使用成本
- 完整的 TypeScript 类型支持（`.d.mts` / `.d.cts`）
- ESM + CJS 双格式产物，兼容 `import` 与 `require`
- 支持全量注册与按需引入单个组件
- 独立样式入口，配合 CSS Modules 按需加载

---

## 安装

```bash
pnpm add @yobiccc/pro-componens element-plus vue
```

```bash
npm install @yobiccc/pro-componens element-plus vue
```

### Peer Dependencies

请确保项目中已安装：

| 包             | 版本     |
| -------------- | -------- |
| `vue`          | `^3.0.0` |
| `element-plus` | `^2.0.0` |

---

## 快速上手

### 1. 引入样式

```ts
// main.ts
import '@yobiccc/pro-componens/style.css';
import 'element-plus/dist/index.css';
```

> 样式需手动引入，不会随 JS 自动注入。

### 2. 全量注册

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

### 3. 按需引入

```vue
<script setup lang="ts">
import { ButtonPlus } from '@yobiccc/pro-componens';
</script>

<template>
  <ButtonPlus type="primary" size="large">提交</ButtonPlus>
</template>
```

或仅注册单个组件：

```ts
import { ButtonPlus } from '@yobiccc/pro-componens';

app.use(ButtonPlus);
```

---

## 组件

### ButtonPlus

在 `ElButton` 基础上封装的增强按钮，支持默认插槽自定义内容。

#### 基础用法

```vue
<template>
  <ButtonPlus>默认按钮</ButtonPlus>
  <ButtonPlus type="success" size="small">小号成功按钮</ButtonPlus>
</template>
```

#### Props

| 属性   | 类型                              | 默认值      | 说明                                                |
| ------ | --------------------------------- | ----------- | --------------------------------------------------- |
| `type` | `ButtonType`                      | `'primary'` | 按钮类型，与 Element Plus `ElButton` 的 `type` 一致 |
| `size` | `'large' \| 'default' \| 'small'` | `'default'` | 按钮尺寸                                            |

#### 插槽

| 插槽      | 说明     |
| --------- | -------- |
| `default` | 按钮内容 |

---

## 导出说明

```ts
// 默认导出：带 install 方法的插件对象
import ProComponens from '@yobiccc/pro-componens';

// 具名导出
import { ButtonPlus, install } from '@yobiccc/pro-componens';
```

| 入口                               | 说明             |
| ---------------------------------- | ---------------- |
| `@yobiccc/pro-componens`           | 组件与插件主入口 |
| `@yobiccc/pro-componens/style.css` | 组件库样式文件   |

---

## 本地开发

本包源码位于 monorepo [xu-harbor](https://github.com/cuzme/xu-harbor) 中。

```bash
git clone git@github.com:cuzme/xu-harbor.git
cd xu-harbor
pnpm install
pnpm --filter @yobiccc/pro-componens build
```

---

## License

[MIT](https://github.com/cuzme/xu-harbor/blob/main/LICENSE) © [yobiccc](https://github.com/cuzme)
