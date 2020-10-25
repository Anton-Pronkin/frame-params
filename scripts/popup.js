document.addEventListener("DOMContentLoaded", getFramesInfoForActiveTab);

function getFramesInfoForActiveTab() {
    const tabsQuery = { 
        currentWindow: true, 
        active: true
    };

    chrome.tabs.query(tabsQuery, getFramesInfo);
}

function getFramesInfo(tabs) {
    let currentTabId = tabs[0].id;
    let message = {  
        action: 'openPopup'
    };

    chrome.tabs.sendMessage(currentTabId, message, generateFramesInfo);
}

function generateFramesInfo(framesInfo) {
    for (const frameInfo of framesInfo) {
        document.writeln(frameInfo.title);
        document.writeln(frameInfo.url);
    }
}
