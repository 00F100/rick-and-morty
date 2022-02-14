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
import { ref } from "vue";
import Toolbar from "./components/Toolbar.vue"

export default {
  name: "LayoutDefault",

  components: {
    Toolbar,
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
