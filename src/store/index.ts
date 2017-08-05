import Vue from 'vue';
import Vuex from 'vuex';
import {HelloModule} from './modules/hello';
import {ArchivesModule} from './modules/archives';


Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    hello: new HelloModule(),
    archives: new ArchivesModule()
  }
});
