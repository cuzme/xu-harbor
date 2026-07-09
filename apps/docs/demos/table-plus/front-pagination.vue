<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TablePlus } from "@yobiccc/pro-components";
import type { RequestFn } from "@yobiccc/pro-components";

const allData = Array.from({ length: 43 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  age: 18 + (i % 30),
}));

const tableRef = ref<InstanceType<typeof TablePlus>>();

// 前端分页：一次性返回全量，分页切片由组件本地完成
const request: RequestFn = () => ({ list: allData, total: allData.length });

onMounted(() => {
  tableRef.value?.query();
});
</script>

<template>
  <TablePlus ref="tableRef" :request="request" pagination="front">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" />
  </TablePlus>
</template>
