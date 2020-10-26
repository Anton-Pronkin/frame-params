class OptionManager {
    static #optionNames = {
        paramsHighlighting: "params-highlighting",
        paramsSorting: "params-sorting"
    }

    static async getParamsHighlightingOption() {
        return await OptionManager.#getOption(OptionManager.#optionNames.paramsHighlighting, false);
    }

    static async setParamsHighlightingOption(value) {
        await OptionManager.#setOption(OptionManager.#optionNames.paramsHighlighting, value);
    }

    static async getParamsSortingOption() {
        return await OptionManager.#getOption(OptionManager.#optionNames.paramsSorting, false);
    }

    static async setParamsSortingOption(value) {
        await OptionManager.#setOption(OptionManager.#optionNames.paramsSorting, value);
    }

    static async #getOption(optionName, defaultValue) {
        const options = await chrome.storage.local.get({
            [optionName]: defaultValue
        });

        return options[optionName];
    }

    static async #setOption(optionName, optionValue) {
        await chrome.storage.local.set({
            [optionName]: optionValue
        });
    }
}
