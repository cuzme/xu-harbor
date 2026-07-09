<div align="center">

# @yobiccc/pro-components

基于 [Element Plus](https://element-plus.org/) 封装的 Vue 3 业务组件库，支持 TypeScript、按需引入与独立样式加载。

<br />

[![npm version](https://img.shields.io/npm/v/@yobiccc/pro-components?style=flat-square)](https://www.npmjs.com/package/@yobiccc/pro-components)
[![license](https://img.shields.io/npm/l/@yobiccc/pro-components?style=flat-square)](https://github.com/cuzme/xu-harbor/blob/main/LICENSE)
[![vue](https://img.shields.io/badge/vue-3.x-42b883?style=flat-square&logo=vuedotjs&logoColor=white)](https://vuejs.org/)

[安装](#安装) · [快速上手](#快速上手) · [组件](#组件) · [仓库](https://github.com/cuzme/xu-harbor)

</div>

---

## 特性

- 基于 Element Plus 二次封装，降低业务侧使用成本
- 完整的 TypeScript 类型支持（`.d.ts`）
- ESM + CJS 双格式产物，兼容 `import` 与 `require`
- 支持全量注册与按需引入单个组件
- 独立样式入口，配合 CSS Modules 按需加载

---

## 安装

```bash
pnpm add @yobiccc/pro-components vue element-plus @element-plus/icons-vue @vueuse/core lodash-es
```

```bash
npm install @yobiccc/pro-components vue element-plus @element-plus/icons-vue @vueuse/core lodash-es
```

### Peer Dependencies

请确保项目中已安装：

| 包                        | 版本       |
| ------------------------- | ---------- |
| `vue`                     | `^3.0.0`   |
| `element-plus`            | `^2.0.0`   |
| `@element-plus/icons-vue` | `^2.0.0`   |
| `@vueuse/core`            | `^14.0.0`  |
| `lodash-es`               | `^4.17.21` |

---

## 快速上手

### 1. 引入样式

```ts
// main.ts
import '@yobiccc/pro-components/style.css';
import 'element-plus/dist/index.css';
```

> 样式需手动引入，不会随 JS 自动注入。

### 2. 全量注册

```ts
import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import ProComponents from '@yobiccc/pro-components';
import App from './App.vue';

const app = createApp(App);

app.use(ElementPlus);
app.use(ProComponents);
app.mount('#app');
```

### 3. 按需引入

```vue
<script setup lang="ts">
import { ButtonPlus } from '@yobiccc/pro-components';
</script>

<template>
  <ButtonPlus type="primary" size="large">提交</ButtonPlus>
</template>
```

或仅注册单个组件：

```ts
import { ButtonPlus } from '@yobiccc/pro-components';

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

### TablePlus

对 `ElTable` + `ElPagination` 的组合封装，内置前端/后端分页、加载态、空状态、操作区插槽与高度自适应。数据通过暴露的 `query()` 方法触发加载（通常在 `onMounted` 中调用）。

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TablePlus } from '@yobiccc/pro-components';
import type { RequestParams } from '@yobiccc/pro-components';

const tableRef = ref<InstanceType<typeof TablePlus>>();

const request = ({ pageNum, pageSize }: RequestParams) => fetchUsers({ pageNum, pageSize });

onMounted(() => tableRef.value?.query());
</script>

<template>
  <TablePlus ref="tableRef" :request="request">
    <template #actionBar>
      <el-button type="primary" @click="tableRef?.query()">刷新</el-button>
    </template>
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
  </TablePlus>
</template>
```

#### Props

| 属性              | 类型                       | 默认值   | 说明                             |
| ----------------- | -------------------------- | -------- | -------------------------------- |
| `request`         | `RequestFn`                | -        | 请求方法，返回 `{ list, total }` |
| `pagination`      | `'back' \| 'front'`        | `'back'` | 后端分页 / 前端分页              |
| `hidePagination`  | `boolean`                  | `false`  | 是否隐藏分页器                   |
| `paginationProps` | `Partial<PaginationProps>` | `{}`     | 透传给 `ElPagination` 的配置     |
| `defaultPageSize` | `number`                   | `10`     | 默认每页条数                     |
| `adaptive`        | `boolean`                  | `false`  | 表格高度是否随窗口自适应         |
| `offsetBottom`    | `number`                   | `68`     | 自适应时距视口底部的偏移量（px） |

其余属性经 `$attrs` 透传给 `ElTable`。

#### 插槽

| 插槽        | 说明                        |
| ----------- | --------------------------- |
| `default`   | 表格列（`el-table-column`） |
| `actionBar` | 表格上方操作区              |

#### 暴露方法

| 名称          | 说明                                   |
| ------------- | -------------------------------------- |
| `query`       | 触发查询，传入 `params` 会重置到第一页 |
| `setAdaptive` | 手动触发高度自适应                     |
| `elTableRef`  | 内部 `ElTable` 实例引用                |

### SearchForm

对 `ElForm` + `ElRow` 的组合封装，配合 `SearchItem` 以栅格化方式快速搭建查询表单，内置查询/重置、折叠、操作区插槽与操作栏列宽自适应。字段通过默认插槽内的 `SearchItem` 组合而成，`SearchItem` 已全局注册，也可具名导入。

```vue
<script setup lang="ts">
import { SearchForm, SearchItem } from '@yobiccc/pro-components';

const onSearch = (form: Record<string, unknown>) => fetchList(form);
</script>

<template>
  <SearchForm @search="onSearch">
    <template #default="{ form }">
      <SearchItem label="姓名">
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </SearchItem>
      <SearchItem label="状态">
        <el-select v-model="form.status" clearable placeholder="请选择">
          <el-option label="启用" :value="1" />
          <el-option label="停用" :value="0" />
        </el-select>
      </SearchItem>
    </template>
  </SearchForm>
</template>
```

#### SearchForm Props

| 属性                | 类型                                       | 默认值   | 说明                                        |
| ------------------- | ------------------------------------------ | -------- | ------------------------------------------- |
| `searchText`        | `string`                                   | `'查询'` | 查询按钮文本                                |
| `resetText`         | `string`                                   | `'重置'` | 重置按钮文本                                |
| `initData`          | `Record<string, unknown>`                  | `{}`     | 表单初始数据                                |
| `manual`            | `boolean`                                  | `false`  | 是否关闭挂载时首次自动查询                  |
| `resetAll`          | `boolean`                                  | `true`   | 重置时清空所有字段（否则回退到 `initData`） |
| `showReset`         | `boolean`                                  | `true`   | 是否显示重置按钮                            |
| `showCollapse`      | `boolean`                                  | `false`  | 是否显示折叠按钮                            |
| `defaultCollapsed`  | `boolean`                                  | `true`   | 默认是否折叠                                |
| `resetBeforeSearch` | `boolean`                                  | `false`  | 重置时先触发 `reset` 再触发 `search`        |
| `onResetAsync`      | `(form, formRef) => Promise<void> \| void` | -        | 异步重置回调，执行期间按钮显示 loading      |
| `background`        | `boolean`                                  | `false`  | 是否显示卡片背景                            |
| `actionCol`         | `(collapsed) => ColConfig \| void`         | -        | 自定义操作栏列宽，空时使用内部自适应        |

其余属性透传给 `ElForm`。

#### SearchForm 事件

| 事件             | 参数                   | 说明               |
| ---------------- | ---------------------- | ------------------ |
| `search`         | `(form, formRef)`      | 点击查询时触发     |
| `reset`          | `(form, formRef)`      | 点击重置时触发     |
| `collapseChange` | `(collapsed: boolean)` | 折叠状态变化时触发 |

#### SearchForm 插槽

| 插槽          | 作用域参数                     | 说明              |
| ------------- | ------------------------------ | ----------------- |
| `default`     | `{ form, setForm, collapsed }` | 放置 `SearchItem` |
| `optionLeft`  | `{ form, setForm }`            | 操作按钮左侧      |
| `optionRight` | `{ form, setForm }`            | 操作按钮右侧      |

#### SearchForm 暴露方法

| 名称           | 说明         |
| -------------- | ------------ |
| `form`         | 当前表单数据 |
| `setForm`      | 设置单个字段 |
| `setForms`     | 批量设置字段 |
| `resetForm`    | 重置表单     |
| `search`       | 触发查询     |
| `setCollapsed` | 设置折叠状态 |

#### SearchItem Props

| 属性           | 类型      | 默认值  | 说明                      |
| -------------- | --------- | ------- | ------------------------- |
| `required`     | `boolean` | `false` | 是否显示红色必填星号      |
| `label`        | `string`  | `''`    | 标签文本                  |
| `labelTooltip` | `boolean` | `false` | 标签过长时以 tooltip 展示 |
| `tooltip`      | `string`  | `''`    | 标签后帮助图标的提示内容  |

其余属性透传给 `ElFormItem`。

---

## 导出说明

```ts
// 默认导出：带 install 方法的插件对象
import ProComponents from '@yobiccc/pro-components';

// 具名导出
import { ButtonPlus, install } from '@yobiccc/pro-components';
```

| 入口                                | 说明             |
| ----------------------------------- | ---------------- |
| `@yobiccc/pro-components`           | 组件与插件主入口 |
| `@yobiccc/pro-components/style.css` | 组件库样式文件   |

---

## 本地开发

本包源码位于 monorepo [xu-harbor](https://github.com/cuzme/xu-harbor) 中。

```bash
git clone git@github.com:cuzme/xu-harbor.git
cd xu-harbor
pnpm install
pnpm --filter @yobiccc/pro-components build
```

---

## License

[MIT](https://github.com/cuzme/xu-harbor/blob/main/LICENSE) © [yobiccc](https://github.com/cuzme)
