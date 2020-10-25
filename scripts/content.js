chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'openPopup') {
        let frameUrls = getUrls();
        sendResponse(frameUrls);
    }
});

function getUrls() {
    let urls = [document.location.href];

    let frames = window.frames;
    for (let i = 0; i < frames.length; i++) {
        urls.push(frames[i].location.href);
    }

    return urls;
}
