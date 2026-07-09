import { type ExtractPropTypes, type PropType } from 'vue';
import type { FormInstance } from 'element-plus';
import type { ColConfig } from '../SearchItem/types';

export type { ColConfig };

/** 搜索表单数据 */
export type SearchFormModel = Record<string, unknown>;

/** 异步重置回调 */
export type ResetAsyncFn = (
  form: SearchFormModel,
  formRef: FormInstance | undefined,
) => Promise<void> | void;

export const searchFormProps = {
  /** 查询按钮文本 */
  searchText: {
    type: String,
    default: '查询',
  },
  /** 重置按钮文本 */
  resetText: {
    type: String,
    default: '重置',
  },
  /** 操作栏列配置，接收 collapsed 参数；返回 undefined 时使用内部自适应列 */
  actionCol: {
    type: Function as PropType<(collapsed: boolean) => ColConfig | undefined>,
    default: () => undefined,
  },
  /** 表单初始数据 */
  initData: {
    type: Object as PropType<SearchFormModel>,
    default: () => ({}),
  },
  /** 是否手动触发首次查询 */
  manual: {
    type: Boolean,
    default: false,
  },
  /** 重置时是否清空所有字段 */
  resetAll: {
    type: Boolean,
    default: true,
  },
  /** 是否显示折叠按钮 */
  showCollapse: {
    type: Boolean,
    default: false,
  },
  /** 默认是否折叠 */
  defaultCollapsed: {
    type: Boolean,
    default: true,
  },
  /** 是否显示重置按钮 */
  showReset: {
    type: Boolean,
    default: true,
  },
  /** 重置时是否先执行 reset 再执行 search */
  resetBeforeSearch: {
    type: Boolean,
    default: false,
  },
  /** 异步重置回调 */
  onResetAsync: {
    type: Function as PropType<ResetAsyncFn>,
    default: undefined,
  },
  /** 是否显示背景 */
  background: {
    type: Boolean,
    default: false,
  },
};

export type SearchFormProps = ExtractPropTypes<typeof searchFormProps>;

/** SearchForm 组件对外暴露的方法/引用 */
export interface SearchFormInstance {
  /** 当前搜索表单数据（响应式） */
  form: SearchFormModel;
  /** 设置单个字段 */
  setForm: (key?: string, value?: unknown) => void;
  /** 批量设置字段 */
  setForms: (models: SearchFormModel) => void;
  /** 重置表单 */
  resetForm: () => void;
  /** 触发查询 */
  search: () => void;
  /** 设置折叠状态 */
  setCollapsed: (val: boolean) => void;
}

/** SearchForm 默认插槽作用域 */
export interface SearchFormSlotScope {
  form: SearchFormModel;
  setForm: (key?: string, value?: unknown) => void;
  collapsed: boolean;
}

/** SearchForm 操作区插槽作用域 */
export interface SearchFormOptionSlotScope {
  form: SearchFormModel;
  setForm: (key?: string, value?: unknown) => void;
}
