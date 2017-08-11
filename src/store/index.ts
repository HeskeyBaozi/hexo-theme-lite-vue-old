import Vue from 'vue';
import Vuex from 'vuex';
import {HelloModule} from '@/store/modules/hello';
import {ArchivesModule} from '@/store/modules/archives';
import {AppModule} from "@/store/modules/app";
import {TagsModule} from "@/store/modules/tags";
import {CategoriesModule} from "@/store/modules/categories";
import {ArticleModule} from "@/store/modules/one-article";
import {HomeModule} from "@/store/modules/home";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    hello: new HelloModule(),
    archives: new ArchivesModule(),
    app: new AppModule(),
    tags: new TagsModule(),
    categories: new CategoriesModule(),
    article: new ArticleModule(),
    home: new HomeModule()
  }
});
