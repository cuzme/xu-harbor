import { ref, type Ref } from 'vue';
import type { DrawerProps } from 'element-plus';
import { sleep } from '@/utils';
import type { DefaultExtra } from './useModal';

/** 抽屉属性 = Element Plus DrawerProps（排除 openDelay / closeDelay） */
export type CustomDrawerProps = Partial<Omit<DrawerProps, 'openDelay' | 'closeDelay'>>;

/** showDrawer() 参数：props 透传 ElDrawer，extra 为业务数据 */
export interface ShowDrawerOptions<T = DefaultExtra> {
  /** 透传给 ElDrawer 的属性（如 title、size、direction） */
  props?: CustomDrawerProps;
  /** 传给抽屉内部的业务数据 */
  extra?: T;
}

/** useDrawer 返回的抽屉控制器，可整体通过 Drawer 的 drawer prop 传入 */
export interface DrawerController<T = DefaultExtra> {
  /** 抽屉显示/隐藏 */
  visible: Ref<boolean>;
  /** 抽屉是否已销毁（配合内容 v-if 延迟渲染） */
  isDestroy: Ref<boolean>;
  /** 透传给 ElDrawer 的属性，通过 show() 的 props 传入 */
  drawerProps: Ref<CustomDrawerProps>;
  /** 传给抽屉内部的业务数据，通过 show() 的 extra 传入 */
  extra: Ref<T | undefined>;
  /** 显示抽屉：{ props } 透传 ElDrawer，{ extra } 为业务数据 */
  show: (options?: ShowDrawerOptions<T>) => Promise<void>;
  /** 隐藏抽屉（不销毁，保留 DOM） */
  hide: () => void;
  /** 销毁抽屉（移除内容 DOM） */
  destroy: () => void;
}

/**
 * 抽屉控制 composable，支持泛型约束 extra 类型
 * @example
 * // 默认用法
 * const drawer = useDrawer();
 * // 指定 extra 类型
 * const drawer = useDrawer<IDetailExtra>();
 */
export function useDrawer<T = DefaultExtra>(): DrawerController<T> {
  /** 抽屉显示/隐藏 */
  const visible = ref<boolean>(false);
  /** 抽屉是否已销毁（用于配合 v-if 延迟渲染） */
  const isDestroy = ref<boolean>(true);
  /** 透传给 ElDrawer 的属性 */
  const drawerProps = ref<CustomDrawerProps>({});
  /** 抽屉业务数据，ref 需要 as 断言绕过 UnwrapRef 泛型推断问题 */
  const extra = ref<T>() as Ref<T | undefined>;

  /** 显示抽屉，先取消销毁、设置属性，延迟 50ms 后打开（确保 DOM 已挂载） */
  const show = async (options: ShowDrawerOptions<T> = {}) => {
    isDestroy.value = false;
    drawerProps.value = options.props ?? {};
    extra.value = options.extra;
    await sleep(50);
    visible.value = true;
  };

  /** 隐藏抽屉（不销毁，保留 DOM） */
  const hide = () => (visible.value = false);
  /** 销毁抽屉（配合 v-if 移除 DOM） */
  const destroy = () => (isDestroy.value = true);

  return {
    visible,
    isDestroy,
    drawerProps,
    extra,
    show,
    hide,
    destroy,
  };
}
