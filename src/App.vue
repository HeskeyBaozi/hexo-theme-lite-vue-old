<template>
  <div id="app">
    <top-nav></top-nav>
    <section id="lite-avatar-info" class="shadow">
      <img class="avatar shadow" src="./assets/6828af33.jpg" alt="avatar">
    </section>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {State, namespace, Action} from 'vuex-class';
  import TopNav from '@/components/TopNav';
  import {Initialized_Global_App} from "@/store/modules/app";
  import {NavigationGuard, Route} from "vue-router";

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
<style lang="less" src="@/my-theme/index.less"></style>
<style lang="less" scoped>

  #app {
    #lite-avatar-info {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      height: 30vh;
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

    #main-avatar {
      margin-top: 80px;
      background-color: white;
      padding-left: 0;
      padding-right: 0;
    }

    #main-body {
      background-color: white;
    }
  }
</style>
