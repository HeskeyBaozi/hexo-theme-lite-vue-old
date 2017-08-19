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
  Pagination,
  Theme
} from "@/interfaces/appClass";
import {AxiosResponse} from "axios";
import {Article_Loading} from "@/store/modules/one-article";


class AppState {
  site: Site = new Site();
  url: URL = new URL();
  directory: Directory = new Directory();
  writing: Writing = new Writing();
  categoriesAndTags: CategoryAndTags = new CategoryAndTags();
  dateTimeFormat: DateTimeFormat = new DateTimeFormat();
  page: Pagination = new Pagination();
  extensions: Extensions = new Extensions();
  theme: Theme = new Theme();
  globalInitialized: boolean = false;
  loading: boolean = true;
}

/**
 * Mutations Types
 */
const Save_Global_Hexo_Var = 'Save_Global_Hexo_Var';
const Make_Sure_Initialized = 'Make_Sure_Initialized';
export const Show_Loading = 'Show_Loading';
export const Hide_Loading = 'Hide_Loading';

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

    state.theme = {
      ...state.theme,
      menu: json.menu,
      menu_icons: json.menu_icons,
      social: json.social,
      social_icons: json.social_icons,
      avatar: json.avatar
    };

  },
  [Make_Sure_Initialized]: state => {
    state.globalInitialized = true;
  },
  [Show_Loading]: (state: AppState) => {
    state.loading = true;
  },
  [Hide_Loading]: (state: AppState) => {
    state.loading = false;
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
  [Initialized_Global_App]: async ({commit, getters, dispatch}): Promise<void> => {
    if (!getters[Global_Initialized]) {
      await dispatch({
        type: Show_Loading
      });
      const res: AxiosResponse = await fetchHexoConfig();
      const {data} = res;
      commit({
        type: Save_Global_Hexo_Var,
        json: data
      });
      commit({
        type: Make_Sure_Initialized
      });
      await dispatch({
        type: Hide_Loading
      });
    }
  },
  [Show_Loading]: async ({commit}): Promise<void> => {
    commit({
      type: Show_Loading
    });
  },
  [Hide_Loading]: async ({commit}): Promise<void> => {
    commit({
      type: Hide_Loading
    });
  }
};

/**
 * Getters Types
 */
export const Global_Initialized = 'Global_Initialized';
export const Global_Pagination = 'Global_Pagination';
export const Global_Loading = 'Global_Loading';

/**
 * Getters
 */
const getters: GetterTree<AppState, any> = {
  [Global_Initialized]: (state: AppState, getters: any, rootState: any, rootGetters: any) => {
    return state.globalInitialized;
  },
  [Global_Pagination]: (state: AppState) => {
    return state.page;
  },
  [Global_Loading]: (state: AppState, getters: any, rootState: any, rootGetters: any) => {
    return state.loading || rootGetters[`article/${Article_Loading}`];
  }
};

export class AppModule implements Module<AppState, any> {
  namespaced = true;
  state = new AppState();
  mutations = mutations;
  getters = getters;
  actions = actions;
}
