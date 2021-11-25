const storeS3 = require('./plugins/store-s3.js')

const storePlugin = process.env.STORE_PLUGIN

let store

if (storePlugin && storePlugin !== 's3') {
  const plugin = require(storePlugin)
  store = plugin
} else {
  store = storeS3
}

module.exports = store