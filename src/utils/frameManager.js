class FrameManager {
    static async getFrames() {
        let currentTabId = await FrameManager.#getCurrentTabId();
        return await FrameManager.#generateFramesForTab(currentTabId);
    }

    static async #generateFramesForTab(tabId) {
        let frames = await chrome.webNavigation.getAllFrames({tabId});
        return await FrameManager.#generateFramesInfo(tabId, frames);
    }

    static async #generateFramesInfo(tabId, frames) {
        return Promise.all(frames
            .filter(frame => !frame.errorOccurred)
            .map(async frame => await FrameManager.#generateFrameInfo(tabId, frame)));
    }   

    static async #generateFrameInfo(tabId, {frameId, url}) {
        const title = await FrameManager.#getFrameTitle(tabId, frameId);
        const page = UrlUtil.getPage(url);
        const params = Array.from(UrlUtil.getParams(url));

        return {title, page, params};
    }   

    static async #getFrameTitle(tabId, frameId) {
        const message = {
            action: 'getTitle'
        };

        try {
            return await chrome.tabs.sendMessage(tabId, message, {frameId});
        }
        catch {
            // Cannot access to tab content.
            return null;
        }
    }

    static async #getCurrentTabId() {
        const tabsQuery = { 
            currentWindow: true, 
            active: true
        };
    
        let tabs = await chrome.tabs.query(tabsQuery);
        return tabs[0].id;
    }
}