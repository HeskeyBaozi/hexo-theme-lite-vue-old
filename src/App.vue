<template>
  <div id="app">
    <top-nav></top-nav>
    <header id="huge-background">
      <div class="container">
        <top-header :site="site"></top-header>
      </div>
    </header>
    <main id="scroll-background">
      <div class="container card-container">
        <router-view></router-view>
      </div>
    </main>
    <footer id="footer-background">
      <div class="container">
        <bottom-footer :site="site"></bottom-footer>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {State, namespace, Action} from 'vuex-class';
  import TopNav from '@/components/TopNav';
  import TopHeader from '@/components/TopHeader';
  import BottomFooter from '@/components/BottomFooter';
  import {Initialized_Global_App} from "@/store/modules/app";
  import {NavigationGuard, Route} from "vue-router";
  import {Site} from "@/interfaces/appClass";


  const ModuleState = namespace('app', State);
  const ModuleAction = namespace('app', Action);

  @Component({
    name: 'app',
    components: {
      TopNav, TopHeader, BottomFooter
    }
  })
  export default class App extends Vue {
    @ModuleState
    site: Site;

    @ModuleAction(Initialized_Global_App)
    initialize: () => Promise<any>;

    created() {
      this.initialize();
    }
  }
</script>

<style lang="less">
  @import "~@/my-theme/index.less";
  @import "~@/my-theme/mixins.less";

  body {
    .my-background;
  }

  #huge-background,
  #footer-background {
    // if you use .my-background here
  }
</style>
<style lang="less" scoped>
  #app {
    #huge-background {
      height: 38vh;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-end;
      align-items: center;
    }

    #footer-background {
      padding-bottom: 1em;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
    }

    #scroll-background {
      z-index: -100;
      // background-color: white; // for a nice background picture
    }

    .card-container {
      background-color: white;
      padding: 1em 2em;
      box-shadow: 0 0 5px gray;
      transition: box-shadow 300ms;
      &:hover {
        box-shadow: 0 0 8px gray;
      }
    }
  }
</style>
