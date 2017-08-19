<template>
  <div id="lite-archives">
    <h1 class="lite-archives-leading">Archives</h1>
    <i-timeline>
      <i-timeline-item class="article-item" v-for="(value, key) in timeline" :key="key">
        <i-icon type="ios-clock-outline" slot="dot"></i-icon>
        <h1 class="article-year">{{key}}</h1>
        <div class="article-meta" v-for="post in value" :key="post.slug">
          <p class="article-date">{{post.date.format('MM-DD')}}</p>
          <div class="article-title-wrapper">
            <a class="article-title"
               v-if="post.link && post.link.length"
               target="_blank"
               :href="post.link">{{post.title || 'Untitled'}}
              <i-icon type="link"></i-icon>
            </a>
            <router-link class="article-title"
                         v-else :to="{name: 'OneArticle', params: {slug: post.slug}}">
              {{post.title || 'Untitled'}}
            </router-link>
          </div>
        </div>
      </i-timeline-item>
      <i-timeline-item>
        <i-icon type="ios-browsers-outline" slot="dot"></i-icon>
        <p>{{page.per_page ? pagination.total : postsList.length}} article(s) in total.</p>
      </i-timeline-item>
    </i-timeline>
    <i-page v-if="page.per_page !== 0"
            class="page"
            size="small"
            :current="currentPage"
            @on-change="handlePageChange($event)"
            :total="pagination.total"></i-page>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {State, namespace, Action, Getter} from 'vuex-class';
  import {ListPagination, PostListItem} from "@/interfaces";
  import {Initialize_Archives_Page, Input_PageNum, Time_Line_List} from "@/store/modules/archives";
  import Moment from 'moment';
  import {DateTimeFormat, Pagination} from "@/interfaces/appClass";
  import ITimeline from 'iview-comp/timeline/timeline.vue';
  import ITimelineItem from 'iview-comp/timeline/timeline-item.vue';
  import IIcon from 'iview-comp/icon/icon.vue';
  import IPage from 'iview-comp/page/page.vue';
  import {Initialized_Global_App} from "@/store/modules/app";

  const ModuleState = namespace('archives', State);
  const AppState = namespace('app', State);
  const ModuleAction = namespace('archives', Action);
  const ModuleGetter = namespace('archives', Getter);


  @Component({
    name: 'archives',
    components: {ITimeline, ITimelineItem, IIcon, IPage},

  })
  export default class Archives extends Vue {
    @ModuleState
    postsList: PostListItem[];

    @ModuleState
    pagination: ListPagination;

    @ModuleAction(Input_PageNum)
    inputPageNum: (payload: { pageNum: number }) => Promise<any>;

    @AppState
    dateTimeFormat: DateTimeFormat;

    @AppState
    page: Pagination;

    @ModuleGetter(Time_Line_List)
    timeline;

    @ModuleAction(Initialize_Archives_Page)
    initialize: (payload: { pageNum: number }) => Promise<any>;

    async asyncData({store, route}): Promise<void> {
      await store.dispatch(`archives/${Initialize_Archives_Page}`);
      if (route.query['page']) {
        await store.dispatch(`archives/${Input_PageNum}`, {pageNum: route.query['page']});
      }
    }

    getDate(date: string) {
      return Moment(date).format(this.dateTimeFormat.date_format);
    }


    async handlePageChange(toPageNum: string) {
      this.$router.push({name: 'Archives', query: {page: toPageNum}});
    }

    get currentPage(): number {
      return this.$route.query['page'] && Number.parseInt(this.$route.query['page']) || 1;
    }
  }
</script>

<style lang="less" scoped>

  #lite-archives {
    .lite-archives-leading {
      font-size: 1.5em;
      text-align: center;
    }

    .article-item {
      .article-year {
        font-size: 1em;
        margin-bottom: 1em;
      }

      .article-meta {
        padding-left: 1em;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        margin-bottom: 1em;

        .article-date {
          width: 5em;
          margin-right: .5em;
          font-style: italic;
          color: #8e8e8e;
        }

        .article-title-wrapper {
          width: 100%;

          .article-title {
            font-weight: bold;
          }
        }
      }
    }

    .page {
      text-align: center;
    }
  }
</style>
