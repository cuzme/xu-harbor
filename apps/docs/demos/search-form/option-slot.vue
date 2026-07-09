<script setup lang="ts">
import { SearchForm, SearchItem } from "@yobiccc/pro-components";
</script>

<template>
  <SearchForm :manual="true">
    <template #default="{ form }">
      <SearchItem label="姓名">
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </SearchItem>
    </template>
    <template #optionRight>
      <el-button>导出</el-button>
    </template>
  </SearchForm>
</template>
