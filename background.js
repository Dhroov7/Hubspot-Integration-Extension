chrome.commands.onCommand.addListener(async function (command) {
  if (command === "insert_text") {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    await chrome.tabs.sendMessage(tab.id, {url: tab.url});
  }
});

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
  if (request.action === "getPortalId") {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    await chrome.tabs.sendMessage(tab.id, {url: tab.url});
  }
});