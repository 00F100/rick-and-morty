<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <div class="col-md-6 col-sm-6 col-xs-12 image-block">
        <h4>{{ $t('Character information') }}</h4>
        <img :src="result.image" />
        <h3>{{ result.name }}</h3>
        <ul>
            <li v-if="result.species !== ''">{{ $t('species', { species: result.species }) }}</li>
            <li v-if="result.gender !== ''">{{ $t('gender', { gender: result.gender }) }}</li>
            <li v-if="result.origin && result.origin.name !== ''">{{ $t('origin', { origin: result.origin.name }) }}</li>
            <li v-if="result.location && result.location.name !== ''">{{ $t('location', { location: result.location.name }) }}</li>
        </ul>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12 episodes">
        <h4>{{ $t('Episodes') }}</h4>
        <div class="row">
          <div class="col-lg-4 col-md-6 block-episodes" v-for="episode in result.episode" :key="episode.id">
            <EpisodeCard
              :episode="episode.episode"
              :route="'/episodes/' + episode.episode"
              :title="$t('episode-name', { identify: episode.episode, name: episode.name })"
              :description="episode.air_date" />
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
  data() {
    return {
      month: "",
      day: "",
      year: "",
      loading: true,
      result: {
        image: "",
        name: "",
        state: "",
        species: "",
        gender: "",
        origin: {
          name: ""
        },
        location: {
          name: ""
        },
        episode: [
          {
            name: "",
            episode: "",
            air_date: ""
          }
        ]
      }
    }
  },
  created() {
    this.updateData()
  },
  methods: {
    updateData() {

      this
        .getRepository()
        .getCharacter(this.$route.params.name)
    },
    getRepository() {
      return this
        .$repository(
          1,
          "characters",
          null,
          [],
          (result) => {
            if (result.result.length > 0) {
              const item = result.result.find(x => x.id === this.$route.params.id)
              this.result = item
              this.loading = false
            } else {
              this.$router.push('/characters')
            }
          }
        )
    }
  },
  watch: {
    loading() {
      this.$store.commit("loading", this.loading)
    }
  }
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
.block-episodes {
  width: 100%
}
</style>