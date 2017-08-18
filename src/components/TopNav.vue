<template>
  <div id="lite-top-nav" class="blur top-left-padding">
    <main class="container">
      <i-row>
        <i-col :xs="0" :sm="24">
          <!-- Reactive Menu >= 768px width -->
          <i-menu mode="horizontal"
                  theme="light" :active-name="$route.path"
                  @on-select="go"
          >
            <i-menu-item class="top-dropdown" :name="item.path" v-for="item in items" :key="item.name">
              <div class="item-wrapper">
                <div class="icon-wrapper" v-if="theme.menu_icons.enable">
                  <i-icon :type="item.icon" class="icon"></i-icon>
                </div>
                <span>{{item.name}}</span>
              </div>
            </i-menu-item>
          </i-menu>
        </i-col>
        <i-col :xs="24" :sm="0">
          <!-- <= 768px -->
          <i-dropdown placement="bottom-start" trigger="click" @on-click="go($event)" transfer>
            <i-button icon="chevron-down" type="text" size="small">
              <span class="menu-title">Menu</span>
            </i-button>
            <i-dropdown-menu mode="horizontal" theme="light" slot="list">
              <i-dropdown-item class="top-dropdown" :name="item.path" v-for="item in items" :key="item.name">
                <div class="item-wrapper">
                  <div class="icon-wrapper" v-if="theme.menu_icons.enable">
                    <i-icon :type="item.icon" class="icon"></i-icon>
                  </div>
                  <span>{{item.name}}</span>
                </div>
              </i-dropdown-item>
            </i-dropdown-menu>
          </i-dropdown>
        </i-col>
      </i-row>
    </main>
  </div>
</template>

<script lang="ts">
  import IDropdown from 'iview-comp/dropdown/dropdown.vue';
  import IDropdownMenu from 'iview-comp/dropdown/dropdown-menu.vue';
  import IDropdownItem from 'iview-comp/dropdown/dropdown-item.vue';
  import IIcon from 'iview-comp/icon';
  import IButton from 'iview-comp/button/button.vue';
  import IRow from 'iview-comp/grid/row.vue';
  import ICol from 'iview-comp/grid/col.vue';
  import {Component, Prop, Vue} from "vue-property-decorator";
  import IMenu from 'iview-comp/menu/menu.vue';
  import IMenuItem from 'iview-comp/menu/menu-item.vue';
  import {Theme} from "@/interfaces/appClass";


  @Component({
    name: 'top-nav',
    components: {
      IDropdown, IIcon, IDropdownMenu, IDropdownItem, IButton,
      IMenu, IMenuItem, IRow, ICol
    }
  })
  export default class TopNav extends Vue {
    @Prop({
      required: true,
      type: Object
    })
    theme: Theme;

    go(path: string) {
      this.$router.push({path});
    }

    get items() {
      const result: { name: string, path: string, icon: string }[] = [];
      const routes = this.theme.menu;
      const icons = this.theme.menu_icons;
      for (let key in routes) {
        result.push({
          name: key,
          path: routes[key],
          icon: icons[key]
        });
      }
      return result;
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

  .ivu-menu-light {
    background-color: rgba(255, 255, 255, 0) !important;

    &:after {
      background-color: rgba(255, 255, 255, 0) !important;
    }
  }

  .ivu-menu-horizontal {
    height: 40px;
    line-height: 40px;
  }

  .ivu-menu {
    display: flex;
    justify-content: center;
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
    text-shadow: 0 0 3px white;

    &:before {
      filter: blur(6px);
    }

    .menu-title {
      text-shadow: 0 0 5px white;
    }
  }
</style>
