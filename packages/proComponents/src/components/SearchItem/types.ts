import { type ExtractPropTypes, type PropType } from 'vue';

/** 响应式栅格列配置 */
export interface ColConfig {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export const searchItemProps = {
  /** 栅格列配置 */
  col: {
    type: Object as PropType<ColConfig>,
    default: (): ColConfig => ({ sm: 24, md: 12, lg: 8, xl: 6 }),
  },
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
