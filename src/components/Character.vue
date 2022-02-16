<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <h1>{{ $t('Rick Sanches') }}</h1>
    </div>
    <div class="row justify-center">
      <div class="col image-block">
        <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg">
      </div>
      <div class="col">
        <h4>{{ $t('who-is-name', {name: 'Rick Sanches'}) }}</h4>
        <ul>
            <li>{{ $t('state', { state: $t('Alive') }) }}</li>
            <li>{{ $t('species', { specie: $t('Human') }) }}</li>
            <li>{{ $t('gender', { gender: $t('Male') }) }}</li>
            <li>{{ $t('origin', { origin: $t('unknown') }) }}</li>
            <li>{{ $t('location', { location: $t('Citadel of Ricks') }) }}</li>
        </ul>
      </div>
      <div class="col">
        <h4>{{ $t('Episodes') }}</h4>
        <div v-for="index in 20" :key="index">
          <EpisodeCard
            :episode="index"
            :route="'/episodes/' + index"
            :title="$t('episode-name', { identify: 'S01E01', name: $t('Pilot') })"
            :description="$t('episode-date', { month: $t('December'), day: '2', year: '2013' })" />
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