import {
  defineComponent,
  ref,
  unref,
  nextTick,
  onMounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  withDirectives,
} from 'vue';
import { ElTable, ElPagination, ElEmpty, vLoading } from 'element-plus';
import { cloneDeep, debounce } from 'lodash-es';
import { withInstall } from '@/utils/install';
import { tablePlusProps, type TablePlusProps, type TableRow } from './types';
import styles from './style.module.scss';

const TablePlus = withInstall(
  defineComponent({
    name: 'TablePlus',
    inheritAttrs: false,
    props: tablePlusProps,
    setup(props: TablePlusProps, { slots, attrs, expose }) {
      const elTableRef = ref();

      const defaultPageNum = 1;
      const defaultPageSizes = [10, 20, 50, 100];

      const queryParams = ref<Record<string, unknown>>({});
      const pageNum = ref<number>(defaultPageNum);
      const pageSize = ref<number>(props.defaultPageSize);
      const total = ref<number>(0);
      const loading = ref<boolean>(false);
      const list = ref<TableRow[]>([]);
      const displayList = ref<TableRow[]>([]);

      const sliceFront = (start: number, end: number) => {
        displayList.value = [...unref(list)].slice(start, end);
      };

      const getList = async (params?: Record<string, unknown>) => {
        loading.value = true;

        if (params) {
          pageNum.value = defaultPageNum;
          queryParams.value = cloneDeep(params);
        }

        try {
          const res = await props.request({
            pageNum: unref(pageNum),
            pageSize: unref(pageSize),
            params: unref(queryParams),
          });

          list.value = res?.list || [];
          total.value = res?.total ?? 0;

          // 前端分页：根据当前页码和每页条数截取数据
          if (props.pagination === 'front') {
            sliceFront((unref(pageNum) - 1) * unref(pageSize), unref(pageNum) * unref(pageSize));
          }
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false;
        }
      };

      const handleSizeChange = (curPageSize: number) => {
        pageSize.value = curPageSize;
        pageNum.value = defaultPageNum;
        if (props.pagination === 'back') {
          getList();
        } else {
          sliceFront(0, curPageSize);
        }
      };

      const handleCurrentChange = (curPageNum: number) => {
        pageNum.value = curPageNum;
        if (props.pagination === 'back') {
          getList();
        } else {
          sliceFront((curPageNum - 1) * unref(pageSize), curPageNum * unref(pageSize));
        }
      };

      const setAdaptive = async () => {
        await nextTick();
        const tableWrapper = elTableRef.value?.$refs?.tableWrapper as HTMLElement | undefined;
        if (tableWrapper) {
          const top = tableWrapper.getBoundingClientRect().top;
          tableWrapper.style.height = `${window.innerHeight - top - props.offsetBottom}px`;
        }
      };

      const setAdaptiveByDebounce = debounce(setAdaptive, 200);

      const bindResize = () => {
        setAdaptive();
        window.addEventListener('resize', setAdaptiveByDebounce);
      };

      const unbindResize = () => {
        window.removeEventListener('resize', setAdaptiveByDebounce);
      };

      onMounted(() => {
        if (props.adaptive) bindResize();
      });

      onBeforeUnmount(() => {
        if (props.adaptive) unbindResize();
      });

      onActivated(() => {
        if (props.adaptive) bindResize();
      });

      onDeactivated(() => {
        if (props.adaptive) unbindResize();
      });

      expose({
        elTableRef,
        query: getList,
        setAdaptive,
      });

      return () => {
        const table = withDirectives(
          <ElTable
            ref={elTableRef}
            data={props.pagination === 'back' ? list.value : displayList.value}
            border
            {...attrs}
          >
            {{
              default: () => slots.default?.(),
              empty: () => <ElEmpty />,
            }}
          </ElTable>,
          [[vLoading, loading.value]],
        );

        return (
          <>
            {slots.actionBar ? (
              <div class={styles.tablePlusActionBar}>{slots.actionBar()}</div>
            ) : null}
            {table}
            {!props.hidePagination ? (
              <ElPagination
                class={styles.tablePlusPagination}
                layout="total, sizes, prev, pager, next, jumper"
                {...props.paginationProps}
                currentPage={pageNum.value}
                pageSize={pageSize.value}
                pageSizes={defaultPageSizes}
                total={total.value}
                onSizeChange={handleSizeChange}
                onCurrentChange={handleCurrentChange}
              />
            ) : null}
          </>
        );
      };
    },
  }),
);

export { TablePlus };
