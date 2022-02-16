  import { ApolloClient, InMemoryCache } from "@apollo/client/core"
  import { DefaultApolloClient } from '@vue/apollo-composable'
  import gql from 'graphql-tag'
  import { useQuery } from '@vue/apollo-composable'
  
  export default {
  install: (app: any, options: any) => {
    app.config.globalProperties.$graphql = (query: any, variables: any, callback: (result: any) => void) => {

      const cache = new InMemoryCache()

      const apolloClient = new ApolloClient({
        cache,
        uri: 'https://rickandmortyapi.com/graphql',
      })

      // const CHARACTERS_QUERY = gql`
      //   query Characters($page: Int) {
      //     characters(page: $page) {
      //       results {
      //         id
      //         name
      //         image,
      //         species
      //       }
      //     }
      //   }
      // `
      apolloClient.query({
        query,
        variables
      })
      .then(result => {
        callback(result)
      })
      
      // return useQuery(query, variables);
    }
  }
}