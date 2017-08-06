import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {PostListItem} from "@/interfaces";
import {fetchPostsListByPageNumber} from '@/api';

class ArchivesState {
  postsList: PostListItem[] = [];
  pagination: {
    total: number;
    pageSize: number;
    pageCount: number;
  } = {
    total: 0,
    pageSize: 0,
    pageCount: 0
  };
  pageInitialized = false;
}

/**
 * Mutations Types
 */
const Save_Posts_List = 'Save_Posts_List';
const Save_Posts_Pagination = 'Save_Posts_Pagination';
const Make_Sure_Initialized = 'Make_Sure_Initialized';

/**
 * Mutations
 */
const mutations: MutationTree<ArchivesState> = {
  [Save_Posts_List]: (state, payload: { list: PostListItem[] }) => {
    state.postsList = [...payload.list];
  },
  [Save_Posts_Pagination]: (state, payload: {
    pagination: {
      total: number;
      pageSize: number;
      pageCount: number;
    }
  }) => {
    state.pagination = {
      ...state.pagination,
      ...payload.pagination
    };
  },
  [Make_Sure_Initialized]: (state) => {
    state.pageInitialized = true;
  }
};

/**
 * Actions Types
 */
export const Initialize_Archives_Page = 'Initialized_Global_App';
export const Input_PageNum = 'Input_PageNum';
/**
 * Actions
 */
const actions: ActionTree<ArchivesState, any> = {
  [Initialize_Archives_Page]: async ({commit, getters}, payload: { pageNum: number }) => {
    if (!getters.pageInitialized) {
      const json = await fetchPostsListByPageNumber(payload.pageNum);
      const {data, total, pageSize, pageCount} = json;
      commit({
        type: Save_Posts_List,
        list: data
      });
      commit({
        type: Save_Posts_Pagination,
        pagination: {total, pageSize, pageCount}
      });
      commit({
        type: Make_Sure_Initialized
      });
    }
  },

  [Input_PageNum]: async ({commit}, payload: { pageNum: number }) => {
    const json = await fetchPostsListByPageNumber(payload.pageNum);
    const {data} = json;
    commit({
      type: Save_Posts_List,
      list: data
    });
  }
};

const getters: GetterTree<ArchivesState, any> = {
  pageInitialized: (state: ArchivesState, getters: any, rootState: any, rootGetters: any): boolean => {
    return state.pageInitialized;
  }
};

export class ArchivesModule implements Module<ArchivesState, any> {
  namespaced = true;
  state = new ArchivesState();
  mutations = mutations;
  getters = getters;
  actions = actions;
}
