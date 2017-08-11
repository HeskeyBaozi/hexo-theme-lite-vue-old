<template>
  <div id="lite-box-list">
    <i-badge v-for="item in boxes"
             :key="item.name"
             :count="item.count"
             class-name="box-badge"
    >
      <router-link
        class="box-item"
        :to="getRoute(item.name)">{{item.name}}
      </router-link>
    </i-badge>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {CategoryItem, TagItem} from "@/interfaces/index";
  import IBadge from 'iview-comp/badge/badge.vue';

  @Component({
    name: 'box-list',
    components: {IBadge}
  })
  export default class BoxList extends Vue {
    @Prop({
      required: true
    })
    boxes: (CategoryItem | TagItem)[];

    @Prop({
      required: true
    })
    type: 'categories' | 'tags';

    getRoute(name: string) {
      if (this.type === 'categories') {
        return {
          name: 'OneCategory',
          params: {
            category_name: name
          }
        };
      } else {
        return {
          name: 'OneTag',
          params: {
            tag_name: name
          }
        };
      }
    }
  }
</script>

<style lang="less">
  @import "~@/my-theme/vars.less";

  #lite-box-list {
    .box-badge {
      background-color: fade(@primary-color, 90%);
      transform: scale(0.7);
    }
  }
</style>

<style lang="less" scoped>
  @import "~@/my-theme/vars.less";

  #lite-box-list {
    display: flex;
    height: min-content;
    justify-content: center;
    margin-top: 1em;
    margin-bottom: 1em;

    .box-item {
      border: 1px solid @primary-color;
      font-size: 0.8em;
      padding: .2em .6em;
      border-radius: 5px;
      transition: all 400ms;
      margin-right: 1em;
      margin-bottom: .5em;

      &:hover {
        background-color: @primary-color;
        color: white;
      }
    }
  }
</style>
