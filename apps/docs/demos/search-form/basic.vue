<script setup lang="ts">
import { ref } from "vue";
import { SearchForm, SearchItem } from "@yobiccc/pro-components";

const lastQuery = ref("（尚未查询）");

const onSearch = (form: Record<string, unknown>) => {
  lastQuery.value = JSON.stringify(form);
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
  <div style="color: var(--el-text-color-secondary)">
    最近查询参数：{{ lastQuery }}
  </div>
</template>
