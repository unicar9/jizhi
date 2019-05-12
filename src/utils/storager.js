let storageLocal = {
  name: 'localStorage',
  set: (obj, callback) => {
    const key = Object.keys(obj)[0]
    const output = {}
    output[key] = obj[key]
    const value = JSON.stringify(output)
    localStorage.setItem(key, value)
    callback()
  },
  get: (keys, callback) => {
    // TODO: refactor
    let res = localStorage.getItem(keys[0])
    res = JSON.parse(res) || {}
    callback(res)
  }
}
// eslint-disable-next-line no-undef
let storager = process.env.NODE_ENV === 'development' ? storageLocal : chrome.storage.sync

export default storager
