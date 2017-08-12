<template>
  <div id="lite-tags">
    <h1 class="lite-tags-leading">Tags</h1>
    <box-list :boxes="tagsList"
              type="tags"></box-list>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {State, namespace, Action} from 'vuex-class';
  import BoxList from '@/components/BoxList';
  import {TagItem} from "@/interfaces/index";
  import {Initialize_Tags_Page} from "@/store/modules/tags";
  import {Initialized_Global_App} from "@/store/modules/app";

  const ModuleAction = namespace('tags', Action);
  const ModuleState = namespace('tags', State);

  @Component({
    name: 'tags',
    components: {BoxList}
  })
  export default class Tags extends Vue {
    @ModuleState
    tagsList: TagItem[];


    async asyncData({store, route}): Promise<void> {
      return store.dispatch(`tags/${Initialize_Tags_Page}`);
    }
  }
</script>

<style lang="less" scoped>
  #lite-tags {
    .lite-tags-leading {
      font-size: 1.5em;
      text-align: center;
    }
  }
</style>
