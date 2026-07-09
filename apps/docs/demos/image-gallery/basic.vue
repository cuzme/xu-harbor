<script setup lang="ts">
import { ImageGallery } from "@yobiccc/pro-components";

// 图片地址来自 Lorem Picsum，使用固定 id 保证展示稳定
const images = [
  "https://picsum.photos/id/1015/300/300",
  "https://picsum.photos/id/1025/300/300",
  "https://picsum.photos/id/1035/300/300",
  "https://picsum.photos/id/1043/300/300",
];
</script>

<template>
  <ImageGallery :data="images" />
</template>
