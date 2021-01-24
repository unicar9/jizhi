/*
Copyright 2019 今日诗词

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// 今日诗词 V2 NPM-SDK 1.0.0
// 今日诗词API 是一个可以免费调用的诗词接口：https://www.jinrishici.com

const keyName = 'jinrishici-token'

const load = (callback, errHandler) {
  if (window.localStorage && window.localStorage.getItem(keyName)) {
    return commonLoad(callback, errHandler, window.localStorage.getItem(keyName))
  } else {
    return corsLoad(callback, errHandler)
  }
}


const corsLoad = (callback, errHandler) => {
  const newCallBack = function (result) {
    window.localStorage.setItem(keyName, result.token)
    callback(result)
  }
  return sendRequest(newCallBack, errHandler, 'https://v2.jinrishici.com/one.json?client=npm-sdk/1.0')
}

const commonLoad = (callback, errHandler, token) => {
  return sendRequest(callback, errHandler, 'https://v2.jinrishici.com/one.json?client=npm-sdk/1.0&X-User-Token=' + encodeURIComponent(token))
}

const sendRequest = (callback, errHandler, apiUrl) => {
  const xhr = new XMLHttpRequest()
  xhr.open('get', apiUrl)
  xhr.withCredentials = true
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let data = xhr.responseText ? JSON.parse(xhr.responseText) : { errMessage: '无法获取诗词，请检查网络连接，正为您显示本地诗词...' }
      if (data.status === 'success') {
        callback(data)
      } else {
        if (errHandler) {
          errHandler(data)
        } else {
          console.error('今日诗词API加载失败，错误原因：' + data.errMessage)
        }
      }
    }
  }
}

export { load }
