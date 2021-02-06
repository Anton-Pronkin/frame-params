chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'getTitle') {
        sendResponse(getTitle());
    }
});

function getTitle() {
    try {
        return document.title;
    }
    catch {
        return null;
    }
}