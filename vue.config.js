const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,//去掉打包出的map文件
  lintOnSave: false,
  transpileDependencies: true,
  devServer: {
    host: 'localhost', port: 8080,
    //代理跨域
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite:{'^/api':''}
      }
    }
  },
})
