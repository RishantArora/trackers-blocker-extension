
function loadTrackerBlockCount() {
  chrome.storage.local.get("trackerCount", (data) => {
    const countDisplay = document.getElementById('block-count');
    countDisplay.textContent = data.trackerCount || 0;
  });
}


function renderWhitelist() {
  chrome.storage.local.get(["whitelist"], (data) => {
    const whitelistArray = data.whitelist || [];
    const whitelistContainer = document.getElementById("whitelist");

    whitelistContainer.innerHTML = '';

    whitelistArray.forEach((domain) => {
      const listItem = document.createElement("li");
      listItem.textContent = domain;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.className = "remove-btn";
      deleteButton.onclick = () => removeDomainFromWhitelist(domain);

      listItem.appendChild(deleteButton);
      whitelistContainer.appendChild(listItem);
    });
  });
}


function addDomainToWhitelist() {
  const inputField = document.getElementById("domainInput");
  const newDomain = inputField.value.trim();

  if (!newDomain) return;

  chrome.storage.local.get(["whitelist"], (data) => {
    const currentList = data.whitelist || [];

    if (!currentList.includes(newDomain)) {
      currentList.push(newDomain);

      chrome.storage.local.set({ whitelist: currentList }, () => {
        renderWhitelist();
        alert(`${newDomain} added to whitelist. (Reload extension to apply changes)`);
        inputField.value = ''; 
      });
    }
  });
}


function removeDomainFromWhitelist(domainToRemove) {
  chrome.storage.local.get(["whitelist"], (data) => {
    let updatedList = (data.whitelist || []).filter(
      (domain) => domain !== domainToRemove
    );

    chrome.storage.local.set({ whitelist: updatedList }, () => {
      renderWhitelist();
      alert(`${domainToRemove} removed from whitelist.`);
    });
  });
}


document.addEventListener("DOMContentLoaded", () => {

  loadTrackerBlockCount();
  renderWhitelist();

  const addBtn = document.querySelector("button");
  addBtn.addEventListener("click", addDomainToWhitelist);

});
