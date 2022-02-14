<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <h1>Characters</h1>
    </div>
    <div class="row justify-center items-start q-gutter-md">
      <q-card class="character-card" @click="changePage(20)" v-for="index in 20" :key="index">
        <q-card-section>
          <div class="row">
            <div class="col">
              <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" class="character-image" alt="">
            </div>
          </div>
          <div class="row">
            <div class="col-10">
              <p class="name">Rick Sanchez</p>
              <small>Human - Earth (C-137)</small>
            </div>
            <div class="col-2">
              <div class="row">
                <div class="col-12">
                  <q-icon name="emoji_people" class="float-right" />
                  <!-- <q-icon name="portrait" class="float-right" /> -->
                </div>
                <div class="col-12">
                  <!-- <small class="float-right state">in memoriam</small> -->
                  <small class="float-right state">alive</small>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="row justify-center show-more">
      <q-btn color="white" text-color="black" label="Show more" />
    </div>
  </div>
</template>

<script>
import ButtonBackToList from "./ButtonBackToList.vue"

export default {
  name: "Characters",
  components: {
    ButtonBackToList
  },
  methods: {
    changePage(character) {
      this.$store.commit("changePage", {
        page: "character",
        id: character
      })
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
.name {
  margin: 0;
  font-size: 1.3rem;
}
@media (max-width: $breakpoint-xs-max) {
  .character-image {
    width: inherit;
  }
}
@media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm-max) {
  .character-image {
    width: 220px;
  }
}
</style>