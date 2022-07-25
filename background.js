let color = '#ff0000';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Hello background color set to %cgreen', `color: ${color}`);
});
