<template>
  <footer id="lite-footer" class="blur">
    <section class="footer-description">
      <div class="contact-list">
        <a href="https://github.com/heskeybaozi" target="_blank">
          <i-icon type="social-github"></i-icon>
        </a>
        <a href="http://weibo.com/52hezhiyu/" target="_blank">
          <i-icon type="ionic"></i-icon>
        </a>
      </div>
      <p class="hexo-theme">Hexo Theme: Lite</p>
      <router-link :to="{name: 'Home'}" class="title">{{site.title}}</router-link>
      <p>{{site.subtitle}}</p>
    </section>
  </footer>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import IIcon from 'iview-comp/icon/icon.vue';
  import {Site} from "@/interfaces/appClass";

  @Component({
    name: 'bottom-footer',
    components: {IIcon}
  })
  export default class BottomFooter extends Vue {
    @Prop({
      required: true,
      type: Object
    })
    site: Site;
  }
</script>
<style lang="less" src="@/my-theme/mixins.less"></style>
<style lang="less" scoped>
  #lite-footer {
    padding: 2em;
    background-color: white;
    &:before {
      filter: blur(10px);
    }

    .footer-description {
      text-shadow: 0 0 5px white;
      text-align: center;

      .contact-list {
        font-size: 1.2em;
        > * {
          margin: 0 .2em;
        }
      }

      .hexo-theme {
        font-size: 0.8em;
      }

      .title {
        font-size: 1.5em;
      }
    }
  }
</style>
