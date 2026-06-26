import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  clean: true,
  bundle: true,
  format: ['esm'],
  shims: true,
  minify: true,
  target: 'node18',
});
