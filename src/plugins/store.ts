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
    /**
     * Method to change current page 
     *
     * @param state State vuex
     * @param payload Payload for apply
     */
    changePage(state, payload) {
      state.page = payload.page.fullPath
      state.current = payload.id
      state.loading = true
    },
    /**
     * Method to  enable/disable loading interface
     *
     * @param state State vuex
     * @param active Enable/disable loading
     */
    loading(state, active) {
      state.loading = active
    },
    /**
     * Method to cache information
     *
     * @param state State vuex
     * @param data Data for cache
     */
    cache(state, data) {
      state.cache = data
    },
    /**
     * Method for store paginate
     *
     * @param state State vuex
     * @param paginate Data for cache
     */
    paginate(state, paginate) {
      state.paginate = paginate
    },
    /**
     * Meethod for store filter
     *
     * @param state State vuex
     * @param data Data for store
     */
    filter(state, data) {
      state.filter = data
    }
  }
})
