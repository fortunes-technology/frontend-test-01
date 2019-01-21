module.exports = {
  outputDir: 'dist',
  devServer: {
    proxy: {
      '/api/': {
        target: 'https://www.googleapis.com',
        changeOrigin: true,
        pathRewrite: { '^/api/': '' }
      }
    }
  }
}
