<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <div class="col-md-6 col-sm-6 col-xs-12 image-block">
        <h4>{{ $t('Episode information') }}</h4>
        <img src="https://videovak.com/jpg/1178x662/rick_and_morty_s01e01.jpg">
        <h3>{{ $t('Pilot') }}</h3>
        <ul>
            <li>{{ $t('episode-name', { identify: 'S01E01', name: $t('Pilot') }) }}</li>
            <li>{{ $t('episode-date', { month: $t('December'), day: '2', year: '2013' }) }}</li>
        </ul>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12 characters">
        <h4>{{ $t('Characters') }}</h4>
        <div class="row">
          <div class="col-lg-4 col-md-6 col-xs-12" v-for="index in 20" :key="index">
            <Card
                :alive="true"
                image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                :route="'/characters/' + index"
                :title="$t('Rick Sanchez')"
                :description="$t('Human - Earth (C-137)')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ButtonBackToList from "./ButtonBackToList.vue"
import Card from "./Card.vue"

export default {
  name: "Episode",
  components: {
    ButtonBackToList,
    Card
  }
};
</script>

<style scoped lang="scss">
@import '../styles/quasar.variables.sass';
.image-block {
  text-align: center;

  img {
    max-width: 100%;
  }
}
.characters {
  h4 {
    text-align: center;
  }
}
</style>