# ImageGallery 图片墙

对 `ElImage` 的封装，将一组图片地址渲染成缩略图墙，点击任意缩略图即可打开预览大图。自动过滤空值地址，支持自定义缩略图尺寸与间距，并提供空状态展示。

## 基础用法

传入 `data`（图片地址数组）即可，缩略图默认 96px，点击缩略图可预览全部图片。

<demo vue="image-gallery/basic.vue" title="基础用法" description="传入图片地址数组，点击缩略图打开预览。" />

## 自定义尺寸与空态

通过 `size` 调整缩略图尺寸、`gap` 调整间距（数字按 px 处理，也可传字符串如 `1rem`）。`data` 为空时展示空状态，可用 `empty` 插槽自定义。

<demo vue="image-gallery/custom.vue" title="自定义尺寸与空态" description="自定义 size/gap，并通过 empty 插槽自定义空状态。" />

## ImageGallery Props

| 属性        | 类型               | 默认值       | 说明                                    |
| ----------- | ------------------ | ------------ | --------------------------------------- |
| `data`      | `string[]`         | `[]`         | 图片地址列表，自动过滤空值              |
| `emptyText` | `string`           | `'暂无图片'` | 空状态文本（未使用 `empty` 插槽时生效） |
| `size`      | `number \| string` | `96`         | 缩略图尺寸，数字按 px 处理              |
| `gap`       | `number \| string` | `8`          | 缩略图间距，数字按 px 处理              |

> 其余属性透传给每个 `ElImage`（如 `fit`、`referrerpolicy`、`loading` 等），可覆盖默认值。

## ImageGallery 插槽

| 插槽     | 说明                                                           |
| -------- | -------------------------------------------------------------- |
| `empty`  | 自定义空状态内容（`data` 为空时展示）                          |
| 其余插槽 | 透传给每个 `ElImage`（如 `placeholder`、`error`、`viewer` 等） |
