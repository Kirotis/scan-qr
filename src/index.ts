import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

window.addEventListener(
  'load',
  () => {
    navigator.serviceWorker
      .register(new URL('./sw.js', import.meta.url), { scope: '/' })
      .then((registration) => {
        console.log('Service worker registration succeeded:', registration);
      });
  },
  { once: true },
);
createApp(App).mount('#root');
