<template>
  <div id="lite-top-nav" class="blur top-left-padding">
    <main class="container">
      <i-dropdown placement="bottom-start" trigger="click" @on-click="go($event)" transfer>
        <i-button icon="chevron-down" type="text" size="small">
          <span class="menu-title">Menu</span>
        </i-button>
        <i-dropdown-menu slot="list">
          <i-dropdown-item class="top-dropdown" :name="item.name" v-for="item in items" :key="item.name">
            <div class="item-wrapper">
              <div class="icon-wrapper">
                <i-icon :type="item.icon" class="icon"></i-icon>
              </div>
              <span>{{item.name}}</span>
            </div>
          </i-dropdown-item>
        </i-dropdown-menu>
      </i-dropdown>
    </main>
  </div>
</template>

<script lang="ts">
  import IDropdown from 'iview-comp/dropdown/dropdown.vue';
  import IDropdownMenu from 'iview-comp/dropdown/dropdown-menu.vue';
  import IDropdownItem from 'iview-comp/dropdown/dropdown-item.vue';
  import IIcon from 'iview-comp/icon';
  import IButton from 'iview-comp/button/button.vue';
  import {Component, Prop, Vue} from "vue-property-decorator";


  @Component({
    name: 'top-nav',
    components: {
      IDropdown, IIcon, IDropdownMenu, IDropdownItem, IButton
    }
  })
  export default class TopNav extends Vue {

    go(name: string) {
      this.$router.push({name});
    }

    get items() {
      return [
        {name: 'Home', icon: 'ios-home'},
        {name: 'Archives', icon: 'android-list'},
        {name: 'Categories', icon: 'android-bookmark'},
        {name: 'Tags', icon: 'pound'}
      ];
    }
  }
</script>

<style lang="less">
  @import '~@/my-theme/mixins.less';

  .top-dropdown {
    font-size: .8em !important;

    .item-wrapper {
      display: flex;
      .icon-wrapper {
        width: 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: .3em;
      }
    }

  }
</style>
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
    height: 40px;
    background-color: white;

    &:before {
      filter: blur(6px);
    }

    .menu-title {
      text-shadow: 0 0 5px white;
    }
  }
</style>
