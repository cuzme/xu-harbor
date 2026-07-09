<script setup lang="ts">
import { reactive, ref } from "vue";
import { Modal, useModal } from "@yobiccc/pro-components";
import { ElMessage, type FormInstance } from "element-plus";

// 控制器：一个对象承载 visible/isDestroy/props/show/hide/destroy
const modal = useModal();

const formRef = ref<FormInstance>();
const form = reactive({ name: "", remark: "" });
const loading = ref(false);

const openAdd = () => modal.show({ props: { title: "新增", width: 480 } });
const openEdit = () =>
  modal.show({
    props: { title: "编辑", width: 480 },
    extra: { name: "张三", remark: "VIP 客户" },
  });

// 打开动画结束后用 extra 回填（关闭即销毁，每次打开都是全新表单）
const onOpened = () => {
  const extra = modal.extra.value ?? {};
  form.name = (extra.name as string) ?? "";
  form.remark = (extra.remark as string) ?? "";
};

const onOk = (done: () => void) => {
  formRef.value?.validate((valid) => {
    if (!valid) return;
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      done();
      ElMessage.success("保存成功");
    }, 600);
  });
};
</script>

<template>
  <el-space>
    <el-button type="primary" @click="openAdd">新增</el-button>
    <el-button @click="openEdit">编辑</el-button>
  </el-space>

  <Modal :modal="modal" :ok-loading="loading" :ok="onOk" :opened="onOpened">
    <el-form ref="formRef" :model="form" label-width="70px">
      <el-form-item
        label="姓名"
        prop="name"
        :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }"
      >
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入" />
      </el-form-item>
    </el-form>
  </Modal>
</template>
