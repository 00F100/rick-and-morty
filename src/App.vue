<template>
  <q-layout view="lHh Lpr lFf">
    <Loader v-if="$store.state.loading" />
    <q-header elevated class="glossy">
      <Toolbar />
    </q-header>
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Toolbar from "./components/Toolbar.vue"
import Loader from "./components/Loader.vue"

export default {
  name: "LayoutDefault",

  components: {
    Toolbar,
    Loader
  },
  watch: {
    '$route'(to) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      this.$store.commit("changePage", {
        page: to,
        id: to.params?.id
      })
    }
  }
};
</script>