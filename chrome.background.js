/* eslint-disable no-undef */
chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: 'chrome://newtab' })
})
