  import { ApolloClient, InMemoryCache } from "@apollo/client/core"
  
  export default {
  install: (app: any, options: any) => {

    /**
     * Limit of retry request for GraphQL
     */
    const limit = +process.env.VUE_APP_GRAPHQL_RETRY_LIMIT || 5

    /**
     * Cache of request
     */
    const cache = new InMemoryCache()

    /**
     * Apollo client for GraphQL
     */
    const apolloClient = new ApolloClient({
      cache,
      uri: process.env.VUE_APP_GRAPHQL_API,
    })

    /**
     * Method for execute request for GraphQL
     *
     * @param query 
     * @param variables 
     * @param callback 
     * @param counter 
     */
    const apply = (query: any, variables: any, callback: (result: any) => void, counter = 0) => {
      apolloClient.query({
        query,
        variables
      })
      .then(result => {
        callback(result)
      })
      .catch((e: any) => {
        console.log(e)
        if (counter < limit) {
          console.log("GraphQL retry...")
          counter += 1
          apply(query, variables, callback, counter)
        } else {
          counter = 0
          callback([])
        }
      })
    }

    /**
     * Apply $graphql into Vue instance
     *
     * @param query 
     * @param variables 
     * @param callback 
     */
    app.config.globalProperties.$graphql = (query: any, variables: any, callback: (result: any) => void) => {
      apply(query, variables, callback)
    }
  }
}