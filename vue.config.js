const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})
module.rules = {
  test: /.pug$/,
  loader: 'pug-plain-loader'
}
