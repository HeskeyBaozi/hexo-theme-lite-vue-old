import {createApp} from './main';
import Vue from 'vue';

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate(this: any, to, from, next) {
    const {asyncData} = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next();
    }
  }
});

const {app, router, store} = createApp();
declare const window: any;

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}


router.onReady(() => {

  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    });
    const asyncDataHooks = activated.map((c: any) => c.asyncData || c.options.asyncData).filter(_ => _);
    if (!asyncDataHooks.length) {
      return next();
    }

    try {
      await Promise.all(asyncDataHooks.map(hook => hook({store, route: to})));
      next();
    } catch (error) {
      next(error);
    }
  });
  app.$mount('#app');
});


