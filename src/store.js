import storeS3 from './plugins/store-s3.js'

const storePlugin = process.env.STORE_PLUGIN

let store

if (storePlugin && storePlugin !== 's3') {
  const plugin = await import(storePlugin)
  store = plugin
} else {
  store = storeS3
}

export default store