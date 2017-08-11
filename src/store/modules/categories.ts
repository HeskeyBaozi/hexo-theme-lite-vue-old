import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {CategoryItem, PostListItem} from "@/interfaces";
import {fetchAllCategories, fetchPostsListByCategory} from '@/api';

class CategoriesState {
  categoriesList: CategoryItem[] = [];
  relatedPosts: PostListItem[] = [];
  pageInitialized = false;
}

/**
 * Mutations Types
 */
const Save_Categories_List = 'Save_Categories_List';
const Save_Related_Posts = 'Save_Related_Posts';
const Make_Sure_Initialized = 'Make_Sure_Initialized';

/**
 * Mutations
 */
const mutations: MutationTree<CategoriesState> = {
  [Save_Categories_List]: (state, payload: { list: CategoryItem[] }) => {
    state.categoriesList = payload.list;
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
export const Initialize_Categories_Page = 'Initialize_Categories_Page';
export const Initialize_Related_Posts = 'Initialize_Related_Posts';
/**
 * Actions
 */
const actions: ActionTree<CategoriesState, any> = {
  [Initialize_Categories_Page]: async ({commit, getters}) => {
    if (!getters[Page_Initialized]) {
      const json = await fetchAllCategories();
      commit({
        type: Save_Categories_List,
        list: json
      });
      commit({
        type: Make_Sure_Initialized
      });
    }
  },
  [Initialize_Related_Posts]: async ({commit}, payload: { category_name: string }) => {
    const json = await fetchPostsListByCategory(payload.category_name);
    const {name, postlist} = json;
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
const getters: GetterTree<CategoriesState, any> = {
  [Page_Initialized]: (state: CategoriesState, getters: any, rootState: any, rootGetters: any): boolean => {
    return state.pageInitialized;
  }
};

export class CategoriesModule implements Module<CategoriesState, any> {
  namespaced = true;
  state = new CategoriesState();
  mutations = mutations;
  getters = getters;
  actions = actions;
}
