import { defineComponent } from 'vue';
import { ElDialog, ElButton } from 'element-plus';
import { Loading } from '@element-plus/icons-vue';
import { withInstall } from '@/utils/install';
import { modalProps, type ModalProps, type HideFn } from './types';

const Modal = withInstall(
  defineComponent({
    name: 'Modal',
    inheritAttrs: false,
    props: modalProps,
    emits: ['hide', 'destroy'],
    setup(props: ModalProps, { slots, attrs, emit, expose }) {
      // 传入 modal 控制器时由控制器接管开合/销毁，否则回退到 emit（手动接线模式）
      const requestHide: HideFn = () => (props.modal ? props.modal.hide() : emit('hide'));
      const requestDestroy = () => (props.modal ? props.modal.destroy() : emit('destroy'));

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
        const controller = props.modal;
        // 控制器模式：由控制器提供 visible/props，并用内部 v-if 让内容销毁重建
        const dialogModel = controller ? { modelValue: controller.visible.value } : {};
        const dialogProps = controller ? controller.dialogProps.value : {};
        const destroyed = controller ? controller.isDestroy.value : false;

        const renderDefault = () => {
          if (destroyed) return null;
          return controller
            ? slots.default?.({ extra: controller.extra.value })
            : slots.default?.();
        };

        return (
          <ElDialog
            appendToBody
            closeOnClickModal={false}
            closeOnPressEscape={false}
            {...dialogProps}
            {...attrs}
            {...dialogModel}
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
          </ElDialog>
        );
      };
    },
  }),
);

export { Modal };
