import { createApp, provide, h } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import i18n from './plugins/i18n'
import store from "./plugins/store"
import router from "./plugins/router"
import graphql from "./plugins/graphql"

import "@quasar/extras/material-icons/material-icons.css";
import "./styles/quasar.sass";

createApp(App)
  .use(i18n)
  .use(Quasar, {
      config: {},
      plugins: {},
  })
  .use(store)
  .use(router)
  .use(graphql)
  .mount("#app");
