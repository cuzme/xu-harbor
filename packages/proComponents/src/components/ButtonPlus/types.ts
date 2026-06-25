import { type ExtractPropTypes, type PropType } from 'vue';
import type { ButtonType } from 'element-plus';

export const buttonPlusProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'primary',
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default',
  },
};

export type ButtonPlusProps = ExtractPropTypes<typeof buttonPlusProps>;
