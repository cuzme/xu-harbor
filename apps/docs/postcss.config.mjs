import { postcssIsolateStyles } from "vitepress";

// vitepress-demo-plugin 会给 demo 容器加上 vp-raw，配合官方隔离插件将
// VitePress 的 vp-doc/base 排版样式挡在 demo 之外，避免其污染 Element Plus 组件
export default {
  plugins: [
    postcssIsolateStyles({
      includeFiles: [/vp-doc\.css/, /base\.css/],
    }),
  ],
};
