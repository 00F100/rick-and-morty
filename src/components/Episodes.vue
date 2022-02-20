<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <h1>{{ $t('Episodes') }}</h1>
    </div>
    <div class="row"> 
      <div class="col">
        <Filter :text_search="filter" location="episodes" />
      </div>
    </div>
    <div class="row" v-if="!loading">
      <div class="col result-empty" v-if="!result || result.length === 0">
        <h5>{{ $t('Result empty') }}</h5>
      </div>
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12" v-else v-for="episode in result" :key="episode.id">
        <EpisodeCard
          :episode="episode.episode"
          :route="'/episodes/' + episode.episode"
          :title="$t('episode-name', { identify: episode.episode, name: $t(episode.name) })"
          :description="episode.air_date" />
      </div>
    </div>
    <div class="row justify-center show-more" v-if="page < pages">
      <q-btn color="white" text-color="black" :label="$t('Show more')" @click="paginate" :disabled="disabled" />
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
      page: 1,
      pages: 1,
      loading: true,
      disabled: false,
      result: [],
      filter: null
    }
  },
  beforeCreate() {
    if (this.$store.state.paginate && this.$store.state.paginate.location === "episodes") {
      this.page = this.$store.state.paginate.page
      this.pages = this.$store.state.paginate.pages
    }
  },
  beforeMount() {
    this.filter = null
    if (this.$store.state.filter && this.$store.state.filter.location === "episodes") {
      this.filter = this.$store.state.filter.filter
    }
    this.updateData()
  },
  methods: {
    paginate() {
      this.disabled = true
      this.page = this.page + 1
      this.updateData(true, true)
    },
    updateData(ignoreCache = false, aggregate = false) {

      this
        .getRepository(ignoreCache)
        .getEpisodes(
          aggregate,
          this.filter
        )
    },
    getRepository(ignoreCache = false) {
      return this
        .$repository(
          this.page,
          "episodes",
          ignoreCache,
          this.result,
          (result) => {
            this.result = result.result
            this.page = result.page
            this.pages = result.pages
            this.disabled = false
            this.loading = false
          }
        )
    }
  },
  watch: {
    loading() {
      this.$store.commit("loading", this.loading)
    },
    '$store.state.filter'() {
      if (this.filter !== this.$store.state.filter.filter) {
        this.filter = this.$store.state.filter.filter
        this.loading = true
        this.page = 1
        this.updateData(true, false)
      }
    },
  }
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