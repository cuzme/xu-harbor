# Modal 弹窗

对 `ElDialog` 的封装，内置底部「取消/确定」按钮、`ok(hide)`/`cancel(hide)` 回调、`open/opened/close/closed` 生命周期，并配合 `useModal` 以「关闭即销毁、每次打开为全新状态」的方式管理弹窗内容。

> `useModal()` 返回一个**控制器对象**，整体通过 `:modal="modal"` 传给 `Modal` 即可，无需再手动接线 `visible`/`isDestroy`/`props`/`hide`/`destroy`。`Modal` 会自行消费控制器状态，并用内部 `v-if` 完成内容的销毁重建。

## 基础用法

`useModal()` 得到 `modal` 控制器，`modal.show({ props, extra })` 打开弹窗：`props` 透传 `ElDialog` 属性（如 `title`、`width`），`extra` 为业务数据。在 `opened` 回调里用 `modal.extra.value` 回填表单；`ok` 回调拿到 `hide` 用于校验通过后关闭。

<demo vue="modal/basic.vue" title="基础用法" description="useModal 返回控制器，单个 :modal 绑定即可，关闭后自动销毁重建。" />

## 多个弹窗

每次调用 `useModal()` 都会创建一个独立实例，一页需要多个弹窗时，声明多个控制器并各自绑定到对应的 `Modal` 即可，彼此互不干扰。下例的详情弹窗还通过默认插槽作用域 `#default="{ extra }"` 直接读取 `show` 时传入的数据做只读展示。

<demo vue="modal/multiple.vue" title="多个弹窗" description="两个独立 useModal 实例，编辑与详情弹窗互不影响。" />

## 封装弹窗组件

推荐把 `Modal` + 表单 + 校验/提交逻辑整体收进一个弹窗子组件，父级用 `useModal()` 持有控制器并通过 `:modal` 透传给子组件：父级只负责 `modal.show({...})` 触发打开与传入 `extra`，其余（回填、校验、提交、提示）都在子组件内部完成。这样开合状态集中在父级，业务细节内聚在子组件。

<demo vue="modal/component.vue" title="封装弹窗组件" description="父级 useModal 持有控制器并透传，子组件内聚 Modal、表单与提交逻辑。" :vueFiles="['modal/component.vue', 'modal/UserEditForm.vue']" />

## Modal Props

| 属性                | 类型                         | 默认值      | 说明                                                           |
| ------------------- | ---------------------------- | ----------- | -------------------------------------------------------------- |
| `modal`             | `ModalController`            | -           | `useModal()` 返回的控制器，传入后自动接管开合/销毁（推荐用法） |
| `okType`            | `ButtonProps['type']`        | `'primary'` | 确定按钮类型                                                   |
| `cancelType`        | `ButtonProps['type']`        | `'default'` | 取消按钮类型                                                   |
| `okLoading`         | `boolean`                    | `false`     | 确定按钮加载状态                                               |
| `cancelLoading`     | `boolean`                    | `false`     | 取消按钮加载状态                                               |
| `okText`            | `string`                     | `'确定'`    | 确定按钮文本                                                   |
| `cancelText`        | `string`                     | `'取消'`    | 取消按钮文本                                                   |
| `okButtonProps`     | `Partial<ButtonProps>`       | `{}`        | 确定按钮额外属性                                               |
| `cancelButtonProps` | `Partial<ButtonProps>`       | `{}`        | 取消按钮额外属性                                               |
| `footer`            | `boolean`                    | `true`      | 是否显示底部                                                   |
| `hideOk`            | `boolean`                    | `false`     | 是否隐藏确定按钮                                               |
| `hideCancel`        | `boolean`                    | `false`     | 是否隐藏取消按钮                                               |
| `ok`                | `(hide: () => void) => void` | -           | 确定回调，接收 `hide` 用于关闭弹窗                             |
| `cancel`            | `(hide: () => void) => void` | -           | 取消回调，接收 `hide` 用于关闭弹窗                             |
| `open`              | `() => void`                 | -           | 打开回调                                                       |
| `opened`            | `() => void`                 | -           | 打开动画结束回调                                               |
| `close`             | `() => void`                 | -           | 关闭回调                                                       |
| `closed`            | `() => void`                 | -           | 关闭动画结束回调                                               |

> 其余属性透传给 `ElDialog`（如 `title`、`width`、`model-value` 等）。

## Modal 事件

> 仅在**不传 `modal` 控制器**的手动接线模式下需要监听；传入 `:modal` 后由控制器内部处理，无需手动接线。

| 事件      | 参数 | 说明                                               |
| --------- | ---- | -------------------------------------------------- |
| `hide`    | -    | 请求关闭弹窗（对应 `useModal` 的 `hide`）          |
| `destroy` | -    | 关闭动画结束后触发（对应 `useModal` 的 `destroy`） |

## Modal 插槽

| 插槽      | 说明                                                                   |
| --------- | ---------------------------------------------------------------------- |
| `header`  | 自定义头部，作用域同 `ElDialog`                                        |
| `default` | 弹窗主体内容；控制器模式下作用域为 `{ extra }`，即 `show` 时传入的数据 |
| `footer`  | 完全自定义底部（覆盖默认按钮）                                         |
| `prefix`  | 取消按钮左侧插入内容                                                   |
| `center`  | 取消与确定按钮之间插入内容                                             |
| `suffix`  | 确定按钮右侧插入内容                                                   |

## Modal 暴露方法

| 名称   | 类型         | 说明             |
| ------ | ------------ | ---------------- |
| `hide` | `() => void` | 触发 `hide` 事件 |

## useModal 控制器对象

`useModal()` 返回类型为 `ModalController` 的控制器对象，整体传给 `Modal` 的 `modal` prop 即可。

| 名称          | 类型                                                                    | 说明                                          |
| ------------- | ----------------------------------------------------------------------- | --------------------------------------------- |
| `visible`     | `Ref<boolean>`                                                          | 弹窗显示/隐藏                                 |
| `isDestroy`   | `Ref<boolean>`                                                          | 是否已销毁（内部配合 `v-if` 销毁重建）        |
| `dialogProps` | `Ref<CustomDialogProps>`                                                | 透传给 `ElDialog` 的属性（`show` 的 `props`） |
| `extra`       | `Ref<T \| undefined>`                                                   | 业务数据（`show` 的 `extra`）                 |
| `show`        | `(options?: { props?: CustomDialogProps; extra?: T }) => Promise<void>` | 显示弹窗                                      |
| `hide`        | `() => void`                                                            | 隐藏弹窗（不销毁）                            |
| `destroy`     | `() => void`                                                            | 销毁弹窗（移除内容 DOM）                      |

> `useModal<T>()` 支持泛型约束 `extra` 类型，例如 `useModal<{ name: string }>()`。
