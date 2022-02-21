import { createRouter, createWebHashHistory } from "vue-router"
import Characters from "../components/Characters.vue"
import Character from "../components/Character.vue"
import Episodes from "../components/Episodes.vue"
import Episode from "../components/Episode.vue"

const routes = [
  { path: '/', redirect: '/characters' },
  // List all characters
  { path: '/characters', component: Characters },
  // Get one character by id + name
  { path: '/characters/:id/:name', component: Character },
  // get all episodes
  { path: '/episodes', component: Episodes },
  // get episode by episode tag
  { path: '/episodes/:episode', component: Episode },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})