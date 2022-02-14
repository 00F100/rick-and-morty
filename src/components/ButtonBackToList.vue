<template>
    <div class="col-12">
      <router-link to="/characters" v-if="this.$store.state.page != '/characters'">
        <q-btn color="white" text-color="black" label="Characters List" @click="changePageCharacters" />
      </router-link>
      <router-link to="/episodes" v-if="this.$store.state.page != '/episodes'">
        <q-btn color="white" text-color="black" label="Episodes List" @click="changePageEpisodes" />
      </router-link>
    </div>
</template>

<script>
export default {
  name: "ButtonBackToList",
  methods: {
    changePageCharacters() {
      this.$store.commit("changePage", {
        page: "/characters",
      })
    },
    changePageEpisodes() {
      this.$store.commit("changePage", {
        page: "/episodes",
      })
    }
  }
};
</script>