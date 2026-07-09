import { ref, type Ref } from 'vue';
import type { DialogProps } from 'element-plus';
import { sleep } from '@/utils';

/** extra 的默认类型，可通过泛型覆盖 */
export type DefaultExtra = Record<string, unknown>;

/** 弹窗属性 = Element Plus DialogProps（排除 openDelay / closeDelay） */
export type CustomDialogProps = Partial<Omit<DialogProps, 'openDelay' | 'closeDelay'>>;

/** show() 参数：props 透传 ElDialog，extra 为业务数据 */
export interface ShowModalOptions<T = DefaultExtra> {
  /** 透传给 ElDialog 的属性（如 title、width） */
  props?: CustomDialogProps;
  /** 传给弹窗内部的业务数据 */
  extra?: T;
}

/** useModal 返回的弹窗控制器，可整体通过 Modal 的 modal prop 传入 */
export interface ModalController<T = DefaultExtra> {
  /** 弹窗显示/隐藏 */
  visible: Ref<boolean>;
  /** 弹窗是否已销毁（配合内容 v-if 延迟渲染） */
  isDestroy: Ref<boolean>;
  /** 透传给 ElDialog 的属性，通过 show() 第一个参数传入 */
  dialogProps: Ref<CustomDialogProps>;
  /** 传给弹窗内部的业务数据，通过 show() 第二个参数传入 */
  extra: Ref<T | undefined>;
  /** 显示弹窗：{ props } 透传 ElDialog，{ extra } 为业务数据 */
  show: (options?: ShowModalOptions<T>) => Promise<void>;
  /** 隐藏弹窗（不销毁，保留 DOM） */
  hide: () => void;
  /** 销毁弹窗（移除内容 DOM） */
  destroy: () => void;
}

/**
 * 弹窗控制 composable，支持泛型约束 extra 类型
 * @example
 * // 默认用法
 * const modal = useModal();
 * // 指定 extra 类型
 * const modal = useModal<IEditExtra>();
 */
export function useModal<T = DefaultExtra>(): ModalController<T> {
  /** 弹窗显示/隐藏 */
  const visible = ref<boolean>(false);
  /** 弹窗是否已销毁（用于配合 v-if 延迟渲染） */
  const isDestroy = ref<boolean>(true);
  /** 透传给 ElDialog 的属性 */
  const dialogProps = ref<CustomDialogProps>({});
  /** 弹窗业务数据，ref 需要 as 断言绕过 UnwrapRef 泛型推断问题 */
  const extra = ref<T>() as Ref<T | undefined>;

  /** 显示弹窗，先取消销毁、设置属性，延迟 50ms 后打开（确保 DOM 已挂载） */
  const show = async (options: ShowModalOptions<T> = {}) => {
    isDestroy.value = false;
    dialogProps.value = options.props ?? {};
    extra.value = options.extra;
    await sleep(50);
    visible.value = true;
  };

  /** 隐藏弹窗（不销毁，保留 DOM） */
  const hide = () => (visible.value = false);
  /** 销毁弹窗（配合 v-if 移除 DOM） */
  const destroy = () => (isDestroy.value = true);

  return {
    visible,
    isDestroy,
    dialogProps,
    extra,
    show,
    hide,
    destroy,
  };
}
