<template>
  <footer id="lite-footer" class="blur">
    <section class="footer-description">
      <div class="contact-list">
        <a v-for="item in items" :key="item.name" :href="item.url" target="_blank">
          <i-icon v-if="theme.social_icons.enable" :type="item.icon"></i-icon>
          <span v-else>{{item.name}}</span>
        </a>
      </div>
      <p v-if="theme.powered_by" class="hexo-theme">{{theme.powered_by}}</p>
      <router-link :to="{name: 'Home'}" class="title">{{site.title}}</router-link>
      <p>{{site.subtitle}}</p>
    </section>
  </footer>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import IIcon from 'iview-comp/icon/icon.vue';
  import {Site, Theme} from "@/interfaces/appClass";

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

    @Prop({
      required: true,
      type: Object
    })
    theme: Theme;

    get items() {
      const result: { name: string, url: string, icon: string }[] = [];
      const routes = this.theme.social;
      const icons = this.theme.social_icons;
      for (let key in routes) {
        result.push({
          name: key,
          url: routes[key],
          icon: icons[key]
        });
      }
      return result;
    }
  }
</script>
<style lang="less" src="@/my-theme/mixins.less"></style>
<style lang="less" scoped>
  #lite-footer {
    padding: 2em;
    background-color: white;
    color: white;
    text-shadow: 1px 1px 8px #444;

    .footer-description {
      a {
        color: white;
        text-shadow: 1px 1px 8px #444;
      }
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
