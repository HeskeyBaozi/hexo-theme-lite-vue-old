<template>
  <div id="lite-top-nav">
    <ul>
      <li>
        <router-link :to="{name:'Home'}">Home</router-link>
      </li>
      <li>
        <router-link :to="{name:'Archives'}">Archives</router-link>
      </li>
      <li>
        <router-link :to="{name:'Categories'}">Categories</router-link>
      </li>
      <li>
        <router-link :to="{name:'Tags'}">Tags</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'top-nav'
  })
  export default class TopNav extends Vue {

  }
</script>
