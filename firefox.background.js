/* eslint-disable no-undef */
browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({});
});
