// Load và hiển thị token
chrome.storage.local.get("authHeader", function (data) {
  const headerDiv = document.getElementById("authHeader");
  const noteDiv = document.getElementById("note");
  const status = document.getElementById("status");
  const copyBtn = document.getElementById("copyBtn");

  const token = data.authHeader || "";

  if (token) {
    headerDiv.textContent = token;
  } else {
    headerDiv.textContent = "No authorization token found.";
    noteDiv.style.display = "block";
    copyBtn.style.display = "none";
  }

  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(token).then(() => {
      status.textContent = "Copied!";
      status.style.cssText = "margin-bottom: 12px; color: green;";
      setTimeout(() => {
        status.textContent = "";
      }, 2000);
    }).catch(() => {
      status.textContent = "Copy Error!";
    });
  });
});

// Lắng nghe sự kiện cập nhật token
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "updateToken") {
    const token = message.token;
    const headerDiv = document.getElementById("authHeader");
    const noteDiv = document.getElementById("note");
    const copyBtn = document.getElementById("copyBtn");
    const status = document.getElementById("status");

    headerDiv.textContent = token;
    noteDiv.style.display = "none";
    copyBtn.style.display = "inline-block";

    copyBtn.onclick = () => {
      navigator.clipboard.writeText(token).then(() => {
        status.textContent = "Copied!";
        setTimeout(() => (status.textContent = ""), 2000);
      }).catch(() => {
        status.textContent = "Copy Error!";
      });
    };
  }
});

// Event listener cho coffee popup
document.addEventListener("DOMContentLoaded", () => {
  const buyCoffeeLink = document.getElementById("buyCoffeeLink");
  const closeCoffeeBtn = document.getElementById("closeCoffee");

  if (buyCoffeeLink) {
    buyCoffeeLink.addEventListener("click", (e) => {
      e.preventDefault();
      showCoffeePopup();
    });
  }

  if (closeCoffeeBtn) {
    closeCoffeeBtn.addEventListener("click", () => {
      document.getElementById("coffeePopup").style.display = "none";
    });
  }

  const reloadLink = document.getElementById("reloadLink");
  if (reloadLink) {
    reloadLink.addEventListener("click", () => {
      chrome.tabs.create({ url: "https://discord.com/channels/@me" });
    });
  }
});

function showCoffeePopup() {
  document.getElementById("coffeePopup").style.display = "block";
}
