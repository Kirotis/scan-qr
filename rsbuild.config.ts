import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
  html: { template: './src/index.html' },
  plugins: [pluginVue()],
});
