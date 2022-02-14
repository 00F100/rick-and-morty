import { createApp } from "vue";
import Vue from "vue"
import App from "./App.vue";
import { Quasar } from "quasar";
import { createStore } from 'vuex'

import "@quasar/extras/material-icons/material-icons.css";
import "./styles/quasar.sass";

const store = createStore({
  state: {
    page: "list",
    loading: false,
    current: null,
  },
  mutations: {
    changePage(state, payload) {
      state.page = payload.page
      state.current = payload.id
      window.scrollTo(0,0)
    }
  }
})

createApp(App)
    .use(Quasar, {
        config: {},
        plugins: {},
    })
    .use(store)
    .mount("#app");
