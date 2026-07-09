# Drawer 抽屉

对 `ElDrawer` 的封装，内置底部「取消/确定」按钮、`ok(hide)`/`cancel(hide)` 回调、`open/opened/close/closed` 生命周期，并配合 `useDrawer` 以「关闭即销毁、每次打开为全新状态」的方式管理抽屉内容。用法与 `Modal` 一致，仅将载体从对话框换成抽屉。

> `useDrawer()` 返回一个**控制器对象**，整体通过 `:drawer="drawer"` 传给 `Drawer` 即可，无需再手动接线 `visible`/`isDestroy`/`props`/`hide`/`destroy`。`Drawer` 会自行消费控制器状态，并用内部 `v-if` 完成内容的销毁重建。

## 基础用法

`useDrawer()` 得到 `drawer` 控制器，`drawer.show({ props, extra })` 打开抽屉：`props` 透传 `ElDrawer` 属性（如 `title`、`size`、`direction`），`extra` 为业务数据。在 `opened` 回调里用 `drawer.extra.value` 回填表单；`ok` 回调拿到 `hide` 用于校验通过后关闭。

<demo vue="drawer/basic.vue" title="基础用法" description="useDrawer 返回控制器，单个 :drawer 绑定即可，关闭后自动销毁重建。" />

## 多个抽屉

每次调用 `useDrawer()` 都会创建一个独立实例，一页需要多个抽屉时，声明多个控制器并各自绑定到对应的 `Drawer` 即可，彼此互不干扰。下例的详情抽屉还通过默认插槽作用域 `#default="{ extra }"` 直接读取 `show` 时传入的数据做只读展示。

<demo vue="drawer/multiple.vue" title="多个抽屉" description="两个独立 useDrawer 实例，编辑与详情抽屉互不影响。" />

## 封装抽屉组件

推荐把 `Drawer` + 表单 + 校验/提交逻辑整体收进一个抽屉子组件，父级用 `useDrawer()` 持有控制器并通过 `:drawer` 透传给子组件：父级只负责 `drawer.show({...})` 触发打开与传入 `extra`，其余（回填、校验、提交、提示）都在子组件内部完成。这样开合状态集中在父级，业务细节内聚在子组件。

<demo vue="drawer/component.vue" title="封装抽屉组件" description="父级 useDrawer 持有控制器并透传，子组件内聚 Drawer、表单与提交逻辑。" :vueFiles="['drawer/component.vue', 'drawer/UserEditForm.vue']" />

## Drawer Props

| 属性                | 类型                         | 默认值      | 说明                                                            |
| ------------------- | ---------------------------- | ----------- | --------------------------------------------------------------- |
| `drawer`            | `DrawerController`           | -           | `useDrawer()` 返回的控制器，传入后自动接管开合/销毁（推荐用法） |
| `okType`            | `ButtonProps['type']`        | `'primary'` | 确定按钮类型                                                    |
| `cancelType`        | `ButtonProps['type']`        | `'default'` | 取消按钮类型                                                    |
| `okLoading`         | `boolean`                    | `false`     | 确定按钮加载状态                                                |
| `cancelLoading`     | `boolean`                    | `false`     | 取消按钮加载状态                                                |
| `okText`            | `string`                     | `'确定'`    | 确定按钮文本                                                    |
| `cancelText`        | `string`                     | `'取消'`    | 取消按钮文本                                                    |
| `okButtonProps`     | `Partial<ButtonProps>`       | `{}`        | 确定按钮额外属性                                                |
| `cancelButtonProps` | `Partial<ButtonProps>`       | `{}`        | 取消按钮额外属性                                                |
| `footer`            | `boolean`                    | `true`      | 是否显示底部                                                    |
| `hideOk`            | `boolean`                    | `false`     | 是否隐藏确定按钮                                                |
| `hideCancel`        | `boolean`                    | `false`     | 是否隐藏取消按钮                                                |
| `ok`                | `(hide: () => void) => void` | -           | 确定回调，接收 `hide` 用于关闭抽屉                              |
| `cancel`            | `(hide: () => void) => void` | -           | 取消回调，接收 `hide` 用于关闭抽屉                              |
| `open`              | `() => void`                 | -           | 打开回调                                                        |
| `opened`            | `() => void`                 | -           | 打开动画结束回调                                                |
| `close`             | `() => void`                 | -           | 关闭回调                                                        |
| `closed`            | `() => void`                 | -           | 关闭动画结束回调                                                |

> 其余属性透传给 `ElDrawer`（如 `title`、`size`、`direction`、`model-value` 等）。

## Drawer 事件

> 仅在**不传 `drawer` 控制器**的手动接线模式下需要监听；传入 `:drawer` 后由控制器内部处理，无需手动接线。

| 事件      | 参数 | 说明                                                |
| --------- | ---- | --------------------------------------------------- |
| `hide`    | -    | 请求关闭抽屉（对应 `useDrawer` 的 `hide`）          |
| `destroy` | -    | 关闭动画结束后触发（对应 `useDrawer` 的 `destroy`） |

## Drawer 插槽

| 插槽      | 说明                                                                   |
| --------- | ---------------------------------------------------------------------- |
| `header`  | 自定义头部，作用域同 `ElDrawer`                                        |
| `default` | 抽屉主体内容；控制器模式下作用域为 `{ extra }`，即 `show` 时传入的数据 |
| `footer`  | 完全自定义底部（覆盖默认按钮）                                         |
| `prefix`  | 取消按钮左侧插入内容                                                   |
| `center`  | 取消与确定按钮之间插入内容                                             |
| `suffix`  | 确定按钮右侧插入内容                                                   |

## Drawer 暴露方法

| 名称   | 类型         | 说明             |
| ------ | ------------ | ---------------- |
| `hide` | `() => void` | 触发 `hide` 事件 |

## useDrawer 控制器对象

`useDrawer()` 返回类型为 `DrawerController` 的控制器对象，整体传给 `Drawer` 的 `drawer` prop 即可。

| 名称          | 类型                                                                    | 说明                                          |
| ------------- | ----------------------------------------------------------------------- | --------------------------------------------- |
| `visible`     | `Ref<boolean>`                                                          | 抽屉显示/隐藏                                 |
| `isDestroy`   | `Ref<boolean>`                                                          | 是否已销毁（内部配合 `v-if` 销毁重建）        |
| `drawerProps` | `Ref<CustomDrawerProps>`                                                | 透传给 `ElDrawer` 的属性（`show` 的 `props`） |
| `extra`       | `Ref<T \| undefined>`                                                   | 业务数据（`show` 的 `extra`）                 |
| `show`        | `(options?: { props?: CustomDrawerProps; extra?: T }) => Promise<void>` | 显示抽屉                                      |
| `hide`        | `() => void`                                                            | 隐藏抽屉（不销毁）                            |
| `destroy`     | `() => void`                                                            | 销毁抽屉（移除内容 DOM）                      |

> `useDrawer<T>()` 支持泛型约束 `extra` 类型，例如 `useDrawer<{ name: string }>()`。
