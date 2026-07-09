<script setup lang="ts">
import { reactive, ref } from "vue";
import { Drawer, type DrawerController } from "@yobiccc/pro-components";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";

interface UserData {
  name: string;
  email: string;
}

// 控制器由父级 useDrawer 提供并透传进来
const props = defineProps<{
  drawer: DrawerController;
}>();

const formRef = ref<FormInstance>();
const loading = ref(false);
const form = reactive<UserData>({ name: "", email: "" });

const rules: FormRules = {
  name: { required: true, message: "请输入姓名", trigger: "blur" },
  email: { required: true, message: "请输入邮箱", trigger: "blur" },
};

// 打开动画结束后用控制器的 extra 回填
const onOpened = () => {
  const extra = (props.drawer.extra.value ?? {}) as Partial<UserData>;
  form.name = extra.name ?? "";
  form.email = extra.email ?? "";
};

const onOk = (hide: () => void) => {
  formRef.value?.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      ElMessage.success(`保存成功：${form.name}`);
      hide();
    } finally {
      loading.value = false;
    }
  });
};
</script>

<template>
  <Drawer :drawer="drawer" :ok-loading="loading" :ok="onOk" :opened="onOpened">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="70px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" clearable placeholder="请输入" />
      </el-form-item>
    </el-form>
  </Drawer>
</template>
