<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <div class="col-md-6 col-sm-6 col-xs-12 image-block">
        <h4>{{ $t('Character information') }}</h4>
        <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg">
        <h3>{{ $t('Rick Sanchez') }}</h3>
        <ul>
            <li>{{ $t('state', { state: $t('Alive') }) }}</li>
            <li>{{ $t('species', { specie: $t('Human') }) }}</li>
            <li>{{ $t('gender', { gender: $t('Male') }) }}</li>
            <li>{{ $t('origin', { origin: $t('unknown') }) }}</li>
            <li>{{ $t('location', { location: $t('Citadel of Ricks') }) }}</li>
        </ul>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12 episodes">
        <h4>{{ $t('Episodes') }}</h4>
        <div class="row">
          <div class="col-lg-4 col-md-6" v-for="index in 20" :key="index">
            <EpisodeCard
              :episode="index"
              :route="'/episodes/' + index"
              :title="$t('episode-name', { identify: 'S01E01', name: $t('Pilot') })"
              :description="$t('episode-date', { month: $t('December'), day: '2', year: '2013' })" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ButtonBackToList from "./ButtonBackToList.vue"
import EpisodeCard from "./EpisodeCard"

export default {
  name: "Character",
  components: {
    ButtonBackToList,
    EpisodeCard
  },
};
</script>

<style scoped lang="scss">
.image-block {
  text-align: center;

  img {
    max-width: 100%;
  }
}
.episodes {
  h4 {
    text-align: center;
  }
}
</style>