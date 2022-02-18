  import { ApolloClient, InMemoryCache } from "@apollo/client/core"
  
  export default {
  install: (app: any, options: any) => {

    let counter = 0
    const limit = +process.env.VUE_APP_GRAPHQL_RETRY_LIMIT || 5

    const cache = new InMemoryCache()

    const apolloClient = new ApolloClient({
      cache,
      uri: process.env.VUE_APP_GRAPHQL_API,
    })

    const apply = (query: any, variables: any, callback: (result: any) => void) => {
      apolloClient.query({
        query,
        variables
      })
      .then(result => {
        counter = 0
        callback(result)
      })
      .catch((e: any) => {
        console.log(e)
        if (counter < limit) {
          console.log("GraphQL retry...")
          counter += 1
          apply(query, variables, callback)
        } else {
          counter = 0
          callback([])
        }
      })
    }

    app.config.globalProperties.$graphql = (query: any, variables: any, callback: (result: any) => void) => {
      apply(query, variables, callback)
    }
  }
}