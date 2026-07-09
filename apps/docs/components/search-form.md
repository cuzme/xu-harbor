# SearchForm 搜索表单

对 `ElForm` + `ElRow` 的组合封装，配合 `SearchItem` 以栅格化的方式快速搭建查询表单，内置查询/重置、折叠、操作区插槽与操作栏列宽自适应。

> 表单字段通过默认插槽内的 `SearchItem` 组合而成，`SearchItem` 已随组件库全局注册，可直接在模板中使用；也可从 `@yobiccc/pro-components` 具名导入。

## 基础用法

默认插槽提供 `form`（响应式表单数据）与 `setForm` 作用域参数，字段用 `v-model` 双向绑定到 `form`。组件挂载时默认自动触发一次 `search`（可用 `manual` 关闭）。

<script setup>
import { ref } from 'vue'

const lastQuery = ref('（尚未查询）')

const onSearch = (form) => {
  lastQuery.value = JSON.stringify(form)
}
</script>

<ClientOnly>
  <SearchForm @search="onSearch">
    <template #default="{ form }">
      <SearchItem label="姓名">
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </SearchItem>
      <SearchItem label="编码">
        <el-input v-model="form.code" clearable placeholder="请输入" />
      </SearchItem>
      <SearchItem label="状态">
        <el-select v-model="form.status" clearable placeholder="请选择">
          <el-option label="启用" :value="1" />
          <el-option label="停用" :value="0" />
        </el-select>
      </SearchItem>
    </template>
  </SearchForm>
  <div style="color: var(--vp-c-text-2)">最近查询参数：{{ lastQuery }}</div>
</ClientOnly>

```vue
<script setup lang="ts">
import { SearchForm, SearchItem } from "@yobiccc/pro-components";

const onSearch = (form: Record<string, unknown>) => {
  fetchList(form); // 拉取列表
};
</script>

<template>
  <SearchForm @search="onSearch">
    <template #default="{ form }">
      <SearchItem label="姓名">
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </SearchItem>
      <SearchItem label="编码">
        <el-input v-model="form.code" clearable placeholder="请输入" />
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

## 折叠与背景

`show-collapse` 显示折叠按钮，`background` 为表单添加卡片背景。折叠状态可通过默认插槽的 `collapsed` 控制字段显隐。

<ClientOnly>
  <SearchForm show-collapse background :manual="true">
    <template #default="{ form, collapsed }">
      <SearchItem label="姓名">
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </SearchItem>
      <SearchItem label="编码">
        <el-input v-model="form.code" clearable placeholder="请输入" />
      </SearchItem>
      <SearchItem v-show="!collapsed" label="备注">
        <el-input v-model="form.remark" clearable placeholder="请输入" />
      </SearchItem>
    </template>
  </SearchForm>
</ClientOnly>

```vue
<template>
  <SearchForm show-collapse background :manual="true">
    <template #default="{ form, collapsed }">
      <SearchItem label="姓名">
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </SearchItem>
      <SearchItem label="编码">
        <el-input v-model="form.code" clearable placeholder="请输入" />
      </SearchItem>
      <SearchItem v-show="!collapsed" label="备注">
        <el-input v-model="form.remark" clearable placeholder="请输入" />
      </SearchItem>
    </template>
  </SearchForm>
</template>
```

## SearchItem 标签提示

`required` 显示红色星号，`tooltip` 在标签后追加帮助图标，`label-tooltip` 让过长标签在悬浮时以 tooltip 展示完整文本。

```vue
<template>
  <SearchForm :manual="true">
    <template #default="{ form }">
      <SearchItem label="必填项" required>
        <el-input v-model="form.a" clearable />
      </SearchItem>
      <SearchItem label="带说明" tooltip="这里是字段说明">
        <el-input v-model="form.b" clearable />
      </SearchItem>
    </template>
  </SearchForm>
</template>
```

## 操作区插槽

`optionLeft` / `optionRight` 用于在重置、查询按钮左右追加自定义按钮。

```vue
<template>
  <SearchForm>
    <template #default="{ form }">
      <SearchItem label="姓名">
        <el-input v-model="form.name" clearable />
      </SearchItem>
    </template>
    <template #optionRight>
      <el-button>导出</el-button>
    </template>
  </SearchForm>
</template>
```

## SearchForm Props

| 属性                | 类型                                        | 默认值   | 说明                                         |
| ------------------- | ------------------------------------------- | -------- | -------------------------------------------- |
| `searchText`        | `string`                                    | `'查询'` | 查询按钮文本                                 |
| `resetText`         | `string`                                    | `'重置'` | 重置按钮文本                                 |
| `initData`          | `Record<string, unknown>`                   | `{}`     | 表单初始数据                                 |
| `manual`            | `boolean`                                   | `false`  | 是否关闭挂载时的首次自动查询                 |
| `resetAll`          | `boolean`                                   | `true`   | 重置时清空所有字段（否则回退到 `initData`）  |
| `showReset`         | `boolean`                                   | `true`   | 是否显示重置按钮                             |
| `showCollapse`      | `boolean`                                   | `false`  | 是否显示折叠按钮                             |
| `defaultCollapsed`  | `boolean`                                   | `true`   | 默认是否折叠                                 |
| `resetBeforeSearch` | `boolean`                                   | `false`  | 重置时先触发 `reset` 再触发 `search`         |
| `onResetAsync`      | `(form, formRef) => Promise<void> \| void`  | -        | 异步重置回调，执行期间重置按钮显示 loading   |
| `background`        | `boolean`                                   | `false`  | 是否显示卡片背景                             |
| `actionCol`         | `(collapsed: boolean) => ColConfig \| void` | -        | 自定义操作栏列宽，返回空时使用内部自适应列宽 |

> 其余属性透传给 `ElForm`。

## SearchForm 事件

| 事件             | 参数                   | 说明               |
| ---------------- | ---------------------- | ------------------ |
| `search`         | `(form, formRef)`      | 点击查询时触发     |
| `reset`          | `(form, formRef)`      | 点击重置时触发     |
| `collapseChange` | `(collapsed: boolean)` | 折叠状态变化时触发 |

## SearchForm 插槽

| 插槽          | 作用域参数                     | 说明              |
| ------------- | ------------------------------ | ----------------- |
| `default`     | `{ form, setForm, collapsed }` | 放置 `SearchItem` |
| `optionLeft`  | `{ form, setForm }`            | 操作按钮左侧      |
| `optionRight` | `{ form, setForm }`            | 操作按钮右侧      |

## SearchForm 暴露方法

| 名称           | 类型                                        | 说明         |
| -------------- | ------------------------------------------- | ------------ |
| `form`         | `Record<string, unknown>`                   | 当前表单数据 |
| `setForm`      | `(key?: string, value?: unknown) => void`   | 设置单个字段 |
| `setForms`     | `(models: Record<string, unknown>) => void` | 批量设置字段 |
| `resetForm`    | `() => void`                                | 重置表单     |
| `search`       | `() => void`                                | 触发查询     |
| `setCollapsed` | `(val: boolean) => void`                    | 设置折叠状态 |

## SearchItem Props

| 属性           | 类型        | 默认值                         | 说明                      |
| -------------- | ----------- | ------------------------------ | ------------------------- |
| `col`          | `ColConfig` | `{ sm:24, md:12, lg:8, xl:6 }` | 响应式栅格列配置          |
| `required`     | `boolean`   | `false`                        | 是否显示红色必填星号      |
| `label`        | `string`    | `''`                           | 标签文本                  |
| `labelTooltip` | `boolean`   | `false`                        | 标签过长时以 tooltip 展示 |
| `tooltip`      | `string`    | `''`                           | 标签后帮助图标的提示内容  |

> 其余属性透传给 `ElFormItem`（如 `prop`、`rules` 等）。
