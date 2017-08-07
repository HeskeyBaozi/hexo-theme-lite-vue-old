<template>
  <div id="lite-top-nav" class="container-fluid">
    <i-dropdown placement="bottom-start" trigger="click" transfer>
      <i-button type="ghost" icon="navicon-round">Menu</i-button>
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
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import IDropdown from 'iview-comp/dropdown/dropdown.vue';
  import IDropdownMenu from 'iview-comp/dropdown/dropdown-menu.vue';
  import IDropdownItem from 'iview-comp/dropdown/dropdown-item.vue';
  import Icon from 'iview-comp/icon';
  import IButton from 'iview-comp/button'

  @Component({
    name: 'top-nav',
    components: {
      IDropdown, Icon, IDropdownMenu, IDropdownItem, IButton
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
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.54);
  }
</style>
