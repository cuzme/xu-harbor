# 快速开始

`@yobiccc/pro-components` 是基于 [Element Plus](https://element-plus.org/) 封装的 Vue 3 业务组件库。

## 安装

```bash
pnpm add @yobiccc/pro-components vue element-plus @element-plus/icons-vue @vueuse/core lodash-es
```

### Peer Dependencies

组件库将以下依赖声明为 `peerDependencies`，请确保项目中已安装：

| 包                        | 版本       |
| ------------------------- | ---------- |
| `vue`                     | `^3.0.0`   |
| `element-plus`            | `^2.0.0`   |
| `@element-plus/icons-vue` | `^2.0.0`   |
| `@vueuse/core`            | `^14.0.0`  |
| `lodash-es`               | `^4.17.21` |

## 引入样式

```ts
// main.ts
import "@yobiccc/pro-components/style.css";
import "element-plus/dist/index.css";
```

> 样式需手动引入，不会随 JS 自动注入。

## 全量注册

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

## 按需引入

```vue
<script setup lang="ts">
import { SearchForm, SearchItem } from "@yobiccc/pro-components";
</script>

<template>
  <SearchForm>
    <template #default="{ form }">
      <SearchItem label="姓名">
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </SearchItem>
    </template>
  </SearchForm>
</template>
```
