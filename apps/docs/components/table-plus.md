# TablePlus 表格

对 `ElTable` + `ElPagination` 的组合封装，内置前端/后端分页、加载态、空状态、操作区插槽与高度自适应。

> 数据不会在挂载时自动加载，需要通过组件暴露的 `query()` 方法触发（通常在父组件 `onMounted` 中调用）。

## 基础用法（后端分页）

通过 `request` 传入请求方法，组件负责分页参数与数据渲染。默认插槽放置 `el-table-column`。

<script setup>
import { ref, onMounted } from 'vue'

const allData = Array.from({ length: 43 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  age: 18 + (i % 30),
  email: `user${i + 1}@example.com`,
}))

// 模拟后端分页：按 pageNum/pageSize 返回对应切片
const backRequest = ({ pageNum, pageSize }) => {
  const start = (pageNum - 1) * pageSize
  return {
    list: allData.slice(start, start + pageSize),
    total: allData.length,
  }
}

// 模拟前端分页：一次性返回全量，组件内部切片
const frontRequest = () => ({ list: allData, total: allData.length })

const backRef = ref()
const frontRef = ref()

onMounted(() => {
  backRef.value?.query()
  frontRef.value?.query()
})
</script>

<ClientOnly>
  <TablePlus ref="backRef" :request="backRequest" :default-page-size="5">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" width="100" />
    <el-table-column prop="email" label="邮箱" />
  </TablePlus>
</ClientOnly>

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TablePlus } from "@yobiccc/pro-components";
import type { RequestParams } from "@yobiccc/pro-components";

const tableRef = ref<InstanceType<typeof TablePlus>>();

const request = ({ pageNum, pageSize }: RequestParams) => {
  return fetchUsers({ pageNum, pageSize }); // 返回 { list, total }
};

onMounted(() => {
  tableRef.value?.query();
});
</script>

<template>
  <TablePlus ref="tableRef" :request="request" :default-page-size="5">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" width="100" />
    <el-table-column prop="email" label="邮箱" />
  </TablePlus>
</template>
```

## 前端分页

`pagination="front"` 时，`request` 只需返回全量数据，分页切片由组件在本地完成。

<ClientOnly>
  <TablePlus ref="frontRef" :request="frontRequest" pagination="front" :default-page-size="5">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" width="100" />
  </TablePlus>
</ClientOnly>

```vue
<template>
  <TablePlus :request="request" pagination="front" :default-page-size="5">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
  </TablePlus>
</template>
```

## 操作区插槽

`actionBar` 插槽用于在表格上方放置查询表单、按钮等。

```vue
<template>
  <TablePlus :request="request">
    <template #actionBar>
      <el-button type="primary" @click="tableRef.query()">刷新</el-button>
    </template>
    <el-table-column prop="name" label="姓名" />
  </TablePlus>
</template>
```

## Props

| 属性              | 类型                       | 默认值   | 说明                                 |
| ----------------- | -------------------------- | -------- | ------------------------------------ |
| `request`         | `RequestFn`                | -        | 请求方法，返回 `{ list, total }`     |
| `pagination`      | `'back' \| 'front'`        | `'back'` | 分页方式：后端分页 / 前端分页        |
| `hidePagination`  | `boolean`                  | `false`  | 是否隐藏分页器                       |
| `paginationProps` | `Partial<PaginationProps>` | `{}`     | 透传给 `ElPagination` 的配置         |
| `defaultPageSize` | `number`                   | `10`     | 默认每页条数                         |
| `adaptive`        | `boolean`                  | `false`  | 表格高度是否随窗口自适应             |
| `offsetBottom`    | `number`                   | `68`     | 自适应时表格距视口底部的偏移量（px） |

> 其余透传给 `ElTable` 的属性（如 `stripe`、`row-key` 等）可直接写在 `TablePlus` 上，会经 `$attrs` 转发。

## 插槽

| 插槽        | 说明                        |
| ----------- | --------------------------- |
| `default`   | 表格列（`el-table-column`） |
| `actionBar` | 表格上方的操作区            |

## 暴露方法

| 名称          | 类型                                         | 说明                                   |
| ------------- | -------------------------------------------- | -------------------------------------- |
| `query`       | `(params?: Record<string, unknown>) => void` | 触发查询，传入 `params` 会重置到第一页 |
| `setAdaptive` | `() => void`                                 | 手动触发高度自适应                     |
| `elTableRef`  | `Ref`                                        | 内部 `ElTable` 实例引用                |
