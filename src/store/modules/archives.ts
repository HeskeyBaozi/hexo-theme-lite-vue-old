import {Module, MutationTree, ActionTree, ActionContext, GetterTree} from 'vuex';
import {PostListItem} from "@/interfaces";
import {fetchPostsListByPageNumber} from '@/api';

class ArchivesState {
  postsList: PostListItem[] = [];
}

/**
 * Mutations Types
 */
const Save_Posts_List = 'Save_Posts_List';

/**
 * Mutations
 */
const mutations: MutationTree<ArchivesState> = {
  [Save_Posts_List]: (state: ArchivesState, payload: { list: PostListItem[] }) => {
    state.postsList = [...state.postsList, ...payload.list];
  }
};

/**
 * Actions Types
 */
export const Initialize_Archives_Page = 'Initialize_Archives_Page';

/**
 * Actions
 */
const actions: ActionTree<ArchivesState, any> = {
  [Initialize_Archives_Page]: async ({commit}: ActionContext<ArchivesState, any>, payload: { pageNum: number }) => {
    const json = await fetchPostsListByPageNumber(payload.pageNum);
    commit({
      type: Save_Posts_List,
      list: json.data
    });
  }
};

const getters: GetterTree<ArchivesState, any> = {};

export class ArchivesModule implements Module<ArchivesState, any> {
  namespaced = true;
  state = new ArchivesState();
  mutations = mutations;
  getters = getters;
  actions = actions;
}
