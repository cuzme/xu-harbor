import DefaultTheme from 'vitepress/theme';
import ElementPlus from 'element-plus';
import ProComponents from '@yobiccc/pro-components';
import type { Theme } from 'vitepress';
import 'element-plus/dist/index.css';

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus);
    app.use(ProComponents);
  },
};

export default theme;
