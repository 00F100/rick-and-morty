  import { DocumentNode } from "graphql"
  
  export default {
  install: (app: any, options: any) => {

    const vue = app.config.globalProperties

    vue.$repository = (
      query: DocumentNode,
      page: number,
      pages: number,
      loading: boolean,
      aggregate: boolean,
      filter: string,
      location: string,
      disabled: boolean,
      ignoreCache: boolean,
      currentData: [],
      callback: (
        result: {
          result: any[],
          page: number,
          pages: number,
          loading: boolean,
          disabled: boolean
        }
      ) => void
    ) => {
      const cache = vue.$store.state.cache
      if (!ignoreCache && cache && cache.result && cache.result.length > 0) {
        if (cache.location === location) {
          callback({
            result: cache.result,
            page: cache.page,
            pages: cache.pages,
            disabled: false,
            loading: false
          })
          return
        } else {
          vue.$store.commit("cache", null)
        }
      }

      const _result: any = {
        result: [],
        page,
        pages,
        loading,
        disabled
      }

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
          _result.pages = result.data.characters.info.pages || 1
          vue.$store.commit("cache", {
            location: "characters",
            result: _result.result,
            page: _result.page,
            pages: _result.pages
          })
          vue.$store.commit("paginate", {
            page: _result.page,
            pages: _result.pages,
            location
          })
          _result.loading = false
          _result.disabled = false
        } else {
          _result.result = null
          _result.loading = false
        }
        callback(_result)
      });
    }
  }
}