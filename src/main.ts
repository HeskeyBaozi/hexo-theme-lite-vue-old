import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

/**
 * use iView UI
 */
import './my-theme/index.less';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
