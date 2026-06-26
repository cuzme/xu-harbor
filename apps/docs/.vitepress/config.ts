import { defineConfig } from 'vitepress';
import vueJsx from '@vitejs/plugin-vue-jsx';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const proComponentsSrc = path.resolve(dirname, '../../../packages/proComponents/src');

export default defineConfig({
  title: 'xu-harbor',
  description: '基于 Element Plus 的 Vue 3 业务组件库文档',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/button-plus' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '快速开始', link: '/guide/getting-started' }],
        },
      ],
      '/components/': [
        {
          text: '组件',
          items: [{ text: 'ButtonPlus 按钮', link: '/components/button-plus' }],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/cuzme/xu-harbor' }],
  },
  vite: {
    // vueJsx 解析到的 vite 类型(vite@8,来自组件库 devDeps 提升)与 VitePress 内置的 vite@5 类型不一致,运行时无碍,此处放宽类型
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins: [vueJsx() as any],
    resolve: {
      alias: {
        '@yobiccc/pro-components': path.resolve(proComponentsSrc, 'index.ts'),
        '@': proComponentsSrc,
      },
    },
  },
});
