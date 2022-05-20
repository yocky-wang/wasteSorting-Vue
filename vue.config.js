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
    },
    // 解决打包的时报错
    parallel: false,
    
}