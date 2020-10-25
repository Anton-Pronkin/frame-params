chrome.browserAction.onClicked.addListener(function(tab) {
    let message = {  
        action: 'openPopup'
    };

    chrome.tabs.sendMessage(tab.id, message);
});
