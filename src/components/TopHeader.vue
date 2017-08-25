<template>
  <div id="lite-avatar-info" class="blur">
    <div class="avatar-info basic-container">
      <img class="avatar shadow" v-if="theme.avatar.enable" :src="theme.avatar.url" alt="avatar">
      <div class="head-description">
        <p class="author-name">{{site.author}}</p>
        <p class="description">{{site.description}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Site, Theme} from "@/interfaces/appClass";

  @Component({
    name: 'top-header'
  })
  export default class TopHeader extends Vue {
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
  }
</script>

<style lang="less" src="@/my-theme/mixins.less"></style>
<style lang="less" scoped>
  #lite-avatar-info {
    padding: 1em;
    background-color: white;
    color: white;
    text-shadow: 1px 1px 8px #444;

    .head-description {
      .author-name {
        font-size: 1.2em;
      }

      .description {
        font-size: 0.9em;
      }
    }
  }

  .basic-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    text-align: center;
    justify-content: center;
    height: 100%;
    > * {
      margin-bottom: .3em;
    }
  }

  .avatar-info {
    .avatar {
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      transition: all 600ms;
    }

    .shadow {
      box-shadow: 1px 1px 3px white;
    }
  }
</style>
