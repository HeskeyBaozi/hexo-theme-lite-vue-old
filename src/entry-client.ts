import {createApp} from './main';
import Vue from 'vue';
import {LoadingBar} from 'iview';

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  async beforeRouteUpdate(this: any, to, from, next) {
    const {asyncData} = this.$options;
    if (asyncData) {
      try {
        await asyncData({
          store: this.$store,
          route: to
        });
        next();
      } catch (error) {
        next(error);
      }
    } else {
      next();
    }
  }
});

const {app, router, store} = createApp();
declare const window: any;

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
  console.log('use state from the server');
} else {
  console.log('client reRender!');
}


router.onReady(async () => {

  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.

  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    });
    const asyncDataHooks = activated.map((c: any) => c.asyncData || c.options && c.options.asyncData).filter(_ => _);
    if (!asyncDataHooks.length) {
      return next();
    }

    try {
      LoadingBar.start();
      await Promise.all(asyncDataHooks.map(hook => hook({store, route: to})));
      LoadingBar.finish();

      if (to.matched.some(record => record.meta.scrollTop)) {
        window.scrollTo(0, 0);
      }
      next();
    } catch (error) {
      LoadingBar.error();
      next(error);
    }
  });

  // actually mount to DOM
  app.$mount('#app');


  // fetch initial state
  // If you use ServerSide Render,
  // You Don't Need to fetch the initial State in the client side:)
  const initMatched = router.getMatchedComponents(router.currentRoute);
  const asyncDataHooks = initMatched.map((c: any) => c.asyncData || c.options.asyncData).filter(_ => _);
  try {
    LoadingBar.start();
    await Promise.all(asyncDataHooks.map(hook => hook({store, route: router.currentRoute})));
    LoadingBar.finish();
  } catch (error) {
    LoadingBar.error();
  }

});


