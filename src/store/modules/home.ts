import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {ListPagination, PostListItem} from "@/interfaces";
import {fetchPostsListByPageNumber, fetchPostsList} from '@/api';
import {Global_Pagination} from '@/store/modules/app';
import {LoadingBar} from 'iview';
import moment from 'moment';


class HomeState {
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
const mutations: MutationTree<HomeState> = {
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
export const Initialize_Home_Page = 'Initialize_Home_Page';
export const Input_PageNum = 'Input_PageNum';
/**
 * Actions
 */
const actions: ActionTree<HomeState, any> = {
  [Initialize_Home_Page]: async ({commit, getters, rootGetters}) => {
    LoadingBar.start();
    if (!getters[Page_Initialized]) {
      const json = await fetchPostsList();
      const {data} = json;
      commit({
        type: Save_Posts_List,
        list: data.map(item => ({...item, date: moment(item.date), updated: moment(item.updated)}))
      });
      LoadingBar.update(75);
      if (rootGetters[`app/${Global_Pagination}`].per_page !== 0) {
        const {total, pageSize, pageCount} = json;
        commit({
          type: Save_Posts_Pagination,
          pagination: {total, pageSize, pageCount}
        });
      }
      LoadingBar.update(95);
      commit({
        type: Make_Sure_Initialized
      });
    }
    LoadingBar.finish();
  },

  [Input_PageNum]: async ({commit}, payload: { pageNum: number }) => {
    LoadingBar.start();
    console.log('number', payload.pageNum);
    const json = await fetchPostsListByPageNumber(payload.pageNum);
    const {data, total, pageSize, pageCount} = json;
    LoadingBar.update(70);
    commit({
      type: Save_Posts_List,
      list: data.map(item => ({...item, date: moment(item.date), updated: moment(item.updated)}))
    });
    LoadingBar.update(90);
    commit({
      type: Save_Posts_Pagination,
      pagination: {total, pageSize, pageCount}
    });
    LoadingBar.finish();
  }
};


/**
 * Getters Types
 */
export const Page_Initialized = 'Page_Initialized';

/**
 * Getters
 */
const getters: GetterTree<HomeState, any> = {
  [Page_Initialized]: (state: HomeState, getters: any, rootState: any, rootGetters: any): boolean => {
    return state.pageInitialized;
  }
};

export class HomeModule implements Module<HomeState, any> {
  namespaced = true;
  state = new HomeState();
  mutations = mutations;
  getters = getters;
  actions = actions;
}
