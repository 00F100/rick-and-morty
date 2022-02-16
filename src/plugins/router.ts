import { createRouter, createWebHashHistory } from "vue-router"
import Characters from "../components/Characters.vue"
import Character from "../components/Character.vue"
import Episodes from "../components/Episodes.vue"
import Episode from "../components/Episode.vue"

const routes = [
  { path: '/', redirect: '/characters' },
  { path: '/characters', component: Characters },
  { path: '/characters/:id', component: Character },
  { path: '/episodes', component: Episodes },
  { path: '/episodes/:id', component: Episode },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})