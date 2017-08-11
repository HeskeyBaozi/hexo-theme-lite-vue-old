import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {fetchHexoConfig} from '@/api';
import {
  Site,
  URL,
  Directory,
  Writing,
  DateTimeFormat,
  CategoryAndTags,
  Extensions,
  Pagination
} from "@/interfaces/appClass";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {LoadingBar} from 'iview';


class AppState {
  site: Site = new Site();
  url: URL = new URL();
  directory: Directory = new Directory();
  writing: Writing = new Writing();
  categoriesAndTags: CategoryAndTags = new CategoryAndTags();
  dateTimeFormat: DateTimeFormat = new DateTimeFormat();
  page: Pagination = new Pagination();
  extensions: Extensions = new Extensions();
  globalInitialized: ReplaySubject<boolean> = new ReplaySubject(1);
}

/**
 * Mutations Types
 */
const Save_Global_Hexo_Var = 'Save_Global_Hexo_Var';
const Make_Sure_Initialized = 'Make_Sure_Initialized';

/**
 * Mutations
 */
const mutations: MutationTree<AppState> = {
  [Save_Global_Hexo_Var]: (state: AppState, {json}: { json: any }) => {
    state.site = {
      ...state.site,
      title: json.title,
      subtitle: json.subtitle,
      description: json.description,
      author: json.author,
      language: json.language,
      timezone: json.timezone
    };

    state.url = {
      ...state.url,
      url: json.url,
      root: json.root,
      permalink: json.permalink,
      permalink_defaults: json.permalink_defaults
    };

    state.directory = {
      ...state.directory,
      source_dir: json.source_dir,
      public_dir: json.public_dir,
      tag_dir: json.tag_dir,
      archive_dir: json.archive_dir,
      category_dir: json.category_dir,
      code_dir: json.code_dir,
      i18n_dir: json.i18n_dir,
      skip_render: json.skip_render,
    };

    state.writing = {
      ...state.writing,
      new_post_name: json.new_post_name,
      default_layout: json.default_layout,
      titlecase: json.titlecase,
      external_link: json.external_link,
      filename_case: json.filename_case,
      render_drafts: json.render_drafts,
      post_asset_folder: json.post_asset_folder,
      relative_link: json.relative_link,
      future: json.future,
      highlight: json.highlight
    };

    state.categoriesAndTags = {
      ...state.categoriesAndTags,
      default_category: json.default_category,
      category_map: json.category_map,
      tag_map: json.tag_map
    };

    state.dateTimeFormat = {
      ...state.dateTimeFormat,
      date_format: json.date_format,
      time_format: json.time_format
    };

    state.page = {
      ...state.page,
      per_page: json.per_page,
      pagination_dir: json.pagination_dir
    };

    state.extensions = {
      ...state.extensions,
      theme: json.theme,
      deploy: json.deploy
    };
  },
  [Make_Sure_Initialized]: state => {
    state.globalInitialized.next(true);
    state.globalInitialized.complete();
  }
};

/**
 * Actions Types
 */
export const Initialized_Global_App = 'Initialized_Global_App';
/**
 * Actions
 */
const actions: ActionTree<AppState, any> = {
  [Initialized_Global_App]: async ({commit, getters}) => {
    LoadingBar.start();
    const json = await new Promise((resolve) => {
      setTimeout(() => {
        LoadingBar.update(75);
        resolve(fetchHexoConfig());
      }, 2000);
    });
    commit({
      type: Save_Global_Hexo_Var,
      json
    });
    commit({
      type: Make_Sure_Initialized
    });
    LoadingBar.finish();
  }
};

/**
 * Getters Types
 */
export const Global_Initialized$ = 'Global_Initialized$';
export const Global_Pagination = 'Global_Pagination';

/**
 * Getters
 */
const getters: GetterTree<AppState, any> = {
  [Global_Initialized$]: (state: AppState, getters: any, rootState: any, rootGetters: any) => {
    return state.globalInitialized;
  },
  [Global_Pagination]: (state: AppState) => {
    return state.page;
  }
};

export class AppModule implements Module<AppState, any> {
  namespaced = true;
  state = new AppState();
  mutations = mutations;
  getters = getters;
  actions = actions;
}
