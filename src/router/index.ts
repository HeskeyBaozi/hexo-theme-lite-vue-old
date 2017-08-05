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
      component: () => import('@/pages/Home.vue') //(r: any) => require.ensure([], () => r(require('@/pages/Home.vue')), 'home')
    },
    {
      path: '/archives',
      name: 'Archives',
      component: () => import('@/pages/Archives.vue') // (r: any) => require.ensure([], () => r(require('@/pages/Archives.vue')), 'archives')
    }
  ]
});
