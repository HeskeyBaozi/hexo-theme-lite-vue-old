<template>
  <div class="lite-archives">
    archives
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {State, namespace, Action} from 'vuex-class';
  import {PostListItem} from "@/interfaces";
  import {Initialize_Archives_Page} from "@/store/modules/archives";

  const ModuleState = namespace('archives', State);
  const ModuleAction = namespace('archives', Action);

  @Component({
    name: 'archives'
  })
  export default class Archives extends Vue {
    @ModuleState
    postsList: PostListItem[];

    @ModuleAction(Initialize_Archives_Page)
    initialize: (payload: { pageNum: number }) => Promise<any>;

    created() {
      console.log('Archives created');
      this.initialize({pageNum: 1});
    }
  }
</script>
