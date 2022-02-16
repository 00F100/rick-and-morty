module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },
  pages: {
    index: {
      entry: "src/main.ts",
      title:"The Rick and Morty API"
    }
  },
  transpileDependencies: ["quasar"],
};
