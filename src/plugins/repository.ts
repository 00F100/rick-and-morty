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
        ) => void,
        cache = true
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
            if (result.data[location].info) {
              _result.pages = result.data[location].info.pages || 1
            } else {
              _result.pages = 1
            }
            if (cache) {
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
            }
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

        /**
         * Method for get one character by name
         *
         * @param name Name of character
         */
        getCharacter(name: string) {
          const query = gql`
            query Characters($filter: String) {
              characters(filter: { name: $filter }) {
                results {
                  id
                  name
                  image
                  species
                  gender
                  origin {
                    name
                  }
                  location {
                    name
                  }
                  episode {
                    name
                    episode
                    air_date
                  }
                }
              }
            }
          `

          execute(query, false, name, callback, false)
        },

        /**
         * Method for get episodes from GraphQL
         * 
         * @param aggregate 
         * @param filter 
         * @returns 
         */
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
        },

        getEpisode(episode: string) {
          const query = gql`
            query Episodes($filter: String) {
              episodes(filter: { episode: $filter }) {
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

          execute(query, false, episode, callback, false)
        }
      }
    }
  }
}