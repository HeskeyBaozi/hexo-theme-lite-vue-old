<template>
  <div id="app">
    <top-nav :theme="theme"></top-nav>

    <header id="huge-background">
      <div class="container">
        <top-header :site="site" :theme="theme"></top-header>
      </div>
    </header>

    <section id="scroll-background">
      <div class="container card-container">
        <transition name="fade" mode="in-out">
          <router-view></router-view>
        </transition>
        <div v-show="loading" class="loading">
          <i-spin size="large"></i-spin>
          <span>Loading</span>
        </div>
      </div>
    </section>

    <footer id="footer-background">
      <div class="container">
        <bottom-footer :site="site" :theme="theme"></bottom-footer>
      </div>
    </footer>

  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {State, namespace, Action, Getter} from 'vuex-class';
  import TopNav from '@/components/TopNav';
  import TopHeader from '@/components/TopHeader';
  import BottomFooter from '@/components/BottomFooter';
  import {Global_Loading, Initialized_Global_App} from "@/store/modules/app";
  import {NavigationGuard, Route} from "vue-router";
  import {Site, Theme} from "@/interfaces/appClass";
  import ISpin from 'iview-comp/spin/spin.vue';

  const ModuleState = namespace('app', State);
  const ModuleGetter = namespace('app', Getter);

  @Component({
    name: 'app',
    components: {
      TopNav, TopHeader, BottomFooter, ISpin
    }
  })
  export default class App extends Vue {
    @ModuleState
    site: Site;

    @ModuleState
    theme: Theme;

    @ModuleState
    globalInitialized: boolean;

    @ModuleGetter(Global_Loading)
    loading: boolean;

    mounted() {
      this.$watch('site.title', val => {
        document.title = val;
      });
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

  #scroll-background {
    .card-container {
      position: relative;

      .fade-enter-active, .fade-leave-active {
        background-color: white;
        transition: opacity, transform 500ms;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        padding: 1em 2em;
      }

      .fade-leave-active {
        z-index: -100;
      }

      .fade-leave {
        z-index: -100;
      }

      .fade-enter {
        opacity: 0;
        transform: translateY(-1em);
      }
    }
  }
</style>
<style lang="less" scoped>
  #app {
    #huge-background {
      padding-top: 100px;
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
      position: relative;
      background-color: white;
      padding: 1em 2em;
      box-shadow: 0 0 5px gray;
      transition: box-shadow, height 800ms;
      &:hover {
        box-shadow: 0 0 8px gray;
      }
    }

    .loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(255, 255, 255, 0.8);

      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      padding: 2em;
      > * {
        margin-bottom: 1em;
      }
    }
  }
</style>
