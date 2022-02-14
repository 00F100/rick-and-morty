<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <Toolbar />
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
// <Characters v-if="this.$store.state.page == 'characters'" />
//       <Episodes v-if="this.$store.state.page == 'episodes'" />
//       <Character v-if="this.$store.state.page == 'character'" />
//       <Episode v-if="this.$store.state.page == 'episode'" />
import { ref } from "vue";
// import Characters from "./components/Characters.vue"
// import Character from "./components/Character.vue"
// import Episodes from "./components/Episodes.vue"
// import Episode from "./components/Episode.vue"
import Toolbar from "./components/Toolbar.vue"

export default {
  name: "LayoutDefault",

  components: {
    Toolbar,
    // Characters,
    // Character,
    // Episodes,
    // Episode,
  },

  setup() {
    return {
      leftDrawerOpen: ref(false),
    };
  },
  data() {
    return {
      list: true
    }
  }
};
</script>
