<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TablePlus } from "@yobiccc/pro-components";
import type { RequestFn } from "@yobiccc/pro-components";

const allData = Array.from({ length: 43 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  age: 18 + (i % 30),
  email: `user${i + 1}@example.com`,
}));

const tableRef = ref<InstanceType<typeof TablePlus>>();

// 模拟后端分页：按 pageNum/pageSize 异步返回对应切片
const request: RequestFn = ({ pageNum, pageSize }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (pageNum - 1) * pageSize;
      resolve({ list: allData.slice(start, start + pageSize), total: allData.length });
    }, 300);
  });
};

onMounted(() => {
  tableRef.value?.query();
});
</script>

<template>
  <TablePlus ref="tableRef" :request="request">
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="age" label="年龄" width="100" />
    <el-table-column prop="email" label="邮箱" />
  </TablePlus>
</template>
