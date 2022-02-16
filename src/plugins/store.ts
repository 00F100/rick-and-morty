import { createStore } from 'vuex'

export default createStore({
  state: {
    page: "",
    loading: true,
    current: null,
  },
  mutations: {
    changePage(state, payload) {
      state.page = payload.page.fullPath
      state.current = payload.id
      state.loading = true
    },
    loading(state, active) {
      state.loading = active
    }
  }
})
