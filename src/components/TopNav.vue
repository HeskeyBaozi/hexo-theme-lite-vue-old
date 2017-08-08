<template>
  <div id="lite-top-nav">
    <i-dropdown placement="bottom-start" trigger="click" transfer>
      <l-button>
        <span>Menu</span>
      </l-button>
      <i-dropdown-menu slot="list">
        <i-dropdown-item>
          <router-link tag="p" :to="{name:'Home'}">Home</router-link>
        </i-dropdown-item>
        <i-dropdown-item>
          <router-link tag="p" :to="{name:'Archives'}">Archives</router-link>
        </i-dropdown-item>
        <i-dropdown-item>
          <router-link tag="p" :to="{name:'Categories'}">Categories</router-link>
        </i-dropdown-item>
        <i-dropdown-item>
          <router-link tag="p" :to="{name:'Tags'}">Tags</router-link>
        </i-dropdown-item>
      </i-dropdown-menu>
    </i-dropdown>
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

  }
</script>

<style lang="less" scoped>
  #lite-top-nav {
    position: fixed;
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
  }
</style>
