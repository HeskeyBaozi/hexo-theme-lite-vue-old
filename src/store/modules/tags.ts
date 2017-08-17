import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {PostListItem, TagItem} from "@/interfaces";
import {fetchAllTags, fetchPostsListByTag} from '@/api';
import {Initialized_Global_App} from "@/store/modules/app";

class TagsState {
  tagsList: TagItem[] = [];
  relatedPosts: PostListItem[] = [];
  pageInitialized = false;
}

/**
 * Mutations Types
 */
const Save_Tags_List = 'Save_Tags_List';
const Save_Related_Posts = 'Save_Related_Posts';
const Make_Sure_Initialized = 'Make_Sure_Initialized';

/**
 * Mutations
 */
const mutations: MutationTree<TagsState> = {
  [Save_Tags_List]: (state, payload: { list: TagItem[] }) => {
    state.tagsList = payload.list;
  },
  [Make_Sure_Initialized]: (state) => {
    state.pageInitialized = true;
  },
  [Save_Related_Posts]: (state, payload: { list: PostListItem[] }) => {
    state.relatedPosts = payload.list;
  }
};

/**
 * Actions Types
 */
export const Initialize_Tags_Page = 'Initialize_Tags_Page';
export const Initialize_Related_Posts = 'Initialize_Related_Posts';
/**
 * Actions
 */
const actions: ActionTree<TagsState, any> = {
  [Initialize_Tags_Page]: async ({dispatch, commit, getters}) => {
    if (!getters[Page_Initialized]) {
      await dispatch(`app/${Initialized_Global_App}`, null, {root: true});
      const res = await fetchAllTags();
      const {data} = res;
      commit({
        type: Save_Tags_List,
        list: data
      });
      commit({
        type: Make_Sure_Initialized
      });
    }
  },
  [Initialize_Related_Posts]: async ({commit}, payload: { tag_name: string }) => {
    const res = await fetchPostsListByTag(payload.tag_name);
    const {data} = res;
    const {name, postlist} = data;
    commit({
      type: Save_Related_Posts,
      list: postlist
    });
  }
};

/**
 * Getters Types
 */
export const Page_Initialized = 'Page_Initialized';

/**
 * Getters
 */
const getters: GetterTree<TagsState, any> = {
  [Page_Initialized]: (state: TagsState, getters: any, rootState: any, rootGetters: any): boolean => {
    return state.pageInitialized;
  }
};

export class TagsModule implements Module<TagsState, any> {
  namespaced = true;
  state = new TagsState();
  mutations = mutations;
  getters = getters;
  actions = actions;
}
