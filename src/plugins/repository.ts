  import { DocumentNode } from "graphql"
  import gql from "graphql-tag"
  
  export default {

  /**
   * Install plugin for consume data GraphQL
   *
   * @param app Vue application
   * @param options Plugin options
   */
  install: (app: any, options: any) => {

    /**
     * Vue Instance
     */
    const vue = app.config.globalProperties

    /**
     * Repository instance for get datasource information
     *
     * @param page Current page
     * @param pages Total of pages
     * @param location Location of schema in GraphQL
     * @param ignoreCache Ignore prev cache
     * @param currentData Current data
     * @param callback Callback function for populate data
     */
    vue.$repository = (
      page: number,
      location: string,
      ignoreCache: boolean,
      currentData: [],
      callback: (
        result: {
          result: any[],
          page: number,
          pages: number
        }
      ) => void
    ) => {

      /**
       * Method to get cache of request
       *
       * @returns Return data from cache
       */
      const getCache = (): { result: any[], page: number, pages: number } | null => {
        const cache = vue.$store.state.cache
        if (!ignoreCache && cache && cache.result && cache.result.length > 0) {
          if (cache.location === location) {
            return {
              result: cache.result,
              page: cache.page,
              pages: cache.pages
            }
          } else {
            vue.$store.commit("cache", null)
          }
        }
        return null
      }

      /**
       * Method for execute call on GraphQL
       *
       * @param query Query for GraphQL
       * @param aggregate Aggregate next data on current data
       * @param filter Filter for apply in request to GraphQL
       * @param callback Callback for populate data
       */
      const execute = (
        query: DocumentNode,
        aggregate: boolean,
        filter: string,
        callback: (
          result: {
            result: any[],
            page: number,
            pages: number
          }
        ) => void
      ) => {

        /**
         * Default data for frontend
         */
        const _result: {
          result: any[],
          page: number,
          pages: number
        } = {
          result: [],
          page: 1,
          pages: 1
        }

        /**
         * Consume plugin GraphQL for get data
         */
        vue.$graphql(query, {
          page: page,
          filter: filter
        }, (result: any) => {
          if (result.data) {
            if (aggregate) {
              _result.result = [ ... currentData, ... result.data[location].results]
            } else {
              _result.result = result.data[location].results
            }
            _result.page = page
            _result.pages = result.data[location].info.pages || 1
            vue.$store.commit("cache", {
              location,
              result: _result.result,
              page: page,
              pages: _result.pages
            })
            vue.$store.commit("paginate", {
              page: page,
              pages: _result.pages,
              location
            })
          } else {
            _result.result = []
          }
          callback(_result)
        });
      }

      return {
        /**
         * Method for get characters from GraphQL
         *
         * @param aggregate Aggregate result with current data
         * @param filter Filter data
         * @returns 
         */
        getCharacters(
          aggregate: boolean,
          filter: string,
        ) {
          const cache = getCache()
          if(cache) {
            callback(cache)
            return
          }

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

          execute(query, aggregate, filter, callback)          
        },

        getEpisodes(
          aggregate: boolean,
          filter: string,
        ) {
          const cache = getCache()
          if(cache) {
            callback(cache)
            return
          }

          const query = gql`
          query Episodes($page: Int, $filter: String) {
            episodes(page: $page, filter: { name: $filter }) {
              info {
                pages
              }
              results {
                id
                name
                air_date
                episode
                characters {
                  id
                  name
                  image
                  species
                  status
                }
              }
            }
          }
          `

          execute(query, aggregate, filter, callback)  
        }
      }
    }

    // vue.$repository = (
    //   query: DocumentNode,
    //   page: number,
    //   pages: number,
    //   loading: boolean,
    //   aggregate: boolean,
    //   filter: string,
    //   location: string,
    //   disabled: boolean,
    //   ignoreCache: boolean,
    //   currentData: [],
    //   callback: (
    //     result: {
    //       result: any[],
    //       page: number,
    //       pages: number,
    //       loading: boolean,
    //       disabled: boolean
    //     }
    //   ) => void
    // ) => {
      // const cache = vue.$store.state.cache
      // if (!ignoreCache && cache && cache.result && cache.result.length > 0) {
      //   if (cache.location === location) {
      //     callback({
      //       result: cache.result,
      //       page: cache.page,
      //       pages: cache.pages,
      //       disabled: false,
      //       loading: false
      //     })
      //     return
      //   } else {
      //     vue.$store.commit("cache", null)
      //   }
      // }

      // const _result: any = {
      //   result: [],
      //   page,
      //   pages,
      //   loading,
      //   disabled
      // }

      // vue.$graphql(query, {
      //   page: page,
      //   filter: filter
      // }, (result: any) => {
      //   if (result.data) {
      //     if (aggregate) {
      //       _result.result = [ ... currentData, ... result.data[location].results]
      //     } else {
      //       _result.result = result.data[location].results
      //     }
      //     _result.pages = result.data[location].info.pages || 1
      //     vue.$store.commit("cache", {
      //       location,
      //       result: _result.result,
      //       page: _result.page,
      //       pages: _result.pages
      //     })
      //     vue.$store.commit("paginate", {
      //       page: _result.page,
      //       pages: _result.pages,
      //       location
      //     })
      //     _result.loading = false
      //     _result.disabled = false
      //   } else {
      //     _result.result = null
      //     _result.loading = false
      //   }
      //   callback(_result)
      // });
    // }
  }
}