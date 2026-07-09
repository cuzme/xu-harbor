<script setup lang="ts">
import { ButtonPlus } from "@yobiccc/pro-components";
</script>

<template>
  <div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
    <ButtonPlus>默认按钮</ButtonPlus>
    <ButtonPlus type="primary">主要按钮</ButtonPlus>
    <ButtonPlus type="success">成功按钮</ButtonPlus>
    <ButtonPlus type="warning">警告按钮</ButtonPlus>
    <ButtonPlus type="danger">危险按钮</ButtonPlus>
  </div>
</template>
