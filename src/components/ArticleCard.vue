<template>
  <article id="article-card">
    <section class="article-meta">
      <div class="article-leading">
        <h1 class="title">
          <template v-if="showExcerpt">
            <a v-if="post.link && post.link.length" target="_blank" :href="post.link">{{post.title || 'Untitled'}}
              <i-icon type="link"></i-icon>
            </a>
            <router-link v-else :to="{name: 'OneArticle', params: {slug: post.slug}}">{{post.title || 'Untitled'}}
            </router-link>
          </template>
          <template v-else>
            <span>{{post.title || 'Untitled'}}</span>
          </template>
        </h1>
        <p class="create-time">
          <span>{{getTimeFormat(post.date)}}</span>
          <router-link v-if="post.categories.length" :to="{name:'Home'}">{{category}}</router-link>
        </p>
      </div>
      <div class="photos" v-if="post.photos && post.photos.length">
        <i-carousel arrow="always">
          <i-carousel-item v-for="url in post.photos" :key="url">
            <div class="img-wrapper" @click="handleReadMoreClick(post.slug)">
              <img :src="url" :alt="url"/>
            </div>
          </i-carousel-item>
        </i-carousel>
      </div>
      <div class="cover" v-else-if="post.cover">
        <div class="img-wrapper" @click="handleReadMoreClick(post.slug)">
          <img :src="post.cover" alt="cover"/>
        </div>
      </div>
      <template v-if="showExcerpt">
        <p class="description">{{description}}</p>
      </template>
      <div v-if="post.tags.length" class="tags">
        <i-icon type="pound"></i-icon>
        <router-link :to="{name:'Home'}" v-for="tag in post.tags" :key="tag.name">{{tag.name}}</router-link>
      </div>
      <template v-if="showExcerpt">
        <i-button size="small"
                  type="primary"
                  @click="handleReadMoreClick(post.slug)">More
        </i-button>
      </template>
    </section>
  </article>
</template>

<script lang="ts">
  import {Component, Vue, Prop} from 'vue-property-decorator';
  import {PostListItem} from "@/interfaces/index";
  import ICarousel from 'iview-comp/carousel/carousel.vue';
  import ICarouselItem from 'iview-comp/carousel/carousel-item.vue';
  import IButton from 'iview-comp/button/button.vue';
  import IIcon from 'iview-comp/icon/icon.vue';
  import IModal from 'iview-comp/modal/modal.vue';
  import moment, {Moment} from "moment";

  @Component({
    name: 'article-card',
    components: {ICarousel, ICarouselItem, IButton, IIcon, IModal}
  })
  export default class ArticleCard extends Vue {
    @Prop({
      required: true,
      type: Object
    })
    post: PostListItem;

    @Prop({
      required: true
    })
    dateFormat: string;

    @Prop({
      'default': true
    })
    showExcerpt: boolean;

    handleReadMoreClick(slug: string) {
      this.$router.push({name: 'OneArticle', params: {slug}});
    }

    getTimeFormat(date) {
      if (typeof date === 'string') {
        date = moment(date);
      }
      return date.format(this.dateFormat);
    }

    get description() {
      const text = /*this.post.excerpt ? this.post.excerpt :*/ this.post.text;
      return text + '...';
    }

    get category() {
      const len = this.post.categories.length;
      if (!len) {
        return 'No Category';
      } else {
        return this.post.categories[len - 1].name;
      }
    }
  }

</script>

<style lang="less" scoped>
  #article-card {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 1em 0;
    > * {
      width: 100%;
    }

    .article-meta {
      text-align: center;

      > * {
        margin-bottom: 1em;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .title {
        font-size: 1.2em;
      }

      .create-time, .tags {
        font-size: 0.8em;
        color: #8a8a8a;
        > * {
          margin-left: .3em;
          margin-right: .3em;
        }
      }

      .cover, .photos {
        margin-bottom: 1em;
        margin-left: -3em;
        margin-right: -3em;

      }

      .cover, .photos {
        padding: 5px;
        border: 1px solid #e3e3e3;
        background-color: white;
      }

      .img-wrapper {
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        cursor: pointer;

        > img {
          max-width: 100%;
        }
      }

      .description {
        padding: 0 1em;
      }
    }

  }
</style>
