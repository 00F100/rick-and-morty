<template>
    <q-toolbar>
        <q-toolbar-title @click="changePage"> Rick and Morty </q-toolbar-title>
      </q-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
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