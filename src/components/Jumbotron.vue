<template>
  <div id="lite-jumbotron" class="container-fluid" :style="bgPosition">
    <section class="avatar">
      <slot name="avatar"></slot>
    </section>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component({
    name: 'jumbotron',
  })
  export default class Jumbotron extends Vue {
    @Prop({
      'default': '50%'
    })
    offsetLeft: string;

    @Prop({
      'default': '10%'
    })
    offsetTop: string;

    @Prop({
      'default': '65vh'
    })
    height: string;

    get bgPosition() {
      return {
        backgroundPosition: `${this.offsetLeft} ${this.offsetTop}`,
        height: this.height
      };
    }
  }
</script>

<style lang="less" scoped>
  #lite-jumbotron {
    display: flex;
    flex-flow: nowrap;
    justify-content: center;
    align-items: flex-end;
    background: white url('../assets/64166794_p0.png') no-repeat;

    .avatar {
      align-self: flex-end;
    }
  }
</style>

