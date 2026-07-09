<script setup lang="ts">
import { reactive, ref } from "vue";
import { Drawer, useDrawer } from "@yobiccc/pro-components";
import { ElMessage, type FormInstance } from "element-plus";

// 每个 useDrawer() 都是独立实例，一页多抽屉互不干扰
const editDrawer = useDrawer();
const detailDrawer = useDrawer();

const formRef = ref<FormInstance>();
const form = reactive({ name: "" });
const loading = ref(false);

const openEdit = () => editDrawer.show({ props: { title: "编辑用户", size: 420 } });
const openDetail = () =>
  detailDrawer.show({
    props: { title: "用户详情", size: 420 },
    extra: { name: "张三", role: "管理员", email: "zhangsan@example.com" },
  });

const onEditOpened = () => {
  form.name = "";
};

const onEditOk = (done: () => void) => {
  formRef.value?.validate((valid) => {
    if (!valid) return;
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      done();
      ElMessage.success("已保存");
    }, 600);
  });
};
</script>

<template>
  <el-space>
    <el-button type="primary" @click="openEdit">编辑抽屉</el-button>
    <el-button @click="openDetail">详情抽屉</el-button>
  </el-space>

  <!-- 抽屉一：带表单校验的编辑 -->
  <Drawer :drawer="editDrawer" :ok-loading="loading" :ok="onEditOk" :opened="onEditOpened">
    <el-form ref="formRef" :model="form" label-width="70px">
      <el-form-item
        label="姓名"
        prop="name"
        :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }"
      >
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </el-form-item>
    </el-form>
  </Drawer>

  <!-- 抽屉二：通过作用域插槽直接读取 extra 做只读展示 -->
  <Drawer :drawer="detailDrawer" :hide-ok="true" cancel-text="关闭">
    <template #default="{ extra }">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="姓名">{{ extra?.name }}</el-descriptions-item>
        <el-descriptions-item label="角色">{{ extra?.role }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ extra?.email }}</el-descriptions-item>
      </el-descriptions>
    </template>
  </Drawer>
</template>
