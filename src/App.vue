<template>
  <div id="app">
    <top-nav></top-nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {State, namespace, Action} from 'vuex-class';
  import TopNav from '@/components/TopNav.vue';
  import {Initialized_Global_App} from "@/store/modules/app";
  import {NavigationGuard, Route} from "vue-router";


  const ModuleState = namespace('app', State);
  const ModuleAction = namespace('app', Action);

  @Component({
    name: 'app',
    components: {
      TopNav
    }
  })
  export default class App extends Vue {
    @ModuleAction(Initialized_Global_App)
    initialize: () => Promise<any>;

    created() {
      console.log('app created');
      this.initialize();
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
