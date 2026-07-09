import { type ExtractPropTypes, type PropType } from 'vue';

export const imageGalleryProps = {
  /** 图片地址列表 */
  data: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /** 空状态文本 */
  emptyText: {
    type: String,
    default: '暂无图片',
  },
  /** 缩略图尺寸，数字按 px 处理 */
  size: {
    type: [Number, String] as PropType<number | string>,
    default: 96,
  },
  /** 缩略图间距，数字按 px 处理 */
  gap: {
    type: [Number, String] as PropType<number | string>,
    default: 8,
  },
};

export type ImageGalleryProps = ExtractPropTypes<typeof imageGalleryProps>;
