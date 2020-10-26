class OptionManager {
    static #optionNames = {
        paramsHighlighting: "params-highlighting"
    }

    static async getParamsHighlightingOption() {
        return await OptionManager.#getOption(OptionManager.#optionNames.paramsHighlighting, false);
    }

    static async setParamsHighlightingOption(value) {
        await OptionManager.#setOption(OptionManager.#optionNames.paramsHighlighting, value);
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
