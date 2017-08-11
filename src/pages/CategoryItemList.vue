<template>
  <div id="lite-item-list">
    <h1 class="lite-item-leading">
      <i-icon type="android-bookmark"></i-icon>
      {{name}}
    </h1>
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
  import IIcon from 'iview-comp/icon/icon.vue';

  const ModuleState = namespace('categories', State);
  const ModuleAction = namespace('categories', Action);
  const AppState = namespace('app', State);

  @Component({
    name: 'item-list',
    components: {ArticleCard, IIcon}
  })
  export default class ItemList extends Vue {
    @AppState
    dateTimeFormat: DateTimeFormat;

    @ModuleState
    relatedPosts: PostListItem[];

    @ModuleAction(Initialize_Related_Posts)
    initialize: (payload: { category_name: string }) => Promise<any>;

    get name() {
      return this.$route.params['category_name'];
    }

    created() {
      this.initialize({
        category_name: this.name
      });
    }
  }
</script>

<style lang="less" scoped>
  #lite-item-list {
    .lite-item-leading {
      color: #8e8e8e;
      text-align: center;
      font-size: 1.2em;
      margin-top: 1.3em;
    }
  }
</style>
