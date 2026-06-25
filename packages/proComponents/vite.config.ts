import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      entryRoot: 'src',
      outDirs: ['es', 'lib'],
      tsconfigPath: path.resolve(__dirname, 'tsconfig.build.json'),
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
    },
    minify: false,
    cssMinify: false,
    rollupOptions: {
      external: ['vue', 'element-plus', '@element-plus/icons-vue', '@vueuse/core'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          chunkFileNames: '[name].mjs',
          preserveModules: true,
          preserveModulesRoot: path.resolve(__dirname, 'src'),
          exports: 'named',
          dir: path.resolve(__dirname, 'es'),
          globals: {
            vue: 'Vue',
          },
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs',
          chunkFileNames: '[name].cjs',
          preserveModules: true,
          preserveModulesRoot: path.resolve(__dirname, 'src'),
          exports: 'named',
          dir: path.resolve(__dirname, 'lib'),
          globals: {
            vue: 'Vue',
          },
        },
      ],
    },
  },
});
