import { createWebHistory, createRouter } from 'vue-router';

import MainView from './Main.vue';
import HistoryView from './History.vue';
import BarcodeView from './Barcode.vue';
import ScanView from './Scan/Scan.vue';

const routes = [
  { name: 'Main', path: '/', component: MainView },
  { name: 'History', path: '/history', component: HistoryView },
  { name: 'Barcode', path: '/barcode/:date', component: BarcodeView },
  { name: 'Scan', path: '/scan', component: ScanView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
