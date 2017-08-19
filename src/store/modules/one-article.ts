import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {Article} from "@/interfaces";
import {fetchImplicitPageByName, fetchPostBySlug} from '@/api';
import moment from 'moment';
import {Initialized_Global_App} from "@/store/modules/app";
import {AxiosResponse} from "axios";

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

  implicit_article: Article = {
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
  loading = false;
}

/**
 * Mutations Types
 */
const Save_Article = 'Save_Article';
const Save_Implicit_Article = 'Save_Implicit_Article';
const Make_Sure_Initialized = 'Make_Sure_Initialized';
const Begin_Initialize = 'Begin_Initialize';
const Show_Loading = 'Show_Loading';
const Hide_Loading = 'Hide_Loading';

/**
 * Mutations
 */
const mutations: MutationTree<ArticleState> = {
  [Save_Article]: (state, payload: { article: Article }) => {
    state.article = payload.article;
  },
  [Save_Implicit_Article]: (state, payload: { implicit_article: Article }) => {
    state.implicit_article = payload.implicit_article;
  },
  [Make_Sure_Initialized]: (state) => {
    state.pageInitialized = true;
  },
  [Begin_Initialize]: (state) => {
    state.pageInitialized = false;
  },
  [Show_Loading]: (state) => {
    state.loading = true;
  },
  [Hide_Loading]: (state) => {
    state.loading = false;
  }
};

/**
 * Actions Types
 */
export const Initialize_Article_Page = 'Initialize_Article_Page';
export const Initialize_Implicit_Article_Page = 'Initialize_Implicit_Article_Page';
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
      commit({
        type: Show_Loading
      });
      const res: AxiosResponse = await fetchPostBySlug(payload.slug);
      const {data} = res;
      commit({
        type: Save_Article,
        article: data
      });
      commit({
        type: Hide_Loading
      });
      commit({
        type: Make_Sure_Initialized
      });
    }
  },
  [Initialize_Implicit_Article_Page]: async ({dispatch, commit, getters}, payload: { title: string }) => {
    if (!getters[Page_Initialized] || getters[Current_Implicit_Article_Title] !== payload.title) {
      await dispatch(`app/${Initialized_Global_App}`, null, {root: true});
      commit({
        type: Begin_Initialize
      });
      commit({
        type: Show_Loading
      });
      const res: AxiosResponse = await fetchImplicitPageByName(payload.title);
      const {data} = res;
      commit({
        type: Save_Implicit_Article,
        implicit_article: data
      });
      commit({
        type: Hide_Loading
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
export const Article_Loading = 'Article_Loading';
const Current_Article_Slug = 'Current_Article_Slug';
const Current_Implicit_Article_Title = 'Current_Implicit_Article_Title';

/**
 * Getters
 */
const getters: GetterTree<ArticleState, any> = {
  [Page_Initialized]: (state: ArticleState, getters: any, rootState: any, rootGetters: any): boolean => {
    return state.pageInitialized;
  },
  [Current_Article_Slug]: (state): string => {
    return state.article.slug
  },
  [Article_Loading]: (state): boolean => {
    return state.loading;
  },
  [Current_Implicit_Article_Title]: (state): string => {
    return state.implicit_article.title;
  }
};

export class ArticleModule implements Module<ArticleState, any> {
  namespaced = true;
  state = new ArticleState();
  mutations = mutations;
  getters = getters;
  actions = actions;
}
