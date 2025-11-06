import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
  html: {
    template: './src/index.html',
    inject: 'body',
    title: 'QR Scan',
    templateParameters: { title: 'QR Scan' },
    mountId: 'root',
  },
  plugins: [pluginVue()],
  server: {
    base: '/',
    printUrls: true,
    compress: false,
    cors: true,
    port: 5173,
    headers: { 'Service-Worker-Allowed': '/' },
  },
  output: {
    inlineScripts: true,
    injectStyles: true,
    target: 'web',
    filename: {
      font: '[name][ext]',
    },
  },
});
