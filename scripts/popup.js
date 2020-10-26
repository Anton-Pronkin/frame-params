$(document).ready(async function() {
    
    const tabsQuery = { 
        currentWindow: true, 
        active: true
    };

    let tabs = await chrome.tabs.query(tabsQuery);
    let currentTabId = tabs[0].id;

    await getFramesInfo(currentTabId);

    async function getFramesInfo(tab) {
        let message = {  
            action: 'openPopup'
        };

        let framesInfo = await chrome.tabs.sendMessage(tab, message);
        await generateFramesInfo(framesInfo);
    }

    async function generateFramesInfo(framesInfo) {
        if (!framesInfo) {
            window.close();
        }

        let contentInfo = createContentInfo(framesInfo);
        let content = await generateContent(contentInfo);
        initializeHandlers(content);

        let container = document.body;
        container.appendChild(content);
    }

    function createContentInfo(framesInfo) {
        let contentInfo = [];

        for (const frameInfo of framesInfo) {
            let contentFrameInfo = createContentFrameInfo(frameInfo);
            if (contentFrameInfo.params.length || contentFrameInfo.title)
            {
                contentInfo.push(contentFrameInfo);
            }
        }

        return contentInfo;
    }

    function createContentFrameInfo(frameInfo) {
        return {
            title: frameInfo.title,
            page: getUrlPage(frameInfo.url),
            params: getUrlParams(frameInfo.url)
        };
    }


    async function generateContent(framesInfo) {
        let content = createBlock("content");

        let frames = await generateFrames(framesInfo);
        content.appendChild(frames);

        return content;
    }

    async function generateFrames(framesInfo) {
        let frames = createList("content__frames");

        for (const frameInfo of framesInfo) {
            let frame = await generateFrameInfo(frameInfo);
            frames.appendChild(frame);
        }

        return frames;
    }

    async function generateFrameInfo(frameInfo) {
        let frame = createListItem("content__frame");

        let title = createBlock("content__frame-title", frameInfo.title);
        title.setAttribute("title", frameInfo.page);
        if (!frameInfo.params.length) {
            title.classList.add("content__frame-title--empty");
        }

        frame.appendChild(title);

        let params = await generateFrameParams(frameInfo.params);
        frame.appendChild(params);

        return frame;
    }

    async function generateFrameParams(paramsInfo) {
        let params = createList("content__frame-params");

        for (const paramInfo of paramsInfo) {
            let param = await generateFrameParam(paramInfo);
            params.appendChild(param);
        }

        return params;
    }

    async function generateFrameParam(paramInfo) {
        let param = createListItem("content__frame-param");

        let paramName = createBlock("content__param-name", paramInfo.name);
        paramName.setAttribute("title", paramInfo.name);

        let needHighlight = paramInfo.name && paramInfo.name.toLowerCase().endsWith("id");
        if (needHighlight && await OptionManager.getParamsHighlightingOption()) {
            paramName.classList.add("content__param-name--highlighted");
        }

        param.appendChild(paramName);

        let paramValue = createInput("content__param-value", paramInfo.value);
        param.appendChild(paramValue);

        let copyButton = createBlock("content__copy-param-button", "Copy");
        param.appendChild(copyButton);

        return param;
    }

    function initializeHandlers(container) {
        let titles = $(container).find(".content__frame-title").not(".content__frame-title--empty");
        titles.click(function() {
            let visibleTitles = titles.filter(":visible").not(this);
            visibleTitles.removeClass("content__frame-title--expanded");

            let visibleParams = visibleTitles.next(); 
            visibleParams.hide("fast");

            let currentTitle = $(this);
            currentTitle.toggleClass("content__frame-title--expanded");

            let currentParams = currentTitle.next();
            currentParams.toggle("fast");        
        });

        let copyButtons = $(container).find(".content__copy-param-button");
        copyButtons.click(function() {
            let text = $(this).prev().val();
            navigator.clipboard.writeText(text).then(function() {
                window.close();
            });
        });
    }
});
