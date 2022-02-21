<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <div class="col-md-6 col-sm-6 col-xs-12 image-block">
        <h4>{{ $t('Episode information') }}</h4>
        <img :src="imageUrl">
        <h3>{{ $t(result.name) }}</h3>
        <ul>
            <li>{{ $t('episode-name', { identify: result.episode, name: $t(result.name) }) }}</li>
            <li>{{ $t('episode-date', { month: $t('December'), day: '2', year: '2013' }) }}</li>
        </ul>
      </div>
      <div class="col-md-6 col-sm-6 col-xs-12 characters">
        <h4>{{ $t('Characters') }}</h4>
        <div class="row">
          <div class="col-lg-4 col-md-6 col-xs-12" v-for="character in result.characters" :key="character.id">
            <Card
              :alive="character.status === 'Alive'"
              :dead="character.status === 'Dead'"
              :unknown="character.status === 'unknown'"
              :image="character.image"
              :route="'/characters/' + character.id + '/' + character.name"
              :title="character.name"
              :description="$t(character.species)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ButtonBackToList from "./ButtonBackToList.vue"
import Card from "./Card.vue"
import * as imageExists from "image-exists"

export default {
  name: "Episode",
  components: {
    ButtonBackToList,
    Card
  },
  data() {
    return {
      loading: true,
      imageUrl: "https://via.placeholder.com/248x140",
      result: {
        name: "",
        episode: "",
        image: "",
        air_date: "",
        characters: [
          {
            id: "",
            image: "",
            name: "",
            state: "",
            species: ""
          }
        ]
      }
    }
  },
  created() {
    this.updateData()
  },
  methods: {
    checkImage() {
      const imageUrl = "https://videovak.com/jpg/1178x662/rick_and_morty_" + String(this.result.episode).toLowerCase() + ".jpg"
      imageExists(imageUrl, (exists) => {
        if (exists) {
          this.imageUrl = imageUrl
        }
      })
    },
    updateData() {

      this
        .getRepository()
        .getEpisode(this.$route.params.episode)
    },
    getRepository() {
      return this
        .$repository(
          1,
          "episodes",
          null,
          [],
          (result) => {
            if (result.result.length > 0) {
              const item = result.result.find(x => x.episode === this.$route.params.episode)
              this.result = item
              this.checkImage()
              this.loading = false
            } else {
              this.$router.push('/episodes')
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