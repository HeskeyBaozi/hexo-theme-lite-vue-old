<template>
  <span class="btn">
    <slot></slot>
  </span>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    name: 'l-button',
  })
  export default class LButton extends Vue {

  }
</script>

<style lang="less" scoped>
  @import "../my-theme/vars.less";

  @faded-color: fade(@primary-color, 70%);

  .btn {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    > * {
      display: inline-block;
      margin: 0 5px;
    }
    transition: all 200ms;
    color: @faded-color;
    border: 1px solid @faded-color;
    border-radius: 3px;
    padding: 5px 5px;

    &:hover {
      color: white;
      background-color: @faded-color;
    }
  }
</style>
