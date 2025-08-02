let latestToken = null;

chrome.webRequest.onBeforeSendHeaders.addListener(
  (details) => {
    const authHeader = details.requestHeaders.find(h => h.name.toLowerCase() === "authorization");
    if (authHeader) {
      latestToken = authHeader.value;
      chrome.storage.local.set({ authHeader: latestToken });

      chrome.tabs.sendMessage(details.tabId, {
        type: "updateToken",
        token: latestToken
      }, (response) => {
        if (chrome.runtime.lastError) {
          console.warn("Could not send message to tab", details.tabId, chrome.runtime.lastError.message);
        }
      });
    }
  },
  { urls: ["https://discord.com/*"] },
  ["requestHeaders"]
);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getToken") {
    sendResponse({ token: latestToken });
  }
});
