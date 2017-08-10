<template>
  <div class="lite-archives">
    <div class="article-item" v-for="post in postsList" :key="post.slug">
      <h1>{{post.title}}</h1>
      <p>{{getDate(post.date)}}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {State, namespace, Action} from 'vuex-class';
  import {PostListItem} from "@/interfaces";
  import {Initialize_Archives_Page} from "@/store/modules/archives";
  import Moment from 'moment';
  import {DateTimeFormat} from "@/interfaces/appClass";

  const ModuleState = namespace('archives', State);
  const AppState = namespace('app', State);
  const ModuleAction = namespace('archives', Action);

  interface Timeline {
    [year: number]: Array<string[]>
  }

  @Component({
    name: 'archives'
  })
  export default class Archives extends Vue {
    @ModuleState
    postsList: PostListItem[];

    @AppState
    dateTimeFormat: DateTimeFormat;

    getDate(date: string) {
      return Moment(date).format(this.dateTimeFormat.date_format);
    }

    @ModuleAction(Initialize_Archives_Page)
    initialize: (payload: { pageNum: number }) => Promise<any>;

    created() {
      console.log('Archives created');
      this.initialize({pageNum: 1});
    }

  }
</script>
