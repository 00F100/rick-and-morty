<template>
  <div class="q-pa-md">
    <ButtonBackToList />
    <div class="row justify-center">
      <h1>{{ $t('Characters') }}</h1>
    </div>
    <div class="row"> 
      <div class="col">
        <Filter />
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
          :route="'/characters/' + character.name"
          :title="$t(character.name)"
          :description="$t(character.species)" />
      </div>
    </div>
    <div class="row justify-center show-more" v-if="pagination">
      <q-btn color="white" text-color="black" :label="$t('Show more')" @click="paginate" :disabled="disabled" />
    </div>
  </div>
</template>

<script>
import ButtonBackToList from "./ButtonBackToList.vue"
import Filter from "./Filter.vue"
import Card from "./Card.vue"

import gql from 'graphql-tag'
// import { useQuery } from '@vue/apollo-composable'

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
      pagination: true,
      loading: true,
      disabled: false,
      result: [],
      filter: null
    }
  },
  mounted() {
    this.updateData()
  },
  methods: {
    paginate() {
      this.disabled = true
      this.page = this.page + 1
      this.updateData()
    },
    updateData() {

      const CHARACTERS_QUERY = gql`
        query Characters($page: Int) {
          characters(page: $page) {
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
        page: this.page
      }, (result) => {
        console.log(result.data.characters)
        this.result = [ ... this.result, ... result.data.characters.results]
        this.pages = result.data.characters.info.pages || 1
        this.loading = false
        this.disabled = false
        if (this.page >= this.pages) {
          this.pagination = false
        } else {
          this.pagination = true
        }
      });
      // this.$graphql('okok')
      // const { result, loading, error } = useQuery(CHARACTERS_QUERY, {
      //   page: this.page
      // });
      // this.loading = loading
      // this.result = result
    }
  },
  watch: {
    loading() {
      this.$store.commit("loading", this.loading)
    }
  }
  // setup() {
  //   const CHARACTERS_QUERY = gql`
  //     query Characters($page: Int) {
  //       characters(page: $page) {
  //         results {
  //           id
  //           name
  //           image,
  //           species
  //         }
  //       }
  //     }
  //   `
  //   const { result, loading, error } = useQuery(CHARACTERS_QUERY, {
  //     page: 1
  //   });
    
  //   return {
  //     result,
  //     loading,
  //     error
  //   }
  // },
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
