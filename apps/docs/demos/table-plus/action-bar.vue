<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TablePlus } from "@yobiccc/pro-components";
import type { RequestFn } from "@yobiccc/pro-components";

const allData = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
}));

const tableRef = ref<InstanceType<typeof TablePlus>>();

const request: RequestFn = ({ pageNum, pageSize }) => {
  const start = (pageNum - 1) * pageSize;
  return { list: allData.slice(start, start + pageSize), total: allData.length };
};

onMounted(() => {
  tableRef.value?.query();
});
</script>

<template>
  <TablePlus ref="tableRef" :request="request">
    <template #actionBar>
      <el-button type="primary" @click="tableRef?.query()">刷新</el-button>
    </template>
    <el-table-column prop="id" label="ID" width="80" />
    <el-table-column prop="name" label="姓名" />
  </TablePlus>
</template>
