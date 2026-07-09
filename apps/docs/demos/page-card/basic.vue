<script setup lang="ts">
import { PageCard } from "@yobiccc/pro-components";
</script>

<template>
  <div style="padding: 16px; background: var(--el-fill-color-light)">
    <PageCard>
      <template #header>基础页面卡片</template>
      <p>PageCard 主要用于统一每个页面的内容区块样式，避免各页自行封装 ElCard 导致间距、边框不一致。</p>
      <p>默认无阴影、无边框，并统一 header/body 内边距，适用于搜索区、表格区、表单区等标准区块。</p>
    </PageCard>
  </div>
</template>
