<template>
  <div id="lite-article">
    <section class="article-leading">
      <div class="article-title">
        <h1>{{article.title}}</h1>
      </div>
      <div class="article-meta">meta</div>
    </section>
    <hr/>
    <article-content :content="article.content"></article-content>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {namespace, State, Action} from 'vuex-class';
  import {Article} from '@/interfaces';
  import {Initialize_Article_Page} from "@/store/modules/one-article";
  import ArticleContent from '@/components/ArticleContent';

  const ModuleState = namespace('article', State);
  const ModuleAction = namespace('article', Action);

  @Component({
    name: 'article',
    components: {ArticleContent}
  })
  export default class OneArticle extends Vue {
    @ModuleState
    article: Article;

    @ModuleAction(Initialize_Article_Page)
    initialize: (payload: { slug: string }) => Promise<any>;

    created() {
      /**
       * Subscribe the url
       */
      this.$watch('$route.params.slug', (newSlug: string, oldSlug: string) => {
        this.initialize({slug: newSlug})
          .then(() => {
          });
      }, {
        immediate: true
      });
    }
  }
</script>
