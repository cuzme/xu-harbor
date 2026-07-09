import DefaultTheme from 'vitepress/theme';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import ProComponents from '@yobiccc/pro-components';
import type { Theme } from 'vitepress';
import 'element-plus/dist/index.css';
import './custom.css';

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus, { locale: zhCn });
    app.use(ProComponents);
  },
};

export default theme;
