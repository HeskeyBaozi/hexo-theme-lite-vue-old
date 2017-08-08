import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {TagItem} from "@/interfaces";
import {fetchAllTags} from '@/api';

class TagsState {
  tagsList: TagItem[] = [];
  pageInitialized = false;
}

/**
 * Mutations Types
 */
const Save_Tags_List = 'Save_Tags_List';
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
  }
};

/**
 * Actions Types
 */
export const Initialize_Tags_Page = 'Initialize_Tags_Page';
/**
 * Actions
 */
const actions: ActionTree<TagsState, any> = {
  [Initialize_Tags_Page]: async ({commit, getters}) => {
    if (!getters[Page_Initialized]) {
      const json = await fetchAllTags();
      commit({
        type: Save_Tags_List,
        list: json
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
