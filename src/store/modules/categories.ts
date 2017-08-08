import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {CategoryItem} from "@/interfaces";
import {fetchAllCategories} from '@/api';

class CategoriesState {
  categoriesList: CategoryItem[] = [];
  pageInitialized = false;
}

/**
 * Mutations Types
 */
const Save_Categories_List = 'Save_Categories_List';
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
  }
};

/**
 * Actions Types
 */
export const Initialize_Categories_Page = 'Initialize_Categories_Page';
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
