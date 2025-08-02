let tokenSpan = null;

function createOrUpdateTokenSpan(token) {
  if (!tokenSpan) {
    tokenSpan = document.createElement('span');
    tokenSpan.classList.add('discord-auth-token');
    tokenSpan.style.position = 'fixed';
    tokenSpan.style.bottom = '10px';
    tokenSpan.style.right = '10px';
    tokenSpan.style.backgroundColor = 'rgba(0,0,0,0.7)';
    tokenSpan.style.color = 'white';
    tokenSpan.style.padding = '6px 12px';
    tokenSpan.style.borderRadius = '6px';
    tokenSpan.style.zIndex = 999999;
    tokenSpan.style.fontSize = '12px';
    tokenSpan.style.maxWidth = '300px';
    tokenSpan.style.wordBreak = 'break-all';
    tokenSpan.style.cursor = 'default';
    document.body.appendChild(tokenSpan);
  }
  tokenSpan.textContent = `${token}`;
}

// Khi nhận message từ background
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "updateToken" && message.token) {
    createOrUpdateTokenSpan(message.token);
  }
});

// Khi content script mới chạy, gửi message hỏi token (nếu đã có)
chrome.runtime.sendMessage({ type: "getToken" }, (response) => {
  if (response && response.token) {
    createOrUpdateTokenSpan(response.token);
  }
});
