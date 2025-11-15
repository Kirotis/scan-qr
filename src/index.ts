import { createApp } from 'vue';
import App from './App.vue';
import './index.css';
import { router } from './pages';

if (!import.meta.env.DEV) {
  window.addEventListener(
    'load',
    async () => {
      const actualSwUrl = new URL('./sw.js', import.meta.url);

      const registrations = await navigator.serviceWorker.getRegistrations();
      const promises: Promise<unknown>[] = registrations
        .filter((swr) => {
          const sw = swr.active || swr.waiting || swr.installing;
          return sw && sw.scriptURL !== actualSwUrl.toString();
        })
        .map((swr) => swr.unregister());

      if (!promises.length && registrations.length) {
        return;
      }

      if (promises.length === registrations.length) {
        promises.push(
          navigator.serviceWorker.register(actualSwUrl, { scope: '/' }),
        );
      }

      await Promise.all(promises);
    },
    { once: true },
  );
}

const app = createApp(App);
app.use(router);
app.mount('#root');
