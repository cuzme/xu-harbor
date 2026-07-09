import { type ExtractPropTypes } from 'vue';

/** 响应式栅格列配置 */
export interface ColConfig {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export const searchItemProps = {
  /** 是否必填（显示红色星号） */
  required: {
    type: Boolean,
    default: false,
  },
  /** 标签文本 */
  label: {
    type: String,
    default: '',
  },
  /** 标签是否显示 tooltip */
  labelTooltip: {
    type: Boolean,
    default: false,
  },
  /** 提示内容 */
  tooltip: {
    type: String,
    default: '',
  },
};

export type SearchItemProps = ExtractPropTypes<typeof searchItemProps>;
