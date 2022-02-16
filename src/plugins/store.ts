import { createStore } from 'vuex'

export default createStore({
  state: {
    page: "",
    loading: false,
    current: null,
  },
  mutations: {
    changePage(state, payload) {
      state.page = payload.page.fullPath
      state.current = payload.id
      state.loading = false
    },
    finishLoader(state) {
      state.loading = false
    }
  }
})
