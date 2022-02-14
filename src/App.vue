<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <Toolbar />
    </q-header>
    <q-page-container>
      <List v-if="this.$store.state.page == 'list'" />
      <Character v-if="this.$store.state.page == 'character'" />
      <Episode v-if="this.$store.state.page == 'episode'" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import List from "./components/List.vue";
import Character from "./components/Character.vue";
import Episode from "./components/Episode.vue";
import Toolbar from "./components/Toolbar.vue"

export default {
  name: "LayoutDefault",

  components: {
    Toolbar,
    List,
    Character,
    Episode,
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
