import { defineComponent } from 'vue';
import { ElCol, ElFormItem, ElTooltip, ElIcon } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue';
import { withInstall } from '@/utils/install';
import { searchItemProps, type SearchItemProps } from './types';
import styles from './style.module.scss';

const SearchItem = withInstall(
  defineComponent({
    name: 'SearchItem',
    inheritAttrs: false,
    props: searchItemProps,
    setup(props: SearchItemProps, { slots, attrs }) {
      const renderLabel = () => (
        <div
          class={styles.searchItemLabel}
          style={{ textAlign: 'inherit', justifyContent: 'inherit' }}
        >
          {props.required ? <span class={styles.searchItemRequired}>*</span> : null}
          {props.labelTooltip ? (
            <ElTooltip
              effect="dark"
              content={props.label}
              placement="top"
              showAfter={200}
              hideAfter={0}
              popperClass={styles.searchItemTooltip}
            >
              <span class={styles.searchItemTruncatePointer}>{props.label}</span>
            </ElTooltip>
          ) : (
            <span class={styles.searchItemTruncate} title={props.label}>
              {props.label}
            </span>
          )}
          {props.tooltip ? (
            <ElTooltip
              effect="dark"
              content={props.tooltip}
              placement="top"
              showAfter={200}
              hideAfter={0}
              popperClass={styles.searchItemTooltip}
            >
              <ElIcon size={14} class={styles.searchItemHelp}>
                <QuestionFilled />
              </ElIcon>
            </ElTooltip>
          ) : null}
        </div>
      );

      return () => (
        <ElCol class={styles.searchItem} {...props.col}>
          <ElFormItem {...attrs}>
            {{
              ...slots,
              label: renderLabel,
            }}
          </ElFormItem>
        </ElCol>
      );
    },
  }),
);

export { SearchItem };
