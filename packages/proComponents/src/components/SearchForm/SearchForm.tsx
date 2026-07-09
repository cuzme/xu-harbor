import { defineComponent, ref, reactive, computed, watch, onMounted, type VNode } from 'vue';
import { ElForm, ElRow, ElButton, type FormInstance } from 'element-plus';
import { Search, Refresh, ArrowUp, ArrowDown } from '@element-plus/icons-vue';
import { withInstall } from '@/utils/install';
import {
  searchFormProps,
  type SearchFormProps,
  type ColConfig,
  type SearchFormModel,
} from './types';
import { SearchItem } from '../SearchItem';
import styles from './style.module.scss';

const SearchForm = withInstall(
  defineComponent({
    name: 'SearchForm',
    inheritAttrs: false,
    props: searchFormProps,
    emits: ['search', 'reset', 'collapseChange'],
    setup(props: SearchFormProps, { slots, attrs, emit, expose }) {
      const formRef = ref<FormInstance>();
      const searchForm = reactive<SearchFormModel>({});
      const resetLoading = ref(false);
      const collapsed = ref<boolean>(props.defaultCollapsed);

      const setSearchForm = (key = '', value: unknown = undefined) => {
        searchForm[key] = value;
      };

      const setSearchForms = (models: SearchFormModel) => {
        Object.entries(models).forEach(([key, value]) => {
          searchForm[key] = value;
        });
      };

      const resetSearchForm = () => {
        if (props.resetAll) {
          Object.keys(searchForm).forEach((key) => {
            searchForm[key] = undefined;
          });
          return;
        }
        Object.keys(searchForm).forEach((key) => {
          searchForm[key] = props.initData[key] ?? undefined;
        });
      };

      const setCollapsed = (val: boolean) => {
        collapsed.value = val;
      };

      // 统计默认插槽内的 SearchItem 数量，用于自适应操作栏列宽
      const searchItemCount = computed(() => {
        const nodes =
          slots.default?.({
            form: searchForm,
            setForm: setSearchForm,
            collapsed: collapsed.value,
          }) || [];

        const collect = (list: VNode[]): number => {
          let count = 0;
          for (const node of list) {
            const type = node.type as { name?: string } | undefined;
            if (type?.name === 'SearchItem') {
              count += 1;
            } else if (Array.isArray(node.children)) {
              count += collect(node.children as VNode[]);
            }
          }
          return count;
        };

        return collect(nodes as VNode[]);
      });

      // 根据搜索项数量动态计算操作栏栅格列
      const dynamicCalcActionCol = computed<ColConfig>(() => {
        const count = searchItemCount.value;

        if (count <= 0) {
          return { sm: 24, md: 24, lg: 24, xl: 24 };
        }

        const targetCol: ColConfig = { sm: 24 };

        // 一行两个
        targetCol.md = count % 2 === 0 ? 24 : 12;

        // 一行三个
        const lgMap: Record<number, number> = { 0: 24, 1: 16, 2: 8 };
        targetCol.lg = lgMap[count % 3];

        // 一行四个
        const xlMap: Record<number, number> = { 0: 24, 1: 18, 2: 12, 3: 6 };
        targetCol.xl = xlMap[count % 4];

        return targetCol;
      });

      const onSearch = () => {
        emit('search', searchForm, formRef.value);
      };

      const executeResetAsync = async () => {
        if (!props.onResetAsync) return;
        resetLoading.value = true;
        try {
          await props.onResetAsync(searchForm, formRef.value);
        } catch (error) {
          console.error('onResetAsync error:', error);
        } finally {
          resetLoading.value = false;
        }
      };

      const onReset = async () => {
        resetSearchForm();

        if (props.resetBeforeSearch) {
          emit('reset', searchForm, formRef.value);
          await executeResetAsync();
        }

        onSearch();

        if (!props.resetBeforeSearch) {
          emit('reset', searchForm, formRef.value);
          await executeResetAsync();
        }
      };

      watch(
        collapsed,
        (val) => {
          emit('collapseChange', val);
        },
        { immediate: true },
      );

      watch(
        () => props.initData,
        (val) => {
          Object.entries(val).forEach(([key, value]) => {
            searchForm[key] = value;
          });
        },
        { immediate: true, deep: true },
      );

      onMounted(() => {
        if (!props.manual) onSearch();
      });

      expose({
        form: searchForm,
        setForm: setSearchForm,
        setForms: setSearchForms,
        resetForm: resetSearchForm,
        search: onSearch,
        setCollapsed,
      });

      return () => {
        const formClass = props.background
          ? `${styles.searchForm} ${styles.searchFormBg}`
          : styles.searchForm;
        const actionCol = props.actionCol(collapsed.value) || dynamicCalcActionCol.value;

        return (
          <ElForm ref={formRef} class={formClass} labelWidth="auto" model={searchForm} {...attrs}>
            <ElRow gutter={8} class={styles.searchFormRow}>
              {slots.default?.({
                form: searchForm,
                setForm: setSearchForm,
                collapsed: collapsed.value,
              })}
              <SearchItem col={actionCol}>
                <div class={styles.searchFormActions}>
                  {slots.optionLeft?.({ form: searchForm, setForm: setSearchForm })}
                  {props.showReset ? (
                    <ElButton onClick={onReset} icon={Refresh} plain loading={resetLoading.value}>
                      {props.resetText}
                    </ElButton>
                  ) : null}
                  <ElButton type="primary" onClick={onSearch} icon={Search}>
                    {props.searchText}
                  </ElButton>
                  {slots.optionRight?.({ form: searchForm, setForm: setSearchForm })}
                  {props.showCollapse ? (
                    <ElButton
                      type="primary"
                      link
                      icon={collapsed.value ? ArrowDown : ArrowUp}
                      onClick={() => setCollapsed(!collapsed.value)}
                    >
                      {collapsed.value ? '展开' : '收起'}
                    </ElButton>
                  ) : null}
                </div>
              </SearchItem>
            </ElRow>
          </ElForm>
        );
      };
    },
  }),
);

export { SearchForm };
