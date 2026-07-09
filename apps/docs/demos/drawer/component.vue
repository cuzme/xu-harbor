<script setup lang="ts">
import { useDrawer } from "@yobiccc/pro-components";
import UserEditForm from "./UserEditForm.vue";

// 父级持有控制器，透传给抽屉子组件
const drawer = useDrawer();

const openAdd = () => drawer.show({ props: { title: "新增用户", size: 460 } });
const openEdit = () =>
  drawer.show({
    props: { title: "编辑用户", size: 460 },
    extra: { name: "张三", email: "zhangsan@example.com" },
  });
</script>

<template>
  <el-space>
    <el-button type="primary" @click="openAdd">新增用户</el-button>
    <el-button @click="openEdit">编辑用户</el-button>
  </el-space>

  <UserEditForm :drawer="drawer" />
</template>
