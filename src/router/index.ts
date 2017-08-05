import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
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
      component: () => import('@/pages/Archives.vue')
    },
    {
      path: '/categories',
      name: 'Categories',
      component: () => import('@/pages/Categories.vue')
    },
    {
      path: '/tags',
      name: 'Tags',
      component: () => import('@/pages/Tags.vue')
    }
  ]
});
