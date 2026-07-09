import { defineComponent } from 'vue';
import { ElDrawer, ElButton } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';
import { withInstall } from '@/utils/install';
import { drawerProps, type DrawerProps, type HideFn } from './types';

const Drawer = withInstall(
  defineComponent({
    name: 'Drawer',
    inheritAttrs: false,
    props: drawerProps,
    emits: ['hide', 'destroy'],
    setup(props: DrawerProps, { slots, attrs, emit, expose }) {
      // 传入 drawer 控制器时由控制器接管开合/销毁，否则回退到 emit（手动接线模式）
      const requestHide: HideFn = () => (props.drawer ? props.drawer.hide() : emit('hide'));
      const requestDestroy = () => (props.drawer ? props.drawer.destroy() : emit('destroy'));

      const onOk = () => {
        if (props.ok) {
          props.ok(requestHide);
        } else {
          requestHide();
        }
      };

      const onCancel = () => {
        if (props.cancel) {
          props.cancel(requestHide);
        } else {
          requestHide();
        }
      };

      const onOpen = () => props.open?.();
      const onOpened = () => props.opened?.();

      const onClose = () => {
        requestHide();
        props.close?.();
      };

      const onClosed = () => {
        props.closed?.();
        requestDestroy();
      };

      expose({ hide: requestHide });

      const renderFooter = () => {
        if (slots.footer) return slots.footer();
        return (
          <>
            {slots.prefix?.()}
            {!props.hideCancel ? (
              <ElButton
                onClick={onCancel}
                type={props.cancelType}
                loading={props.cancelLoading}
                {...props.cancelButtonProps}
              >
                {props.cancelText}
              </ElButton>
            ) : null}
            {slots.center?.()}
            {!props.hideOk ? (
              <ElButton
                onClick={onOk}
                type={props.okType}
                loading={props.okLoading}
                loadingIcon={Loading}
                {...props.okButtonProps}
              >
                {props.okText}
              </ElButton>
            ) : null}
            {slots.suffix?.()}
          </>
        );
      };

      return () => {
        const controller = props.drawer;
        // 控制器模式：由控制器提供 visible/props，并用内部 v-if 让内容销毁重建
        const drawerModel = controller ? { modelValue: controller.visible.value } : {};
        const elDrawerProps = controller ? controller.drawerProps.value : {};
        const destroyed = controller ? controller.isDestroy.value : false;

        const renderDefault = () => {
          if (destroyed) return null;
          return controller
            ? slots.default?.({ extra: controller.extra.value })
            : slots.default?.();
        };

        return (
          <ElDrawer
            appendToBody
            closeOnPressEscape={false}
            {...elDrawerProps}
            {...attrs}
            {...drawerModel}
            onOpen={onOpen}
            onOpened={onOpened}
            onClose={onClose}
            onClosed={onClosed}
          >
            {{
              default: renderDefault,
              header: slots.header
                ? (scope: Record<string, unknown>) => slots.header?.(scope)
                : undefined,
              footer: props.footer ? renderFooter : undefined,
            }}
          </ElDrawer>
        );
      };
    },
  }),
);

export { Drawer };
