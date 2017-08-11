import {Module, MutationTree, ActionTree, ActionContext, GetterTree} from 'vuex';

class State {
  msg = 'hello';
}


const mutations: MutationTree<State> = {
  saveMsg: (state: State, payload: any) => {
    state.msg = payload.msg;
  }
};

const actions: ActionTree<State, any> = {
  fetchMsg: async ({commit}: ActionContext<State, any>, payload: string) => {
    const newMsg = await Promise.resolve('Hello, World');
    commit({
      type: 'saveMsg',
      msg: payload || newMsg
    });
  }
};

const getters: GetterTree<State, any> = {
  msg: (state: State, getters: any, rootState: any, rootGetters: any) => {
    return state.msg;
  }
};

export class HelloModule implements Module<State, any> {
  namespaced = true;
  state = new State();
  mutations = mutations;
  getters = getters;
  actions = actions;
}

