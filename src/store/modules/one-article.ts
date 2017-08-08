import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {Article} from "@/interfaces";
import {fetchPostBySlug} from '@/api';

class ArticleState {
  article: Article = {
    title: '',
    slug: '',
    date: '',
    updated: '',
    comments: false,
    path: '',
    excerpt: null,
    covers: null,
    content: '',
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
  [Initialize_Article_Page]: async ({commit, getters}, payload: { slug: string }) => {
    if (!getters[Page_Initialized] || getters[Current_Article_Slug] !== payload.slug) {
      commit({
        type: Begin_Initialize
      });
      const json = await fetchPostBySlug(payload.slug);
      commit({
        type: Save_Article,
        article: json
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
