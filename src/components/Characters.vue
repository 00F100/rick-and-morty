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
          :alive="true"
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
    if (this.$store.state.paginate) {
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
      const cache = this.$store.state.characters
      if (!ignoreCache && cache.result && cache.result.length > 0) {
        this.result = cache.result
        this.page = cache.page
        this.pages = cache.pages
        this.loading = false
        return
      }

      const CHARACTERS_QUERY = gql`
        query Characters($page: Int, $filter: String) {
          characters(page: $page, filter: { name: $filter }) {
            info {
              pages
            }
            results {
              id
              name
              image,
              species
            }
          }
        }
      `

      this.$graphql(CHARACTERS_QUERY, {
        page: this.page,
        filter: this.filter
      }, (result) => {
        if (result.data) {
          if (aggregate) {
            this.result = [ ... this.result, ... result.data.characters.results]
          } else {
            this.result = result.data.characters.results
          }
          this.pages = result.data.characters.info.pages || 1
          this.$store.commit("cacheCaracter", {
            result: this.result,
            page: this.page,
            pages: this.pages
          })
          this.$store.commit("paginate", {
            page: this.page,
            pages: this.pages
          })
          this.loading = false
          this.disabled = false
        } else {
          this.result = null
          this.loading = false
        }
      });
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
