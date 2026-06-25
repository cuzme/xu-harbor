import { type ExtractPropTypes, type PropType } from 'vue';
import type { ButtonType } from 'element-plus';

export const bttonPlusProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'primary',
  },
};

export type ButtonPlusProps = ExtractPropTypes<typeof bttonPlusProps>;
