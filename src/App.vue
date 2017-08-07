<template>
  <div id="app">
    <top-nav></top-nav>
    <jumbotron height="500px">
      <section id="lite-avatar-info" class="container shadow" slot="avatar">
        <img class="avatar shadow" src="./assets/6828af33.jpg" alt="avatar">
      </section>
    </jumbotron>
    <main class="container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {State, namespace, Action} from 'vuex-class';
  import TopNav from '@/components/TopNav.vue';
  import Jumbotron from '@/components/Jumbotron.vue';
  import {Initialized_Global_App} from "@/store/modules/app";
  import {NavigationGuard, Route} from "vue-router";


  const ModuleState = namespace('app', State);
  const ModuleAction = namespace('app', Action);

  @Component({
    name: 'app',
    components: {
      TopNav,
      Jumbotron
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

<style lang="scss" src="bootstrap/scss/_normalize.scss"></style>
<style lang="scss" src="bootstrap/scss/bootstrap-grid.scss"></style>
<style lang="less" src="@/my-theme/index.less"></style>
<style lang="less" scoped>

  #app {

    #lite-avatar-info {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      height: 300px;
      background-color: rgba(255, 255, 255, 0.44);

      .avatar {
        display: block;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 0 auto;
      }

      .shadow {
        box-shadow: 1px 1px 10px gray;
      }
    }
  }
</style>
