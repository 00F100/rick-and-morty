<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <div class="col-md-6 col-sm-6 col-xs-12 image-block">
        <h4>{{ $t('Character information') }}</h4>
        <img :src="result.image" />
        <h3>{{ result.name }}</h3>
        <ul>
            <li v-if="result.species !== ''">{{ $t('species', { species: $t(result.species) }) }}</li>
            <li v-if="result.gender !== ''">{{ $t('gender', { gender: $t(result.gender) }) }}</li>
            <li v-if="result.origin && result.origin.name !== ''">{{ $t('origin', { origin: $t(result.origin.name) }) }}</li>
            <li v-if="result.location && result.location.name !== ''">{{ $t('location', { location: $t(result.location.name) }) }}</li>
        </ul>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12 episodes">
        <h4>{{ $t('Episodes') }}</h4>
        <div class="row">
          <div class="col-lg-4 col-md-6" v-for="episode in result.episode" :key="episode.id">
            <EpisodeCard
              :episode="episode.episode"
              :route="'/episodes/' + episode.episode"
              :title="$t('episode-name', { identify: episode.episode, name: $t(episode.name || ' ') })"
              :description="$t('episode-date', getDate(episode))" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ButtonBackToList from "./ButtonBackToList.vue"
import EpisodeCard from "./EpisodeCard"
import gql from "graphql-tag"

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
        episode: {
          name: "",
          episode: "",
          air_date: ""
        }
      }
    }
  },
  created() {
    this.updateData()
  },
  methods: {
    getDate(episode) {
      if (episode.air_date) {
        const air_date = episode.air_date.split(' ')
        this.month = air_date[0]
        this.day = String(air_date[1]).replace(',', '')
        this.year = air_date[2]
      }
      return {
        month: this.$t(this.month),
        day: this.day,
        year: this.year
      }
    },
    updateData() {

      const CHARACTERS_QUERY = gql`
        query Characters($name: String) {
          characters(filter: { name: $name }) {
            results {
              id
              name
              image
              species
              gender
              origin {
                name
              }
              location {
                name
              }
              episode {
                name
                episode
                air_date
              }
            }
          }
        }
      `
      
      this.$graphql(CHARACTERS_QUERY, {
        name: this.$route.params.name
      }, (result) => {

        if (result.data.characters) {
          for( const i in result.data.characters.results) {
            const character = result.data.characters.results[i]
            if (character.id === this.$route.params.id) {
              this.result = character
              this.loading = false
              return
            }
          }
        }
      });
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
</style>