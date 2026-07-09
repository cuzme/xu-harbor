import { defineComponent } from 'vue';
import { ElCard } from 'element-plus';
import { withInstall } from '@/utils/install';
import styles from './style.module.scss';

const PageCard = withInstall(
  defineComponent({
    name: 'PageCard',
    inheritAttrs: false,
    setup(_, { slots, attrs }) {
      return () => (
        <ElCard class={styles.pageCard} shadow="never" {...attrs}>
          {slots}
        </ElCard>
      );
    },
  }),
);

export { PageCard };
