import Vue from 'vue';
import Vuex from 'vuex';
import {HelloModule} from '@/store/modules/hello';
import {ArchivesModule} from '@/store/modules/archives';
import {AppModule} from "@/store/modules/app";


Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    hello: new HelloModule(),
    archives: new ArchivesModule(),
    app: new AppModule()
  }
});
