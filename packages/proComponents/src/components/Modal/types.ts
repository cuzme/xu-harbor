import { type ExtractPropTypes, type PropType } from 'vue';
import type { ButtonProps } from 'element-plus';
import type { ModalController } from '@/composables/useModal';

/** 隐藏弹窗的回调 */
export type HideFn = () => void;

export const modalProps = {
  /** useModal() 返回的控制器；传入后由 Modal 自行消费开合/销毁状态（推荐用法） */
  modal: {
    type: Object as PropType<ModalController>,
    default: undefined,
  },
  /** 确定按钮类型 */
  okType: {
    type: String as PropType<ButtonProps['type']>,
    default: 'primary',
  },
  /** 取消按钮类型 */
  cancelType: {
    type: String as PropType<ButtonProps['type']>,
    default: 'default',
  },
  /** 确定按钮加载状态 */
  okLoading: {
    type: Boolean,
    default: false,
  },
  /** 取消按钮加载状态 */
  cancelLoading: {
    type: Boolean,
    default: false,
  },
  /** 确定按钮文本 */
  okText: {
    type: String,
    default: '确定',
  },
  /** 取消按钮文本 */
  cancelText: {
    type: String,
    default: '取消',
  },
  /** 确定按钮额外属性 */
  okButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => ({}),
  },
  /** 取消按钮额外属性 */
  cancelButtonProps: {
    type: Object as PropType<Partial<ButtonProps>>,
    default: () => ({}),
  },
  /** 是否显示底部 */
  footer: {
    type: Boolean,
    default: true,
  },
  /** 是否隐藏确定按钮 */
  hideOk: {
    type: Boolean,
    default: false,
  },
  /** 是否隐藏取消按钮 */
  hideCancel: {
    type: Boolean,
    default: false,
  },
  /** 确定回调，接收 hide 用于关闭弹窗 */
  ok: {
    type: Function as PropType<(hide: HideFn) => void>,
    default: undefined,
  },
  /** 取消回调，接收 hide 用于关闭弹窗 */
  cancel: {
    type: Function as PropType<(hide: HideFn) => void>,
    default: undefined,
  },
  /** 打开回调 */
  open: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
  /** 打开动画结束回调 */
  opened: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
  /** 关闭回调 */
  close: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
  /** 关闭动画结束回调 */
  closed: {
    type: Function as PropType<() => void>,
    default: undefined,
  },
};

export type ModalProps = ExtractPropTypes<typeof modalProps>;
