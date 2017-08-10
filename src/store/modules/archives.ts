import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {ListPagination, PostListItem} from "@/interfaces";
import {fetchPostsListByPageNumber, fetchPostsList} from '@/api';
import {Global_Pagination} from "@/store/modules/app";
import moment from 'moment';

class ArchivesState {
  postsList: PostListItem[] = [];
  pagination: ListPagination = {
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
    pagination: ListPagination
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
export const Initialize_Archives_Page = 'Initialize_Archives_Page';
export const Input_PageNum = 'Input_PageNum';
/**
 * Actions
 */
const actions: ActionTree<ArchivesState, any> = {
  [Initialize_Archives_Page]: async ({commit, getters, rootGetters}) => {
    if (!getters[Page_Initialized]) {
      const json = await fetchPostsList();
      const {data} = json;
      commit({
        type: Save_Posts_List,
        list: data.map(item => ({...item, date: moment(item.date), updated: moment(item.updated)}))
      });
      if (rootGetters[`app/${Global_Pagination}`].per_page !== 0) {
        const {total, pageSize, pageCount} = json;
        commit({
          type: Save_Posts_Pagination,
          pagination: {total, pageSize, pageCount}
        });
      }
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


/**
 * Getters Types
 */
export const Page_Initialized = 'Page_Initialized';

/**
 * Getters
 */
const getters: GetterTree<ArchivesState, any> = {
  [Page_Initialized]: (state: ArchivesState, getters: any, rootState: any, rootGetters: any): boolean => {
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
