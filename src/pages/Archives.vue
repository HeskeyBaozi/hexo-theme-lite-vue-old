<template>
  <div class="lite-archives">
    archives
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {State, namespace, Action} from 'vuex-class';
  import {PostListItem} from "@/interfaces";
  import {Initialize_Archives_Page} from "@/store/modules/archives";

  const ArchivesState = namespace('archives', State);
  const ArchivesAction = namespace('archives', Action);

  @Component({
    name: 'archives'
  })
  export default class Archives extends Vue {
    @ArchivesState
    postsList: PostListItem[];

    @ArchivesAction(Initialize_Archives_Page)
    initialize: (payload: { pageNum: number }) => any;

    async created() {
      this.initialize({pageNum: 1});
    }
  }
</script>
