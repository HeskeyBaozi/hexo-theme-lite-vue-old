<template>
  <div id="lite-item-list">
    <article-card v-for="post in relatedPosts"
                  :key="post.slug"
                  :post="post"
                  :dateFormat="dateTimeFormat.date_format"></article-card>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {PostListItem} from "@/interfaces/index";
  import {namespace, State, Action} from 'vuex-class';
  import {Initialize_Related_Posts} from "@/store/modules/categories";
  import ArticleCard from '@/components/ArticleCard';
  import {DateTimeFormat} from "@/interfaces/appClass";

  const ModuleState = namespace('categories', State);
  const ModuleAction = namespace('categories', Action);
  const AppState = namespace('app', State);

  @Component({
    name: 'item-list',
    components: {ArticleCard}
  })
  export default class ItemList extends Vue {
    @AppState
    dateTimeFormat: DateTimeFormat;

    @ModuleState
    relatedPosts: PostListItem[];

    @ModuleAction(Initialize_Related_Posts)
    initialize: (payload: { category_name: string }) => Promise<any>;


    created() {
      this.initialize({
        category_name: this.$route.params['category_name']
      });
    }
  }
</script>
