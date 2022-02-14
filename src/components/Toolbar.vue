<template>
    <q-toolbar>
      <q-toolbar-title @click="$router.push('/')"> Rick and Morty </q-toolbar-title>
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
  }
};
</script>

<style lang="scss">
  .q-toolbar > .q-toolbar__title {
    cursor: pointer;
  }
</style>