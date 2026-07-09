<script setup lang="ts">
import { SearchForm, SearchItem } from "@yobiccc/pro-components";
</script>

<template>
  <SearchForm show-collapse background :manual="true">
    <template #default="{ form, collapsed }">
      <SearchItem label="姓名">
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </SearchItem>
      <SearchItem label="编码">
        <el-input v-model="form.code" clearable placeholder="请输入" />
      </SearchItem>
      <SearchItem v-if="!collapsed" label="备注">
        <el-input v-model="form.remark" clearable placeholder="请输入" />
      </SearchItem>
    </template>
  </SearchForm>
</template>
