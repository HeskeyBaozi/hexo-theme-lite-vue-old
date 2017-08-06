import Vue from 'vue';
import Router from 'vue-router';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Global_Initialized$} from "@/store/modules/app";


Vue.use(Router);


const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: {name: 'Home'}
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/Home.vue')
    },
    {
      path: '/archives',
      name: 'Archives',
      component: () => import('@/pages/Archives.vue'),
      meta: {
        requireGlobalInitialized: true
      }
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('@/pages/Categories.vue'),
      meta: {
        requireGlobalInitialized: true
      }
    },
    {
      path: '/tags',
      name: 'Tags',
      component: () => import('@/pages/Tags.vue'),
      meta: {
        requireGlobalInitialized: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireGlobalInitialized)) {
    const globalInitialized$: ReplaySubject<boolean> = router.app.$store.getters[`app/${Global_Initialized$}`];
    globalInitialized$.subscribe(isGlobalInitialized => {
      if (isGlobalInitialized) {
        next();
      } else {
        next(false);
      }
    });
  } else {
    next();
  }

});


export default router;
