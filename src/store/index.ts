import Vue from 'vue';
import Vuex from 'vuex';
import {HelloModule} from './modules/hello';


Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    hello: new HelloModule()
  }
});
