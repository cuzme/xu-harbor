# ButtonPlus 按钮

在 `ElButton` 基础上封装的增强按钮，支持默认插槽自定义内容。

## 基础用法

<ClientOnly>
  <div class="demo-row">
    <ButtonPlus>默认按钮</ButtonPlus>
    <ButtonPlus type="primary">主要按钮</ButtonPlus>
    <ButtonPlus type="success">成功按钮</ButtonPlus>
    <ButtonPlus type="warning">警告按钮</ButtonPlus>
    <ButtonPlus type="danger">危险按钮</ButtonPlus>
  </div>
</ClientOnly>

```vue
<template>
  <ButtonPlus>默认按钮</ButtonPlus>
  <ButtonPlus type="primary">主要按钮</ButtonPlus>
  <ButtonPlus type="success">成功按钮</ButtonPlus>
  <ButtonPlus type="warning">警告按钮</ButtonPlus>
  <ButtonPlus type="danger">危险按钮</ButtonPlus>
</template>
```

## 不同尺寸

<ClientOnly>
  <div class="demo-row">
    <ButtonPlus type="primary" size="large">大号</ButtonPlus>
    <ButtonPlus type="primary" size="default">默认</ButtonPlus>
    <ButtonPlus type="primary" size="small">小号</ButtonPlus>
  </div>
</ClientOnly>

```vue
<template>
  <ButtonPlus type="primary" size="large">大号</ButtonPlus>
  <ButtonPlus type="primary" size="default">默认</ButtonPlus>
  <ButtonPlus type="primary" size="small">小号</ButtonPlus>
</template>
```

## Props

| 属性   | 类型                              | 默认值      | 说明                                   |
| ------ | --------------------------------- | ----------- | -------------------------------------- |
| `type` | `ButtonType`                      | `'primary'` | 按钮类型，与 `ElButton` 的 `type` 一致 |
| `size` | `'large' \| 'default' \| 'small'` | `'default'` | 按钮尺寸                               |

## 插槽

| 插槽      | 说明     |
| --------- | -------- |
| `default` | 按钮内容 |

<style>
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  padding: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;
}
</style>
