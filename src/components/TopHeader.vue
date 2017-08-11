<template>
  <div id="lite-avatar-info" class="blur">
    <div class="avatar-info basic-container">
      <img class="avatar shadow" src="../assets/6828af33.jpg" alt="avatar">
      <p>{{site.author}}</p>
      <p>{{site.description}}</p>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {Site} from "@/interfaces/appClass";
  import IRow from 'iview-comp/grid/row.vue';
  import ICol from 'iview-comp/grid/col.vue';

  @Component({
    name: 'top-header',
    components: {IRow, ICol}
  })
  export default class TopHeader extends Vue {
    @Prop({
      required: true,
      type: Object
    })
    site: Site;
  }
</script>

<style lang="less" src="@/my-theme/mixins.less"></style>
<style lang="less" scoped>
  #lite-avatar-info {
    padding: 1em;
    background-color: white;
    &:before {
      filter: blur(10px);
    }
  }

  .basic-container {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    text-align: center;
    justify-content: center;
    height: 100%;
    > * {
      margin-bottom: .3em;
    }
  }

  .site-info {
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.68);
  }

  .avatar-info {
    .avatar {
      display: block;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      transition: all 600ms;
    }

    text-shadow: 0 0 10px white;

    .shadow {
      box-shadow: 1px 1px 3px white;
    }
  }
</style>
