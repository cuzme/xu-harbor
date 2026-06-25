import { defineComponent, toRefs } from 'vue';
import { ElButton } from 'element-plus';
import { bttonPlusProps, type ButtonPlusProps } from './typing';
import { withInstall } from '@/utils/install';
import styles from './index.module.scss';

const ButtonPlus = withInstall(
  defineComponent({
    name: 'ButtonPlus',
    props: bttonPlusProps,
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
