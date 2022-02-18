<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <h1>{{ $t('Characters') }}</h1>
    </div>
    <div class="row"> 
      <div class="col">
        <Filter :text_search="filter" />
      </div>
    </div>
    <div class="row" v-if="!loading">
      <div class="col result-empty" v-if="!result">
        <h5>{{ $t('Result empty') }}</h5>
      </div>
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12" v-else v-for="character in result" :key="character.id">
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
    <div class="row justify-center show-more" v-if="page < pages">
      <q-btn color="white" text-color="black" :label="$t('Show more')" @click="paginate" :disabled="disabled" />
    </div>
  </div>
</template>

<script>
import ButtonBackToList from "./ButtonBackToList.vue"
import Filter from "./Filter.vue"
import Card from "./Card.vue"
import gql from "graphql-tag"

export default {
  name: "Characters",
  components: {
    ButtonBackToList,
    Filter,
    Card
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
    if (this.$store.state.paginate && this.$store.state.paginate.location === "characters") {
      this.page = this.$store.state.paginate.page
      this.pages = this.$store.state.paginate.pages
    }
  },
  beforeMount() {
    this.filter = this.$store.state.filter
    this.updateData()
  },
  methods: {
    paginate() {
      this.disabled = true
      this.page = this.page + 1
      this.updateData(true, true)
    },
    updateData(ignoreCache = false, aggregate = false) {
      
      const query = gql`
        query Characters($page: Int, $filter: String) {
          characters(page: $page, filter: { name: $filter }) {
            info {
              pages
            }
            results {
              id
              name
              image
              species
              status
            }
          }
        }
      `

      this.$repository(
        query,
        this.page,
        this.pages,
        this.loading,
        aggregate,
        this.filter,
        "characters",
        this.disabled,
        ignoreCache,
        this.result,
        (result) => {
          console.log(result.result)
          this.result = result.result
          this.page = result.page
          this.pages = result.pages
          this.disabled = result.disabled
          this.loading = result.loading
        }
      )
    }
  },
  watch: {
    loading() {
      this.$store.commit("loading", this.loading)
    },
    '$store.state.filter'() {
      this.filter = this.$store.state.filter
      this.loading = true
      this.page = 1
      this.updateData(true, false)
    },
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
.result-empty {
  text-align: center;
}
</style>
