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
  import {ArticleModule, Initialize_Article_Page} from "@/store/modules/one-article";
  import ArticleContent from '@/components/ArticleContent';
  import ArticleCard from '@/components/ArticleCard';
  import {DateTimeFormat} from "@/interfaces/appClass";
  import {Initialized_Global_App} from "@/store/modules/app";

  const ModuleState = namespace('article', State);
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

    async asyncData({store, route}): Promise<void> {
      return store.dispatch(`article/${Initialize_Article_Page}`, {slug: route.params.slug});
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
