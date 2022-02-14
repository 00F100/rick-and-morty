<template>
  <div class="q-pa-md">
    <div class="row justify-center">
      <h1>Rick Sanches</h1>
    </div>
    <div class="row justify-center">
      <div class="col-xs-12 col-sm-7 col-md-4">
        <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" alt="">
      </div>
      <div class="col-xs-12 col-sm-5 col-md-8">
        <div class="row">
          <div class="col-xs-12 col-sm-6">
            Who is Rick Sanches?
            <ul>
                <li>Status: Alive</li>
                <li>Species: Human</li>
                <li>Gender: Male</li>
                <li>Status: Alive</li>
                <li>Origin: unknown</li>
                <li>Location: Citadel of Ricks</li>
            </ul>
          </div>
          <div class="col-xs-12 col-sm-6">
            Episodes
            <ul v-for="index in 10" :key="index">
              <li><a href="javascript:;" @click="changePage(20)">Pilot</a></li>
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
  name: "Character",
  components: {
    ButtonBackToList
  },
  methods: {
    changePage(episode) {
      this.$store.commit("changePage", {
        page: "episode",
        id: episode
      })
    }
  }
};
</script>

<style scoped lang="scss">
.my-card {
  cursor: pointer;
}
</style>