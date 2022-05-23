module.exports = {
  chainWebpack: config => {
      config.module
        .rule('worker')
        .test(/\.worker\.js$/)
        .use('worker')
        .loader('worker-loader')
        .options({
          inline: 'fallback'
        })
      config.module.rule('js').exclude.add(/\.worker\.js$/)
      config.output.globalObject('this')
    config.set('externals', {
      echarts: 'echarts',
      // vue: 'Vue',
      // axios: 'axios',
      // 'vue-router': 'VueRouter',
      // lodash: '_',
      // 'element-plus': 'ElementPlus'
    })
    },
    // 解决打包的时报错
    parallel: false,    
}