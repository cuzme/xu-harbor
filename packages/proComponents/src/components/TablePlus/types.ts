import { type ExtractPropTypes, type PropType } from 'vue';
import type { PaginationProps } from 'element-plus';

/** 默认行数据类型 */
export type TableRow = Record<string, unknown>;

/** 表格请求参数 */
export interface RequestParams {
  /** 当前页码 */
  pageNum: number;
  /** 每页条数 */
  pageSize: number;
  /** 查询参数 */
  params: Record<string, unknown>;
}

/** 表格请求响应 */
export interface RequestResponse<T = TableRow> {
  /** 列表数据 */
  list: T[];
  /** 总条数 */
  total: number;
}

/** 表格请求方法（同步/异步均可，允许无返回） */
export type RequestFn<T = TableRow> = (
  params: RequestParams,
) => Promise<RequestResponse<T> | undefined> | RequestResponse<T> | undefined;

export const tablePlusProps = {
  /** 请求方法 */
  request: {
    type: Function as PropType<RequestFn>,
    default: (): RequestResponse => ({ list: [], total: 0 }),
  },
  /** 是否隐藏分页 */
  hidePagination: {
    type: Boolean,
    default: false,
  },
  /** 分页方式：back 后端分页，front 前端分页 */
  pagination: {
    type: String as PropType<'back' | 'front'>,
    default: 'back',
  },
  /** 分页组件配置 */
  paginationProps: {
    type: Object as PropType<Partial<PaginationProps>>,
    default: () => ({}),
  },
  /** 表格高度自适应 */
  adaptive: {
    type: Boolean,
    default: false,
  },
  /** 表格距离底部的偏移量 */
  offsetBottom: {
    type: Number,
    default: 68,
  },
  /** 默认每页条数 */
  defaultPageSize: {
    type: Number,
    default: 10,
  },
};

export type TablePlusProps = ExtractPropTypes<typeof tablePlusProps>;

/** TablePlus 组件对外暴露的方法/引用 */
export interface TablePlusInstance<T = TableRow> {
  /** el-table 实例引用 */
  elTableRef: unknown;
  /** 触发查询（传入 params 会重置到第一页） */
  query: (params?: Record<string, unknown>) => Promise<void>;
  /** 手动触发高度自适应 */
  setAdaptive: () => Promise<void>;
  /** 供泛型推断占位，避免未使用告警 */
  __row?: T;
}
