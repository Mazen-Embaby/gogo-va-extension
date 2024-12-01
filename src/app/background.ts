
// Allows users to open the side panel by clicking on the action toolbar icon
chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// When Action Icon is clicked
// chrome.action.onClicked.addListener((tab) => {
//   // Open Side Panel
//   chrome.sidePanel.open({ tabId: tab!.id! }, () => {
//     console.log('Side Panel Opened');
//   });

//   // chrome.action.onClicked.addListener((tab) => {
//   //   chrome.scripting.executeScript({
//   //     target: { tabId: tab.id! },
//   //     files: ["inject.js"]
//   //   });
//   // });

// });

// background.js
chrome.runtime.onInstalled.addListener(() => {
  console.log('Hello World Side Panel extension installed');
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  showSummary(activeInfo.tabId);
});
chrome.tabs.onUpdated.addListener(async (tabId) => {
  showSummary(tabId);
});

async function showSummary(tabId: number) {
  const tab = await chrome.tabs.get(tabId);
  try {
  if (tab && tab.url?.startsWith('http')){
    const injection = await chrome.scripting.executeScript({
      target: { tabId },
      files: ['extract-content.js']
    });
    chrome.storage.session.set({ pageContent: injection[0].result });
  }
}
catch(err){
  console.log(`Error ${err}`);
}
  return;
}


// Listener for messages from content or popup scripts
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log("Message received in background script:", message);

//     if (message.type === "checkGrammar") {
//       // Example API call to LanguageTool
//       fetch(`https://api.languagetool.org/v2/check?text=${encodeURIComponent(message.text)}&language=en-US`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           sendResponse({ suggestions: data.matches });
//         })
//         .catch((error) => console.error("Error checking grammar:", error));
//       return true; // Keep the message channel open for async responses
//     }
//     return false;
//   });

/*
CONTEXT
*/
// Function to setup the context menu
function setupContextMenu(): void {
  chrome.contextMenus.create({
    id: 'va-action',
    title: 'Gogo VA',
    type: 'normal',
    contexts: ['selection'],
  });
  

  chrome.contextMenus.create({
    id: 'va-elaborate',
    parentId: 'va-action',
    title: 'Elaborate',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'va-summarize',
    parentId: 'va-action',
    title: 'Summarize',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'va-translate',
    parentId: 'va-action',
    title: 'translate to...',
    contexts: ['selection'],
  });

  chrome.contextMenus.create({
    id: 'va-rewrite',
    parentId: 'va-action',
    title: 'Re-write',
    contexts: ['selection'],
  });
}

// Listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu();
});

// Listener for when a context menu item is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {

  if (info.selectionText) {
    // Store the last word in chrome.storage.session.
    chrome.storage.session.set({ type: info.menuItemId , data: info.selectionText });

    // Ensure the side panel is open for the current tab.
    chrome.sidePanel.open({ tabId: tab!.id! });

    // Add delay to make the angular catch up with send message!
    setTimeout(() => {
      chrome.runtime.sendMessage({ type: info.menuItemId, data: info.selectionText }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Runtime error:', chrome.runtime.lastError);
        } else {
          console.log('Response:', response);
        }
      });
    }, 500); 



  }
});

