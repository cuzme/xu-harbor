import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import ElementPlus, { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import ProComponents from '@yobiccc/pro-components';
import type { Theme } from 'vitepress';
import 'element-plus/dist/index.css';
import './custom.css';

const theme: Theme = {
  extends: DefaultTheme,
  // 在最外层包一个 ElConfigProvider，统一将文档站内所有 Element Plus 组件
  // 设为中文语言、默认尺寸 small（对页面与 demo 一并生效）
  Layout: () =>
    h(ElConfigProvider, { locale: zhCn, size: 'small' }, () => h(DefaultTheme.Layout)),
  enhanceApp({ app }) {
    app.use(ElementPlus);
    app.use(ProComponents);
  },
};

export default theme;
