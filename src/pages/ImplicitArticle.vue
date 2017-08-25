<template>
  <div id="lite-implicit-article">
    <article-card :post="implicit_article"
                  :dateFormat="dateTimeFormat.date_format"
                  :showExcerpt="false"
    ></article-card>
    <article-content :content="implicit_article.content"></article-content>
    <footer class="article-footer">
      <p>EOF</p>
    </footer>
  </div>
</template>

<script lang="ts">
  import {Component, Vue, Watch} from 'vue-property-decorator';
  import {namespace, State, Action} from 'vuex-class';
  import {Article} from '@/interfaces';
  import {ArticleModule, Initialize_Implicit_Article_Page} from "@/store/modules/one-article";
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
    implicit_article: Article;

    @AppState
    dateTimeFormat: DateTimeFormat;

    async asyncData({store, route}): Promise<void> {
      await store.dispatch(`article/${Initialize_Implicit_Article_Page}`, {title: route.params['title']});
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
