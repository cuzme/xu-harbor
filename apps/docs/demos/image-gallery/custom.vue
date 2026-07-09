<script setup lang="ts">
import { ref } from "vue";
import { ImageGallery } from "@yobiccc/pro-components";

// 图片地址来自 Lorem Picsum，使用固定 id 保证展示稳定
const images = [
  "https://picsum.photos/id/1050/300/300",
  "https://picsum.photos/id/1060/300/300",
  "https://picsum.photos/id/1070/300/300",
];

// 切换空数据以演示 empty 空态
const empty = ref(false);
</script>

<template>
  <el-space direction="vertical" alignment="flex-start" :size="16">
    <el-switch v-model="empty" active-text="空数据" inactive-text="有数据" />
    <ImageGallery :data="empty ? [] : images" :size="120" :gap="16">
      <template #empty>
        <el-empty description="暂无图片" :image-size="80" />
      </template>
    </ImageGallery>
  </el-space>
</template>
