<template>
  <div id="lite-box-list">

  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: 'box-list'
  })
  export default class BoxList extends Vue {
    @Prop({
      required: true
    })
    boxList: any[];
  }
</script>
