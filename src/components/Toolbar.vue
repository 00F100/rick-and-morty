<template>
    <q-toolbar>
      <q-toolbar-title @click="home"> {{ $t('Rick and Morty') }} </q-toolbar-title>
      <q-select v-model="model" :options="options" />
    </q-toolbar>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
      model: "English",
      options: [
        {
          label: "English",
          value: "en"
        },
        {
          label: "Português",
          value: "pt-BR"
        },
        {
          label: "Español",
          value: "es"
        }
      ]
    }
  },
  methods: {
    home() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      this.$router.push('/')
    }
  },
  watch: {
    model() {
      this.$i18n.locale = this.model.value
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