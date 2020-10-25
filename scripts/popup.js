$(document).ready(getFramesInfoForActiveTab);

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
    let contentInfo = createContentInfo(framesInfo);
    let content = generateContent(contentInfo);

    let container = document.body;
    container.appendChild(content);
}

function createContentInfo(framesInfo) {
    let contentInfo = [];

    for (const frameInfo of framesInfo) {
        let contentFrameInfo = createContentFrameInfo(frameInfo);
        if (contentFrameInfo.params.length)
        {
            contentInfo.push(contentFrameInfo);
        }
    }

    return contentInfo;
}

function createContentFrameInfo(frameInfo) {
    return {
        title: frameInfo.title,
        params: getUrlParams(frameInfo.url)
    };
}


function generateContent(framesInfo) {
    let content = createBlock("content");

    let frames = generateFrames(framesInfo);
    content.appendChild(frames);

    return content;
}

function generateFrames(framesInfo) {
    let frames = createList("content__frames");

    for (const frameInfo of framesInfo) {
        let frame = generateFrameInfo(frameInfo);
        frames.appendChild(frame);
    }

    return frames;
}

function generateFrameInfo(frameInfo) {
    let frame = createListItem("content__frame");

    let title = createBlock("content__frame-title", frameInfo.title);
    frame.appendChild(title);

    let params = generateFrameParams(frameInfo.params);
    frame.appendChild(params);

    return frame;
}

function generateFrameParams(paramsInfo) {
    let params = createList("content__frame-params");

    for (const paramInfo of paramsInfo) {
        let param = generateFrameParam(paramInfo);
        params.appendChild(param);
    }

    return params;
}

function generateFrameParam(paramInfo) {
    let param = createListItem("content__frame-param");

    let paramName = createBlock("content__param-name", paramInfo.name);
    param.appendChild(paramName);

    let paramValue = createInput("content__param-value", paramInfo.value);
    param.appendChild(paramValue);

    let copyButton = createBlock("content__copy-param-button", "Copy");
    param.appendChild(copyButton);

    return param;
}