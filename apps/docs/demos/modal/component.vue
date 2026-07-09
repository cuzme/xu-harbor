<script setup lang="ts">
import { useModal } from "@yobiccc/pro-components";
import UserEditForm from "./UserEditForm.vue";

// 父级持有控制器，透传给弹窗子组件
const modal = useModal();

const openAdd = () => modal.show({ props: { title: "新增用户", width: 460 } });
const openEdit = () =>
  modal.show({
    props: { title: "编辑用户", width: 460 },
    extra: { name: "张三", email: "zhangsan@example.com" },
  });
</script>

<template>
  <el-space>
    <el-button type="primary" @click="openAdd">新增用户</el-button>
    <el-button @click="openEdit">编辑用户</el-button>
  </el-space>

  <UserEditForm :modal="modal" />
</template>
