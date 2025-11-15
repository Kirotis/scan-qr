import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginBasicSsl } from '@rsbuild/plugin-basic-ssl';
import { resolve } from 'path';

export default defineConfig({
  html: {
    template: './src/index.html',
    inject: 'body',
    title: 'QR Scan',
    templateParameters: { title: 'QR Scan' },
    mountId: 'root',
  },
  resolve: { alias: { '@': resolve(__dirname, './src') } },
  plugins: [pluginVue(), pluginBasicSsl()],
  server: {
    compress: false,
    cors: true,
    headers: { 'Service-Worker-Allowed': '/' },
  },
  output: {
    injectStyles: true,
    inlineScripts: true,
    filename: { font: '[name][ext]' },
  },
});
