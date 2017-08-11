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

  const ModuleAction = namespace('tags', Action);
  const ModuleState = namespace('tags', State);

  @Component({
    name: 'tags',
    components: {BoxList}
  })
  export default class Tags extends Vue {
    @ModuleState
    tagsList: TagItem[];


    @ModuleAction(Initialize_Tags_Page)
    initialize: () => Promise<any>;

    created() {
      console.log('tags created');
      this.initialize();
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
