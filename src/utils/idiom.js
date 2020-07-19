function load (callback, errHandler) {
  const idiomList = require('../constants/idiom.json')
  const data = idiomList[Math.floor(Math.random() * idiomList.length)]
  callback(data)
}

export { load }
