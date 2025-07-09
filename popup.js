function updateBlockCount() {
  chrome.storage.local.get("trackerCount", (data) => {
    document.getElementById('block-count').textContent = data.trackerCount || 0;
  });
}

function loadWhitelist() {
  chrome.storage.local.get(["whitelist"], (result) => {
    const list = result.whitelist || [];
    const ul = document.getElementById("whitelist");
    ul.innerHTML = '';
    list.forEach(domain => {
      const li = document.createElement("li");
      li.textContent = domain;
      ul.appendChild(li);
    });
  });
}

function addToWhitelist() {
  const domain = document.getElementById("domainInput").value.trim();
  if (!domain) return;
  chrome.storage.local.get(["whitelist"], (result) => {
    const list = result.whitelist || [];
    if (!list.includes(domain)) {
      list.push(domain);
      chrome.storage.local.set({ whitelist: list }, () => {
        loadWhitelist();
        alert(domain + " added to whitelist. (Reload extension to apply changes)");
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateBlockCount();
  loadWhitelist();
});
