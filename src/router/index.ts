import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {

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
        component: () => import('@/pages/Home.vue'),
        meta: {
          requireGlobalInitialized: true,
          scrollTop: true
        }
      },
      {
        path: '/archives',
        name: 'Archives',
        component: () => import('@/pages/Archives.vue'),
        meta: {
          requireGlobalInitialized: true,
          scrollTop: true
        }
      },
      {
        path: '/categories',
        name: 'Categories',
        component: () => import('@/pages/Categories.vue'),
        meta: {
          requireGlobalInitialized: true,
          scrollTop: true
        },
        children: [
          {
            path: ':category_name',
            name: 'OneCategory',
            component: () => import('@/pages/CategoryItemList.vue')
          }
        ]
      },
      {
        path: '/tags',
        name: 'Tags',
        component: () => import('@/pages/Tags.vue'),
        meta: {
          requireGlobalInitialized: true,
          scrollTop: true
        },
        children: [
          {
            path: ':tag_name',
            name: 'OneTag',
            component: () => import('@/pages/TagItemList.vue')
          }
        ]
      },
      {
        path: '/articles/:slug',
        name: 'OneArticle',
        component: () => import('@/pages/Article.vue'),
        meta: {
          requireGlobalInitialized: true,
          scrollTop: true
        }
      }
    ]
  });

  router.beforeEach((to, from, next) => {
    /*
    const globalInitialized$: ReplaySubject<boolean> = router.app.$store.getters[`app/${Global_Initialized$}`];
    globalInitialized$
      .subscribe(isGlobalInitialized => {
        console.log(3);
        if (isGlobalInitialized) {
          console.log(4);
          if (to.matched.some(record => record.meta.scrollTop)) {
            console.log(5);
            window.scrollTo(0, 0);
          }
          console.log(6);
          next();
        } else {
          console.log(7);
          next(false);
        }
      });
      */

    if (to.matched.some(record => record.meta.scrollTop)) {
      window.scrollTo(0, 0);
      next();
    }

  });

  return router;
}
