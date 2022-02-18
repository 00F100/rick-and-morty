import { createStore } from 'vuex'

export default createStore({
  state: {
    page: "",
    loading: true,
    current: null,
    filter: null,
    paginate: null,
    cache: null
  },
  mutations: {
    changePage(state, payload) {
      state.page = payload.page.fullPath
      state.current = payload.id
      state.loading = true
    },
    loading(state, active) {
      state.loading = active
    },
    cache(state, data) {
      state.cache = data
    },
    paginate(state, paginate) {
      state.paginate = paginate
    },
    filter(state, data) {
      state.filter = data
    }
  }
})
