<template>
  <div class="lite-home">
    <article-card v-for="post in postsList"
                  :key="post.slug"
                  :post="post"
                  :dateFormat="dateTimeFormat.date_format"></article-card>
    <i-page v-if="page.per_page !== 0"
            class="page"
            size="small"
            @on-change="handlePageChange($event)"
            :current="currentPage"
            :total="pagination.total"></i-page>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {namespace, State, Action} from 'vuex-class';
  import {Initialize_Home_Page, Input_PageNum} from "@/store/modules/home";
  import {ListPagination, PostListItem} from "@/interfaces/index";
  import {DateTimeFormat, Pagination} from "@/interfaces/appClass";
  import ArticleCard from '@/components/ArticleCard';
  import IPage from 'iview-comp/page/page.vue';
  import {Moment} from "moment";
  import {Initialized_Global_App} from "@/store/modules/app";

  const ModuleAction = namespace('home', Action);
  const ModuleState = namespace('home', State);
  const AppState = namespace('app', State);


  @Component({
    name: 'home',
    components: {ArticleCard, IPage}
  })
  export default class Home extends Vue {
    @ModuleAction(Input_PageNum)
    inputPageNum: (payload: { pageNum: number }) => Promise<any>;

    @ModuleState
    postsList: PostListItem[];

    @ModuleState
    pagination: ListPagination;

    @AppState
    page: Pagination;

    @AppState
    dateTimeFormat: DateTimeFormat;

    async asyncData({store, route}): Promise<void> {
      await store.dispatch(`home/${Initialize_Home_Page}`);
      if (route.query['page']) {
        await store.dispatch(`home/${Input_PageNum}`, {pageNum: route.query['page']});
      }
    }

    handlePageChange(toPageNum: string) {
      this.$router.push({name: 'Home', query: {page: toPageNum}});
    }

    get currentPage(): number {
      return this.$route.query['page'] && Number.parseInt(this.$route.query['page']) || 1;
    }
  }
</script>

<style lang="less" scoped>
  .page {
    margin-top: 1em;
    text-align: center;
  }
</style>
