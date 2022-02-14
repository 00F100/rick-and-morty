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

const routes = [
  { path: '/', redirect: '/characters' },
  { path: '/characters', component: Characters },
  { path: '/characters/:id', component: Character },
  { path: '/episodes', component: Episodes },
  { path: '/episodes/:episode', component: Episode },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

let currentPage = "characters"
let currentId = null
let currentLoading = false

const currentUrl = window.location.href
const hash = currentUrl.split("#")
if (hash.length == 2) {
  currentPage = "/" + hash[1].substr(1)
  if (currentPage.indexOf("/") > -1) {
    const partial = currentPage.split("/")
    currentId = partial[1]
  }
  currentLoading = true
}

const store = createStore({
  state: {
    page: currentPage,
    loading: currentLoading,
    current: currentId,
  },
  mutations: {
    changePage(state, payload) {
      state.page = payload.page
      state.current = payload.id
      state.loading = true
      window.scrollTo(0,0)
      router.push(payload.page)
    },
    finishLoader(state) {
      state.loading = false
    }
  }
})

createApp(App)
    .use(Quasar, {
        config: {},
        plugins: {},
    })
    .use(store)
    .use(router)
    .mount("#app");
