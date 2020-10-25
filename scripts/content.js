chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'openPopup') {
        return openPopup(sendResponse);
    }
});

function openPopup(sendResponse) {
    let framesInfo = getFramesInfo();
    sendResponse(framesInfo);
}

function getFramesInfo() {
    let framesInfo = [getFrameInfo(document)];

    let frames = window.frames;
    for (let i = 0; i < frames.length; i++) {
        try {
            framesInfo.push(getFrameInfo(frames[i]));
        }
        catch {
            // We cannot access to iframe. Do nothing.
        }
    }

    return framesInfo;
}

function getFrameInfo(document) {
    return {
        title: document.title,
        url: document.location.href
    };
}
