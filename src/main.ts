import { createApp } from "vue";
import Vue from "vue"
import App from "./App.vue";
import { Quasar } from "quasar";
import { createStore } from 'vuex'
import Characters from "./components/Characters.vue"
import Character from "./components/Character.vue"
import Episodes from "./components/Episodes.vue"
import Episode from "./components/Episode.vue"
import { createRouter, createWebHashHistory } from "vue-router"

import "@quasar/extras/material-icons/material-icons.css";
import "./styles/quasar.sass";

const store = createStore({
  state: {
    page: "characters",
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

const routes = [
  { path: '/', redirect: '/characters' },
  { path: '/characters', component: Characters },
  { path: '/characters/:id', component: Character },
  { path: '/episodes', component: Episodes },
  { path: '/episodes/:id', component: Episode },
]

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

createApp(App)
    .use(Quasar, {
        config: {},
        plugins: {},
    })
    .use(store)
    .use(router)
    .mount("#app");
