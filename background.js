// This script runs in the background.
// It's a good place for listeners and long-running logic.

chrome.runtime.onInstalled.addListener(() => {
  console.log('Custom Site Scripts extension installed!');
});
