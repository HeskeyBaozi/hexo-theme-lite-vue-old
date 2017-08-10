<template>
  <footer id="lite-footer" class="blur">
    <p>Hexo Theme: Lite</p>
  </footer>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Site} from "@/interfaces/appClass";

  @Component({
    name: 'bottom-footer'
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
      filter: blur(6px);
    }
  }
</style>
