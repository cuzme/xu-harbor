<script setup lang="ts">
import { ref } from "vue";
import { PageCard, ImageGallery } from "@yobiccc/pro-components";
import { ElMessage } from "element-plus";

const receiptImages = [
  "https://picsum.photos/id/1015/300/300",
  "https://picsum.photos/id/1025/300/300",
  "https://picsum.photos/id/1035/300/300",
];

const productImages = [
  "https://picsum.photos/id/1043/300/300",
  "https://picsum.photos/id/1050/300/300",
];

const attachments = [
  { name: "合同扫描件.pdf", url: "#" },
  { name: "客户资质.jpg", url: "#" },
];

const products = ref([
  {
    name: "商品 A",
    price: 199,
    num: 2,
    remark: "现货",
    status: "已发货",
    createTime: "2024-06-01 10:00:00",
    updateTime: "2024-06-02 14:30:00",
  },
  {
    name: "商品 B",
    price: 299,
    num: 1,
    remark: "预售",
    status: "待发货",
    createTime: "2024-06-01 10:00:00",
    updateTime: "2024-06-01 10:00:00",
  },
  {
    name: "商品 C",
    price: 89,
    num: 5,
    remark: "-",
    status: "已发货",
    createTime: "2024-06-01 10:00:00",
    updateTime: "2024-06-03 09:15:00",
  },
]);

const cardGap = { marginTop: "16px" };

const onRemind = () => ElMessage.info("演示：已发送催办通知");
const onSubmit = () => ElMessage.success("演示：提交成功");
</script>

<template>
  <div style="padding: 16px; background: var(--el-fill-color-light)">
    <PageCard header="客户信息">
      <el-descriptions border direction="vertical" :column="3">
        <el-descriptions-item label="客户名称">张三</el-descriptions-item>
        <el-descriptions-item label="联系电话">13888888888</el-descriptions-item>
        <el-descriptions-item label="联系地址">广东省深圳市南山区</el-descriptions-item>
        <el-descriptions-item label="客户等级">一级</el-descriptions-item>
        <el-descriptions-item label="客户来源">广告</el-descriptions-item>
        <el-descriptions-item label="客户状态">
          <el-tag type="success">正常</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">VIP 客户，优先处理</el-descriptions-item>
      </el-descriptions>
    </PageCard>

    <PageCard header="物流信息" :style="cardGap">
      <el-descriptions border direction="vertical" :column="3">
        <el-descriptions-item label="物流公司">顺丰快递</el-descriptions-item>
        <el-descriptions-item label="物流单号">SF1234567890</el-descriptions-item>
        <el-descriptions-item label="发货时间">2024-06-01 12:00:00</el-descriptions-item>
        <el-descriptions-item label="预计到货">2024-06-02 18:00:00</el-descriptions-item>
        <el-descriptions-item label="实际到货">2024-06-02 16:30:00</el-descriptions-item>
        <el-descriptions-item label="收货人">李四</el-descriptions-item>
        <el-descriptions-item label="收货地址" :span="2">广东省深圳市南山区科技园</el-descriptions-item>
        <el-descriptions-item label="收货电话">13999999999</el-descriptions-item>
        <el-descriptions-item label="收货图片" :span="2">
          <ImageGallery :data="receiptImages" />
        </el-descriptions-item>
      </el-descriptions>
    </PageCard>

    <PageCard :style="cardGap">
      <template #header>
        <div
          style="display: flex; align-items: center; justify-content: space-between; width: 100%"
        >
          <span>付款信息</span>
          <el-space>
            <el-button type="primary" @click="onRemind">催一下</el-button>
            <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-space>
        </div>
      </template>
      <el-descriptions border direction="vertical" :column="3">
        <el-descriptions-item label="付款方式">微信支付</el-descriptions-item>
        <el-descriptions-item label="付款金额">¥ 1,288.00</el-descriptions-item>
        <el-descriptions-item label="付款时间">2024-06-01 11:30:00</el-descriptions-item>
        <el-descriptions-item label="付款状态">
          <el-tag type="success">已付款</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="付款人">张三</el-descriptions-item>
        <el-descriptions-item label="收款人">平台商户</el-descriptions-item>
        <el-descriptions-item label="备注" :span="3">无</el-descriptions-item>
      </el-descriptions>
    </PageCard>

    <PageCard header="商品信息" :style="cardGap">
      <el-table :data="products" border>
        <el-table-column prop="name" label="商品名称" min-width="120" />
        <el-table-column prop="price" label="单价" width="100">
          <template #default="{ row }">¥ {{ row.price }}</template>
        </el-table-column>
        <el-table-column prop="num" label="数量" width="80" />
        <el-table-column label="图片" min-width="200">
          <template #default>
            <ImageGallery :data="productImages" :size="64" :gap="4" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '已发货' ? 'success' : 'warning'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" min-width="160" />
        <el-table-column prop="updateTime" label="更新时间" min-width="160" />
      </el-table>
    </PageCard>
  </div>
</template>
