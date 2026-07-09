# PageCard 页面卡片

对 `ElCard` 的薄封装，**主要用于统一每个页面的内容区块样式**——包括默认无阴影、无边框，以及一致的 header/body 内边距与标题字重。后台各页面（搜索区、表格区、表单区等）用同一套 PageCard 包裹，视觉与间距保持一致，避免各页自行写 `ElCard` 样式导致不统一。

组件本身无自有 props，全部属性与插槽透传给 `ElCard`。

## 基础用法

通过 `#header` 插槽设置标题，默认插槽放置主体内容。外层灰色区域模拟页面背景，便于看出 PageCard 在页面中的实际效果。

<demo vue="page-card/basic.vue" title="基础用法" description="统一页面内容区块样式：header 标题 + 默认内容，默认无阴影无边框。" />

## 典型页面组合

PageCard 常与 `SearchForm`、`TablePlus` 组合，构成后台常见的「搜索 + 表格」CRUD 页面：PageCard 统一外层样式，SearchForm 负责查询，`@search` 触发 TablePlus 的 `query` 刷新列表。

<demo vue="page-card/crud.vue" title="CRUD 页面" description="PageCard + SearchForm + TablePlus 组合的典型列表页。" />

## 详情页组合

详情页通常由多个 PageCard 纵向堆叠，每个卡片承载一块业务信息（基础信息、物流、付款、明细表格等）。header 插槽可放置标题与操作按钮，内容区配合 `el-descriptions`、`ImageGallery`、`el-table` 等展示只读数据。

<demo vue="page-card/detail.vue" title="详情页" description="多个 PageCard 堆叠的典型详情页：描述列表、图片墙、自定义 header、商品表格。" />

## PageCard Props

PageCard 无自有 props，常用透传属性如下：

| 属性         | 类型                             | 默认值    | 说明                   |
| ------------ | -------------------------------- | --------- | ---------------------- |
| `shadow`     | `'always' \| 'hover' \| 'never'` | `'never'` | 阴影显示时机，可被覆盖 |
| `body-style` | `CSSProperties`                  | -         | 自定义 body 样式       |
| `header`     | `string`                         | -         | 卡片标题（也可用插槽） |

> 其余 `ElCard` 属性均可透传。

## PageCard 插槽

| 插槽      | 说明         |
| --------- | ------------ |
| `header`  | 卡片头部内容 |
| `default` | 卡片主体内容 |
| `footer`  | 卡片底部内容 |
