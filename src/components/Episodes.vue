<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <h1>{{ $t('Episodes') }}</h1>
    </div>
    <div class="row"> 
      <div class="col">
        <Filter />
      </div>
    </div>
    <div class="row">
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="index in 20" :key="index">
        <EpisodeCard
          :episode="index"
          :route="'/episodes/' + index"
          :title="$t('episode-name', { identify: 'S01E01', name: $t('Pilot') })"
          :description="$t('episode-date', { month: $t('December'), day: '2', year: '2013' })" />
      </div>
    </div>
    <div class="row justify-center show-more">
      <q-btn color="white" text-color="black" :label="$t('Show more')" />
    </div>
  </div>
</template>

<script>
import ButtonBackToList from "./ButtonBackToList.vue"
import EpisodeCard from "./EpisodeCard"
import Filter from "./Filter.vue"

export default {
  name: "Episodes",
  components: {
    ButtonBackToList,
    EpisodeCard,
    Filter
  },
  data() {
    return {
      filter: null
    }
  },
};
</script>

<style scoped lang="scss">
@import '../styles/quasar.variables.sass';
.show-more {
  margin: 30px 0 20px 0
}
.state {
  margin: 0 8px 0 0;
}
.q-icon {
  margin: 5px 5px 0 0;
}
</style>