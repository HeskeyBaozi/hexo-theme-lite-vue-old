import {DirectiveOptions} from "vue";
declare const require: any;
const url = require('@/assets/body-background.png');

export const blurContainer: DirectiveOptions = {
  bind: function (el, b, vnode, oldVnode) {
    const bgColor = b.value.bgColor;
    const fixed = b.value.fixed;
    el.style.cssText = `
    background-color: ${bgColor};
    position: ${fixed ? 'fixed' : 'relative'};
    z-index: 1;
    overflow: hidden;`;

  }
};

export const blurRunner: DirectiveOptions = {
  bind: function (el, b, vnode, oldVnode) {
    const offset = b.value.offset;
    const blur: string = b.value.blur;
    el.style.cssText = `
      z-index: -1;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      filter: blur(${blur});
      background: url('${url}') no-repeat fixed;
      background-position: ${offset.offsetLeft} ${offset.offsetTop}
      `;
  }
};
