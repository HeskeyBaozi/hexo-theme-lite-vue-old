<template>
  <div id="lite-implicit-article">
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
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import {namespace, State, Action} from 'vuex-class';
  import {Article} from '@/interfaces';
  import {ArticleModule, Initialize_Article_Page} from "@/store/modules/one-article";
  import ArticleContent from '@/components/ArticleContent';
  import ArticleCard from '@/components/ArticleCard';
  import {DateTimeFormat} from "@/interfaces/appClass";
  import {Initialized_Global_App} from "@/store/modules/app";

  const ModuleState = namespace('article', State);
  const ModuleAction = namespace('article', Action);
  const AppState = namespace('app', State);

  @Component({
    name: 'implicit-article',
    components: {ArticleContent, ArticleCard}
  })
  export default class OneImplicitArticle extends Vue {
    @ModuleState
    article: Article;

    @AppState
    dateTimeFormat: DateTimeFormat;

    async asyncData({store, route}): Promise<void> {
      store.dispatch(`article/${Initialize_Article_Page}`, {slug: route.params.slug, isPage: true});
    }
  }
</script>

<style lang="less" scoped>
  #lite-implicit-article {
    .article-footer {
      margin: 1em 0;
      font-size: 0.8em;
      font-style: italic;
      text-align: center;
      color: #8e8e8e;
    }
  }

</style>
