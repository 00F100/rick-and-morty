<template>
    <q-toolbar>
      <q-toolbar-title @click="changePage"> Rick and Morty </q-toolbar-title>
      <q-select v-model="model" :options="options" label="Language" />
    </q-toolbar>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "Toolbar",
  data() {
    return {
      model: "English",
      options: ["English", "Português"]
    }
  },
  methods: {
    changePage() {
      this.$store.commit("changePage", {
        page: "list",
      })
    }
  }
};
</script>

<style lang="scss">
  .q-toolbar > .q-toolbar__title {
    cursor: pointer;
  }
</style>