<template>
  <div id="lite-categories">
    <h1 class="lite-categories-leading">Categories</h1>
    <box-list :boxes="categoriesList"
              type="categories"></box-list>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {State, namespace, Action} from 'vuex-class';
  import {Initialize_Categories_Page} from "@/store/modules/categories";
  import {CategoryItem} from '@/interfaces';
  import BoxList from '@/components/BoxList';

  const ModuleAction = namespace('categories', Action);
  const ModuleState = namespace('categories', State);

  @Component({
    name: 'categories',
    components: {BoxList}
  })
  export default class Categories extends Vue {

    @ModuleAction(Initialize_Categories_Page)
    initialize: () => Promise<any>;

    @ModuleState
    categoriesList: CategoryItem[];

    created() {
      console.log('categories created');
      this.initialize();
    }
  }
</script>

<style lang="less" scoped>
  #lite-categories {
    .lite-categories-leading {
      font-size: 1.5em;
      text-align: center;
    }
  }
</style>
