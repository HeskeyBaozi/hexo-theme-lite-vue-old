<template>
  <div id="lite-article">
    <article-card :post="article"
                  :dateFormat="dateTimeFormat.date_format"
                  :showExcerpt="false"
    ></article-card>
    <article-content :content="article.content"></article-content>
    <footer class="article-footer">
      <p>EOF</p>
    </footer>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {namespace, State, Action} from 'vuex-class';
  import {Article} from '@/interfaces';
  import {Initialize_Article_Page} from "@/store/modules/one-article";
  import ArticleContent from '@/components/ArticleContent';
  import ArticleCard from '@/components/ArticleCard';
  import {DateTimeFormat} from "@/interfaces/appClass";

  const ModuleState = namespace('article', State);
  const ModuleAction = namespace('article', Action);
  const AppState = namespace('app', State);

  @Component({
    name: 'article',
    components: {ArticleContent, ArticleCard}
  })
  export default class OneArticle extends Vue {
    @ModuleState
    article: Article;

    @AppState
    dateTimeFormat: DateTimeFormat;

    @ModuleAction(Initialize_Article_Page)
    initialize: (payload: { slug: string }) => Promise<any>;

    created() {
      /**
       * Subscribe the url
       */
      this.$watch('$route.params.slug', (newSlug: string, oldSlug: string) => {
        this.initialize({slug: newSlug});
      }, {
        immediate: true
      });
    }
  }
</script>

<style lang="less" scoped>
  #lite-article {
    .article-footer {
      margin: 1em 0;
      font-size: 0.8em;
      font-style: italic;
      text-align: center;
      color: #8e8e8e;
    }
  }

</style>
