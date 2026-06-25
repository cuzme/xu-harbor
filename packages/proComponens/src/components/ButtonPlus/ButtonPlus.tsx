import { defineComponent, toRefs } from 'vue';
import { ElButton } from 'element-plus';
import { bttonPlusProps, type ButtonPlusProps } from './typing';
import { withInstall } from '@/utils/install';
import styles from './index.module.scss';

const ButtonPlus = defineComponent({
  name: 'ButtonPlus',
  props: bttonPlusProps,
  setup(props: ButtonPlusProps, { slots }) {
    const { type } = toRefs(props);
    return () => (
      <ElButton type={type.value}>
        <span class={styles.buttonPlusText}>{slots.default?.()}</span>
      </ElButton>
    );
  },
});

export default withInstall(ButtonPlus);
