<template>
    <q-toolbar>
      <q-toolbar-title @click="$router.push('/')"> Rick and Morty </q-toolbar-title>
      <q-select v-model="model" :options="options" />
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
@import '../styles/quasar.variables.sass';
.q-toolbar {
  .q-toolbar__title {
    cursor: pointer;
  }
}
.q-field__native {
  span {
    color: $white !important;
  }
}
.q-field__append {
  i {
    color: $white !important;
  }
}
</style>