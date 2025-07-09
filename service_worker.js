chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ trackerCount: 0 });
});

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  chrome.storage.local.get("trackerCount", (data) => {
    let count = data.trackerCount || 0;
    chrome.storage.local.set({ trackerCount: count + 1 });
  });
});
