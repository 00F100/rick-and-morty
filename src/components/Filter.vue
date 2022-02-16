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
  ],
  data() {
    return {
      filter: null
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