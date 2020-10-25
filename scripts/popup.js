document.addEventListener("DOMContentLoaded", getUrls);

function getUrls() {
    const tabsQuery = { 
        currentWindow: true, 
        active: true
    };

    chrome.tabs.query(tabsQuery, function(tabs) {
        let currentTabId = tabs[0].id;
        let message = {  
            action: 'openPopup'
        };

        chrome.tabs.sendMessage(currentTabId, message, generateUrls);
    });
}

function generateUrls(urls) {
    document.write(urls[0]);
}
