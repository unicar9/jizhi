import Storager from './storager'

function load (callback, errHandler) {
  Storager.get(['cachedIdioms'], res => {
    res = res.cachedIdioms
    if (res) {
      const data = res[Math.floor(Math.random() * res.length)]
      callback(data)
    } else {
      errHandler({ errMessage: '没有缓存的成语，正为您展示本地成语' })
    }
  })
  updateIdioms(data => {
    data = getRandom(data, 10)
    Storager.set({ cachedIdioms: data })
  }, 'https://raw.githubusercontent.com/pwxcoo/chinese-xinhua/master/data/idiom.json')
}

function updateIdioms (callback, apiUrl) {
  var xhr = new XMLHttpRequest()
  xhr.open('get', apiUrl)
  xhr.withCredentials = false
  xhr.responseType = 'json'
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      var data = xhr.response
      if (data) {
        callback(data)
      }
    }
  }
  xhr.send()
}

function getRandom (arr, n) {
  var result = new Array(n)
  var len = arr.length
  var taken = new Array(len)
  if (n > len) {
    throw new RangeError('getRandom: more elements taken than available')
  }
  while (n--) {
    var x = Math.floor(Math.random() * len)
    result[n] = arr[x in taken ? taken[x] : x]
    taken[x] = --len in taken ? taken[len] : len
  }
  return result
}

export { load }
