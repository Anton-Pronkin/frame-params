chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'getFramesInfo') {
        let framesInfo = getFramesInfo();
        sendResponse(framesInfo);
    }
});

function getFramesInfo() {
    let framesInfo = [getFrameInfo(document)];

    let frames = window.frames;
    for (let i = 0; i < frames.length; i++) {
        try {
            frameInfo = getFrameInfo(frames[i].document);
            framesInfo.push(frameInfo);
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
