const storageLocal = {
  name: 'localStorage',
  set: (obj, callback) => {
    const key = Object.keys(obj)[0]
    const output = {}
    output[key] = obj[key]
    const value = JSON.stringify(output)
    localStorage.setItem(key, value)
    if (callback) callback()
  },
  get: (keys, callback) => {
    let resOutput = {}
    keys.forEach(key => {
      let result = localStorage.getItem(key)
      result = JSON.parse(result) || {}
      resOutput = { ...resOutput, ...result }
    })

    if (callback) callback(resOutput)
  }
}

// Default using: chrome.storage.sync
// eslint-disable-next-line no-undef
const storager = process.env.NODE_ENV === 'development' ? storageLocal : chrome.storage.sync

export default storager
