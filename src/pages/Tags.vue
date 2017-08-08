<template>
  <div id="lite-tags">
    <section class="tags-list">
      <i-badge v-for="tag in tagsList" :key="tag.path" :count="tag.count">
        <i-tag type="border">{{tag.name}}</i-tag>
      </i-badge>

    </section>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {State, namespace, Action} from 'vuex-class';
  import {Initialize_Tags_Page} from "@/store/modules/tags";
  import {TagItem} from '@/interfaces';
  import ITag from 'iview-comp/tag';
  import IBadge from 'iview-comp/badge';


  const ModuleAction = namespace('tags', Action);
  const ModuleState = namespace('tags', State);

  @Component({
    name: 'tags',
    components: {
      ITag, IBadge
    }
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
