module.exports = {
  resource: {
    scheme: 'http',
    host: 'localhost',
    port: 8082
  },
  build: (info) => {
    return `${info.scheme}://${info.host}:${info.port}`
  }
}