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
    @ModuleAction(Initialize_Home_Page)
    initialize: () => Promise<any>;

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

    asyncData({store, route}): Promise<void> {
      return store.dispatch(`app/${Initialized_Global_App}`);
    }


    created() {
      this.initialize();
    }

    async handlePageChange(toPageNum: number) {
      await this.inputPageNum({pageNum: toPageNum});
      window.scrollTo(0, 0);
    }
  }
</script>

<style lang="less" scoped>
  .page {
    margin-top: 1em;
    text-align: center;
  }
</style>
