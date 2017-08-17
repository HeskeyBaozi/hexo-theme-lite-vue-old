import {Module, MutationTree, ActionTree, GetterTree} from 'vuex';
import {ListPagination, PostListItem} from "@/interfaces";
import {fetchPostsListByPageNumber, fetchPostsList} from '@/api';
import {Global_Pagination, Initialized_Global_App} from "@/store/modules/app";
import moment from 'moment';
import {AxiosResponse} from "axios";

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
  [Initialize_Archives_Page]: async ({dispatch, commit, rootGetters}) => {
    await dispatch(`app/${Initialized_Global_App}`, null, {root: true});
    const res: AxiosResponse = await fetchPostsList();
    const {data} = res;
    commit({
      type: Save_Posts_List,
      list: data['data'].map(item => ({...item, date: moment(item.date), updated: moment(item.updated)}))
    });
    if (rootGetters[`app/${Global_Pagination}`].per_page !== 0) {
      const {total, pageSize, pageCount} = data;
      commit({
        type: Save_Posts_Pagination,
        pagination: {total, pageSize, pageCount}
      });
    }
    commit({
      type: Make_Sure_Initialized
    });
  },

  [Input_PageNum]: async ({commit}, payload: { pageNum: number }) => {
    const res: AxiosResponse = await fetchPostsListByPageNumber(payload.pageNum);
    const {data} = res;
    commit({
      type: Save_Posts_List,
      list: data['data'].map(item => ({...item, date: moment(item.date), updated: moment(item.updated)}))
    });
  }
};


/**
 * Getters Types
 */
export const Page_Initialized = 'Page_Initialized';
export const Time_Line_List = 'Time_Line_List';

/**
 * Getters
 */
const getters: GetterTree<ArchivesState, any> = {
  [Page_Initialized]: (state: ArchivesState, getters: any, rootState: any, rootGetters: any): boolean => {
    return state.pageInitialized;
  },
  [Time_Line_List]: (state: ArchivesState, getters: any, rootState: any, rootGetters: any) => {
    const result = {};
    for (let post of state.postsList) {
      let yearAndMonth: string = `${post.date.year()}-${post.date.month() + 1}`;
      if (result[yearAndMonth]) {
        result[yearAndMonth].push(post);
      } else {
        result[yearAndMonth] = [post];
      }
    }
    return result;
  }
};

export class ArchivesModule implements Module<ArchivesState, any> {
  namespaced = true;
  state = new ArchivesState();
  mutations = mutations;
  getters = getters;
  actions = actions;
}
