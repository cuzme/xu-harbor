<script setup lang="ts">
import { SearchForm, SearchItem } from "@yobiccc/pro-components";
</script>

<template>
  <SearchForm :manual="true">
    <template #default="{ form }">
      <SearchItem label="必填项" required>
        <el-input v-model="form.a" clearable placeholder="请输入" />
      </SearchItem>
      <SearchItem label="带说明" tooltip="这里是字段说明">
        <el-input v-model="form.b" clearable placeholder="请输入" />
      </SearchItem>
    </template>
  </SearchForm>
</template>
