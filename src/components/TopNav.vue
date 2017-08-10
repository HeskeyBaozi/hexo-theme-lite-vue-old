<template>
  <div id="lite-top-nav" class="blur top-left-padding">
    <main class="container">
      <i-dropdown placement="bottom-start" trigger="click" @on-click="go($event)" transfer>
        <l-button>
          <span>Menu</span>
        </l-button>
        <i-dropdown-menu slot="list">
          <i-dropdown-item :name="item.name" v-for="item in items" :key="item.name">{{item.name}}</i-dropdown-item>
        </i-dropdown-menu>
      </i-dropdown>
    </main>
  </div>
</template>

<script lang="ts">
  import IDropdown from 'iview-comp/dropdown/dropdown.vue';
  import IDropdownMenu from 'iview-comp/dropdown/dropdown-menu.vue';
  import IDropdownItem from 'iview-comp/dropdown/dropdown-item.vue';
  import Icon from 'iview-comp/icon';
  import {Component, Prop, Vue} from "vue-property-decorator";
  import LButton from '@/components/LButton';


  @Component({
    name: 'top-nav',
    components: {
      IDropdown, Icon, IDropdownMenu, IDropdownItem, LButton
    }
  })
  export default class TopNav extends Vue {

    go(name: string) {
      this.$router.push({name});
    }

    get items() {
      return [
        {name: 'Home'},
        {name: 'Archives'},
        {name: 'Categories'},
        {name: 'Tags'}
      ];
    }
  }
</script>

<style lang="less" src="@/my-theme/mixins.less"></style>
<style lang="less" scoped>
  #lite-top-nav {
    position: fixed;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: white;

    &:before {
      filter: blur(6px);
    }
  }
</style>
