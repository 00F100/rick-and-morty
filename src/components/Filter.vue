<template>
  <q-input filled v-model="filter" :label="$t('Filter')" class="input-filter">
    <template v-if="filter" v-slot:append>
      <q-icon name="cancel" @click.stop="filter = null" class="cursor-pointer cancel-filter" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: "Filter",
  props: [
    "text_search"
  ],
  data() {
    return {
      filter: null,
      timeout: null
    }
  },
  created() {
    if (this.text_search) {
      this.filter = this.text_search
    }
  },
  watch: {
    filter() {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.timeout = setTimeout(() => {
        this.$store.commit("filter", this.filter)
      }, +process.env.VUE_APP_TIMEOUT_FILTER)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../styles/quasar.variables.sass';
.cancel-filter {
  font-size: 1.6rem;
}
.input-filter {
  padding: 0 10px 30px 10px;
}
</style>