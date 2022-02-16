<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <h1>{{ $t('Characters') }}</h1>
    </div>
    <div class="row"> 
      <div class="col">
        <Filter />
      </div>
    </div>
    <div class="row">
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="index in 20" :key="index">
        <Card
          :alive="true"
          image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
          :route="'/characters/' + index"
          :title="$t('Rick Sanchez')"
          :description="$t('Human - Earth (C-137)')" />
      </div>
    </div>
    <div class="row justify-center show-more">
      <q-btn color="white" text-color="black" :label="$t('Show more')" />
    </div>
  </div>
</template>

<script>
import ButtonBackToList from "./ButtonBackToList.vue"
import Filter from "./Filter.vue"
import Card from "./Card.vue"

export default {
  name: "Characters",
  components: {
    ButtonBackToList,
    Filter,
    Card
  },
  data() {
    return {
      filter: null
    }
  }
};
</script>

<style scoped lang="scss">
@import '../styles/quasar.variables.sass';
.character-card {
  cursor: pointer;
}
.show-more {
  margin: 30px 0 20px 0
}
.state {
  margin: 0 8px 0 0;
}
.q-icon {
  margin: 5px 5px 0 0;
}
.q-card__section {
  padding: 16px 16px 10px 16px;
}
</style>
