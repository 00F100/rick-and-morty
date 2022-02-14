module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  pages: {
    index: {
      entry: "src/main.ts",
      title:"The Rick and Morty API"
    }
  },
  transpileDependencies: ["quasar"],
};
