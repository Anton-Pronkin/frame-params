class OptionManager {
    static optionNames = {
        paramsHighlighting: "params-highlighting",
        paramsSorting: "params-sorting",
        emptyFramesHiding: "empty-frames-hiding",
        pageUrlDisplaying: "page-url-displaying"
    }

    static #cache = new Map();

    // Page URL displaying
    static async getPageUrlDisplayingOption() {
        return await OptionManager.#getOption(OptionManager.optionNames.pageUrlDisplaying, false);
    }

    static async setPageUrlDisplayingOption(value) {
        await OptionManager.#setOption(OptionManager.optionNames.pageUrlDisplaying, value);
    }

    // Empty frames hiding
    static async getEmptyFramesHidingOption() {
        return await OptionManager.#getOption(OptionManager.optionNames.emptyFramesHiding, false);
    }

    static async setEmptyFramesHidingOption(value) {
        await OptionManager.#setOption(OptionManager.optionNames.emptyFramesHiding, value);
    }

    // Params highlighting
    static async getParamsHighlightingOption() {
        return await OptionManager.#getOption(OptionManager.optionNames.paramsHighlighting, false);
    }

    static async setParamsHighlightingOption(value) {
        await OptionManager.#setOption(OptionManager.optionNames.paramsHighlighting, value);
    }

    // Params sorting
    static async getParamsSortingOption() {
        return await OptionManager.#getOption(OptionManager.optionNames.paramsSorting, false);
    }

    static async setParamsSortingOption(value) {
        await OptionManager.#setOption(OptionManager.optionNames.paramsSorting, value);
    }

    static async get(optionName) {
        return await OptionManager.#getOption(optionName, false);
    }

    static async set(optionName, value) {
        await OptionManager.#setOption(optionName, value);
    }

    // Base getter
    static async #getOption(optionName, defaultValue) {
        if (this.#cache.has(optionName)) {
            return this.#cache.get(optionName)
        }

        const options = await chrome.storage.local.get({
            [optionName]: defaultValue
        });

        const value = options[optionName];
        this.#cache.set(optionName, value);

        return value;
    }

    // Base settter
    static async #setOption(optionName, optionValue) {
        await chrome.storage.local.set({
            [optionName]: optionValue
        });

        this.#cache.set(optionName, optionValue);
    }

    static clearCache() {
        this.#cache.clear();
    }
}
