import Vue from 'vue';
import App from './App.vue';
import {createRouter} from '@/router';
import {createStore} from "@/store";
import Component from 'vue-class-component';

Component.registerHooks([
  'asyncData'
]);

export function createApp() {

  Vue.config.productionTip = false;

  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return {app, router, store};
}
