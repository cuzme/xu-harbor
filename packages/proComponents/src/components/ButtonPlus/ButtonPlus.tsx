import { defineComponent, toRefs } from 'vue';
import { ElButton } from 'element-plus';
import { buttonPlusProps, type ButtonPlusProps } from './types';
import { withInstall } from '@/utils/install';
import styles from './button-plus.module.scss';

const ButtonPlus = withInstall(
  defineComponent({
    name: 'ButtonPlus',
    props: buttonPlusProps,
    setup(props: ButtonPlusProps, { slots }) {
      const { type, size } = toRefs(props);
      return () => (
        <ElButton type={type.value} size={size.value}>
          <span class={styles.buttonPlusText}>{slots.default?.()}</span>
        </ElButton>
      );
    },
  }),
);

export { ButtonPlus };
export default ButtonPlus;
