import { defineConfig } from "vitepress";
import { vitepressDemoPlugin } from "vitepress-demo-plugin";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const proComponentsSrc = path.resolve(
  dirname,
  "../../../packages/proComponents/src",
);

export default defineConfig({
  title: "xu-harbor",
  description: "基于 Element Plus 的 Vue 3 业务组件库文档",
  lang: "zh-CN",
  base: "/xu-harbor/",
  themeConfig: {
    nav: [
      { text: "指南", link: "/guide/getting-started" },
      { text: "组件", link: "/components/button-plus" },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "指南",
          items: [{ text: "快速开始", link: "/guide/getting-started" }],
        },
      ],
      "/components/": [
        {
          text: "组件",
          items: [
            { text: "ButtonPlus 按钮", link: "/components/button-plus" },
            { text: "TablePlus 表格", link: "/components/table-plus" },
            { text: "SearchForm 搜索表单", link: "/components/search-form" },
            { text: "Modal 弹窗", link: "/components/modal" },
            { text: "Drawer 抽屉", link: "/components/drawer" },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/cuzme/xu-harbor" },
    ],
    // 默认主题 UI 文案中文化
    outline: { label: "本页目录" },
    docFooter: { prev: "上一页", next: "下一页" },
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    langMenuLabel: "切换语言",
    lastUpdatedText: "最后更新",
  },
  markdown: {
    config(md) {
      md.use(vitepressDemoPlugin, {
        demoDir: path.resolve(dirname, "../demos"),
        locale: {
          "zh-CN": "zh-CN",
        },
      });
    },
  },
  vite: {
    // vueJsx 解析到的 vite 类型(vite@8,来自组件库 devDeps 提升)与 VitePress 内置的 vite@5 类型不一致,运行时无碍,此处放宽类型
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    plugins: [vueJsx() as any],
    // 文档站直接引用组件库源码，需与组件库 vite 一致启用 CSS Modules 驼峰键，
    // 否则 styles.xxx 取值为 undefined，组件样式在文档中不生效
    css: {
      modules: {
        localsConvention: "camelCase",
      },
    },
    resolve: {
      alias: {
        "@yobiccc/pro-components": path.resolve(proComponentsSrc, "index.ts"),
        "@": proComponentsSrc,
      },
    },
  },
});
