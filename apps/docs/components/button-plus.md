# ButtonPlus 按钮

在 `ElButton` 基础上封装的增强按钮，支持默认插槽自定义内容。

## 基础用法

<demo vue="button-plus/basic.vue" title="基础用法" description="通过 type 指定不同的按钮类型。" />

## 不同尺寸

<demo vue="button-plus/sizes.vue" title="不同尺寸" description="通过 size 控制按钮大小。" />

## Props

| 属性   | 类型                              | 默认值      | 说明                                   |
| ------ | --------------------------------- | ----------- | -------------------------------------- |
| `type` | `ButtonType`                      | `'primary'` | 按钮类型，与 `ElButton` 的 `type` 一致 |
| `size` | `'large' \| 'default' \| 'small'` | `'default'` | 按钮尺寸                               |

## 插槽

| 插槽      | 说明     |
| --------- | -------- |
| `default` | 按钮内容 |
