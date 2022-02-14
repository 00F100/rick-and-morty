<template>
    <div class="q-pa-md">
      <div class="row justify-center">
        <h1>Pilot</h1>
      </div>
      <div class="row justify-center">
        <div class="col-xs-12 col-sm-7 col-md-4">
          <img src="https://videovak.com/jpg/1178x662/rick_and_morty_s01e01.jpg" class="episode-image" alt="">
        </div>
        <div class="col-xs-12 col-sm-5 col-md-8">
          <div class="row">
            <div class="col-xs-12 col-sm-6">
              Episode information
              <ul>
                  <li>episode: S01E01</li>
                  <li>Air date: December 2, 2013</li>
              </ul>
            </div>
            <div class="col-xs-12 col-sm-6">
              Characters
              <ul v-for="index in 10" :key="index">
                <li><a href="javascript:;" @click="changePage(20)">Rick Sanchez</a></li>
              </ul>
            </div>
          </div>
        </div>
        <ButtonBackToList />
      </div>
    </div>
</template>

<script>

import ButtonBackToList from "./ButtonBackToList.vue"

export default {
  name: "Episode",
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
.my-card {
  cursor: pointer;
}
.episode-image {
  max-width: 320px;
}
</style>