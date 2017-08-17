import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {Article} from "@/interfaces";
import {fetchPostBySlug} from '@/api';
import moment from 'moment';
import {Initialized_Global_App} from "@/store/modules/app";

class ArticleState {
  article: Article = {
    title: '',
    slug: '',
    date: moment(),
    updated: moment(),
    comments: false,
    path: '',
    excerpt: null,
    covers: null,
    content: '',
    photos: [],
    link: '',
    categories: [],
    tags: []
  };
  pageInitialized = false;
}

/**
 * Mutations Types
 */
const Save_Article = 'Save_Article';
const Make_Sure_Initialized = 'Make_Sure_Initialized';
const Begin_Initialize = 'Begin_Initialize';

/**
 * Mutations
 */
const mutations: MutationTree<ArticleState> = {
  [Save_Article]: (state, payload: { article: Article }) => {
    state.article = {
      ...state.article,
      ...payload.article
    };
  },
  [Make_Sure_Initialized]: (state) => {
    state.pageInitialized = true;
  },
  [Begin_Initialize]: (state) => {
    state.pageInitialized = false;
  }
};

/**
 * Actions Types
 */
export const Initialize_Article_Page = 'Initialize_Article_Page';
/**
 * Actions
 */
const actions: ActionTree<ArticleState, any> = {
  [Initialize_Article_Page]: async ({dispatch, commit, getters}, payload: { slug: string }) => {
    if (!getters[Page_Initialized] || getters[Current_Article_Slug] !== payload.slug) {
      await dispatch(`app/${Initialized_Global_App}`, null, {root: true});
      commit({
        type: Begin_Initialize
      });
      const res = await fetchPostBySlug(payload.slug);
      const {data} = res;
      commit({
        type: Save_Article,
        article: data
      });
      commit({
        type: Make_Sure_Initialized
      });
    }
  }
};

/**
 * Getters Types
 */
export const Page_Initialized = 'Page_Initialized';
const Current_Article_Slug = 'Current_Article_Slug';

/**
 * Getters
 */
const getters: GetterTree<ArticleState, any> = {
  [Page_Initialized]: (state: ArticleState, getters: any, rootState: any, rootGetters: any): boolean => {
    return state.pageInitialized;
  },
  [Current_Article_Slug]: (state): string => {
    return state.article.slug;
  }
};

export class ArticleModule implements Module<ArticleState, any> {
  namespaced = true;
  state = new ArticleState();
  mutations = mutations;
  getters = getters;
  actions = actions;
}
