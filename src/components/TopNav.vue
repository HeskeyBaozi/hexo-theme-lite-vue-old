<template>
  <div id="lite-top-nav">
    <ul>
      <li>Home</li>
      <li>Archives</li>
      <li>Categories</li>
      <li>Tags</li>
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
