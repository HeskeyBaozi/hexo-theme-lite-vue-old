<template>
  <div id="lite-categories">
    categories
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import {State, namespace, Action} from 'vuex-class';
  import {Initialize_Categories_Page} from "@/store/modules/categories";
  import {CategoryItem} from '@/interfaces';

  const ModuleAction = namespace('categories', Action);

  @Component({
    name: 'categories'
  })
  export default class Categories extends Vue {

    @ModuleAction(Initialize_Categories_Page)
    initialize: () => Promise<any>;

    created() {
      console.log('categories created');
      this.initialize();
    }
  }
</script>
