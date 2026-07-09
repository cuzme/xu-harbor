import { defineComponent, computed } from 'vue';
import { ElImage } from 'element-plus';
import { withInstall } from '@/utils/install';
import { imageGalleryProps, type ImageGalleryProps } from './types';
import styles from './style.module.scss';

const toCssSize = (value: number | string): string =>
  typeof value === 'number' ? `${value}px` : value;

const ImageGallery = withInstall(
  defineComponent({
    name: 'ImageGallery',
    inheritAttrs: false,
    props: imageGalleryProps,
    setup(props: ImageGalleryProps, { slots, attrs }) {
      const imgList = computed(() => (Array.isArray(props.data) ? props.data.filter(Boolean) : []));

      const imageSlots = computed(() => {
        const { empty: _empty, ...rest } = slots;
        return rest;
      });

      const renderEmpty = () => {
        if (slots.empty) return slots.empty();
        return <div class={styles.imageGalleryEmpty}>{props.emptyText}</div>;
      };

      return () => {
        if (imgList.value.length === 0) return renderEmpty();

        const thumbSize = toCssSize(props.size);
        // ElImage 类型未声明 referrerpolicy 等原生属性，通过透传对象带上，置于 attrs 前以便被覆盖
        const nativeAttrs = { referrerpolicy: 'no-referrer' } as Record<string, unknown>;
        return (
          <div class={styles.imageGallery} style={{ gap: toCssSize(props.gap) }}>
            {imgList.value.map((image, index) => (
              <ElImage
                key={index}
                class={styles.imageGalleryThumb}
                style={{ width: thumbSize, height: thumbSize }}
                src={image}
                fit="cover"
                initial-index={index}
                preview-src-list={imgList.value}
                preview-teleported
                show-progress
                {...nativeAttrs}
                {...attrs}
              >
                {imageSlots.value}
              </ElImage>
            ))}
          </div>
        );
      };
    },
  }),
);

export { ImageGallery };
