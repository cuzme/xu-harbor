import type { Plugin } from 'vue';
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
    // 在 app 根注入全局配置：中文语言、默认尺寸 small、消息 plain 样式。
    // 相比在 Layout 里包 ElConfigProvider，应用级配置在生产构建（SSG）下也能
    // 稳定覆盖所有 Element Plus 组件（含 demo 与命令式 ElMessage），dev/prod 一致。
    app.use(ElementPlus, { locale: zhCn, size: 'small', message: { plain: true } });
    app.use(ProComponents as Plugin);
  },
};

export default theme;
