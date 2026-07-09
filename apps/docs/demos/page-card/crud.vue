<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import {
  PageCard,
  SearchForm,
  SearchItem,
  TablePlus,
} from "@yobiccc/pro-components";
import type { RequestFn, TablePlusInstance } from "@yobiccc/pro-components";
import { ElMessage } from "element-plus";

const allData = Array.from({ length: 43 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  status: i % 2,
}));

const tableRef = ref<TablePlusInstance>();

const request: RequestFn = ({ pageNum, pageSize, params }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = allData;
      const name = String(params.name ?? "").trim();
      if (name) {
        filtered = filtered.filter((item) => item.name.includes(name));
      }
      if (params.status !== undefined && params.status !== null && params.status !== "") {
        filtered = filtered.filter((item) => item.status === params.status);
      }
      const start = (pageNum - 1) * pageSize;
      resolve({
        list: filtered.slice(start, start + pageSize),
        total: filtered.length,
      });
    }, 300);
  });
};

const onSearch = (form: Record<string, unknown>) => {
  tableRef.value?.query(form);
};

const onAdd = () => {
  ElMessage.info("演示：打开新增弹窗");
};

const onEdit = (row: { name: string }) => {
  ElMessage.info(`演示：编辑「${row.name}」`);
};

const onDelete = (row: { name: string }) => {
  ElMessage.warning(`演示：删除「${row.name}」`);
};

onMounted(() => {
  nextTick(() => tableRef.value?.query());
});
</script>

<template>
  <div style="padding: 16px; background: var(--el-fill-color-light)">
    <PageCard>
      <template #header>用户管理</template>

      <SearchForm background manual @search="onSearch">
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

      <TablePlus ref="tableRef" :request="request">
        <template #actionBar>
          <el-button type="primary" @click="onAdd">新增</el-button>
        </template>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'">
              {{ row.status === 1 ? "启用" : "停用" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="onEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="onDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </TablePlus>
    </PageCard>
  </div>
</template>
