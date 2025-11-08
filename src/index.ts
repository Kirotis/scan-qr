import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { router } from './pages';

if (!import.meta.env.DEV) {
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
}

const app = createApp(App);
app.use(router);
app.mount('#root');
