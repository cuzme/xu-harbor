<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal, useModal } from "@yobiccc/pro-components";
import { ElMessage, type FormInstance } from "element-plus";

// 每个 useModal() 都是独立实例，一页多弹窗互不干扰
const editModal = useModal();
const detailModal = useModal();

const formRef = ref<FormInstance>();
const form = reactive({ name: "" });
const loading = ref(false);

const openEdit = () => editModal.show({ props: { title: "编辑用户", width: 420 } });
const openDetail = () =>
  detailModal.show({
    props: { title: "用户详情", width: 420 },
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
    <el-button type="primary" @click="openEdit">编辑弹窗</el-button>
    <el-button @click="openDetail">详情弹窗</el-button>
  </el-space>

  <!-- 弹窗一：带表单校验的编辑 -->
  <Modal :modal="editModal" :ok-loading="loading" :ok="onEditOk" :opened="onEditOpened">
    <el-form ref="formRef" :model="form" label-width="70px">
      <el-form-item
        label="姓名"
        prop="name"
        :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }"
      >
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </el-form-item>
    </el-form>
  </Modal>

  <!-- 弹窗二：通过作用域插槽直接读取 extra 做只读展示 -->
  <Modal :modal="detailModal" :hide-ok="true" cancel-text="关闭">
    <template #default="{ extra }">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="姓名">{{ extra?.name }}</el-descriptions-item>
        <el-descriptions-item label="角色">{{ extra?.role }}</el-descriptions-item>
        <el-descriptions-item label="邮箱">{{ extra?.email }}</el-descriptions-item>
      </el-descriptions>
    </template>
  </Modal>
</template>
