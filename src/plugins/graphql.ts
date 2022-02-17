  import { ApolloClient, InMemoryCache } from "@apollo/client/core"
  
  export default {
  install: (app: any, options: any) => {

    const cache = new InMemoryCache()

    const apolloClient = new ApolloClient({
      cache,
      uri: process.env.VUE_APP_GRAPHQL_API,
    })

    app.config.globalProperties.$graphql = (query: any, variables: any, callback: (result: any) => void) => {

      apolloClient.query({
        query,
        variables
      })
      .then(result => {
        callback(result)
      })
      .catch((e: any) => {
        console.log(e)
        callback([])
      })
    }
  }
}