class FramePreparer {
    static async process(framesInfo) {
        let frames = [];
        for (const frameInfo of framesInfo) {
            let frame = await FramePreparer.#prepareFrame(frameInfo);

            if (await FramePreparer.#shouldAddFrame(frame)){
                frames.push(frame);
            }
        }

        return frames;
    }

    static async #prepareFrame(frameInfo) {
        return {
            title: await FramePreparer.#prepareTitle(frameInfo),
            tooltip: await FramePreparer.#prepareTooltip(frameInfo),
            params: await FramePreparer.#prepareParams(frameInfo.params)
        };
    }

    static async #prepareTitle({title, page}) {
        return await OptionManager.getPageUrlDisplayingOption() ? page || title : title || page;
    }

    static async #prepareTooltip({title, page}) {
        return await OptionManager.getPageUrlDisplayingOption() ? title || page : page || title;
    }

    static async #prepareParams(paramsInfo) {
        let params = [];
        for (const paramInfo of paramsInfo) {
            let param = await FramePreparer.#prepareParam(paramInfo);
            params.push(param);
        }

        if (await FramePreparer.#shouldSortParams()) {
            params.sort(FramePreparer.#compareParamNamesAbetically);
        }

        return params;
    }

    static async #prepareParam(param) {
        return {
            name: param.name,
            value: param.value,
            isHighlighted: await FramePreparer.#prepareHighlighted(param.name)
        };
    }

    static async #prepareHighlighted(name) {
        if (!name) {
            return false;
        }

        let endsWithId = name.toLowerCase().endsWith("id");
        if (!endsWithId) {
            return false;
        }

        return await OptionManager.getParamsHighlightingOption();
    }

    static async #shouldAddFrame(frame) {
        if (!frame.title) {
            return false;
        }

        if (frame.params.length) {
            return true;
        }

        return !await OptionManager.getEmptyFramesHidingOption();
    }

    static async #shouldSortParams() {
        return await OptionManager.getParamsSortingOption();
    }

    static #compareParamNamesAbetically(paramX, paramY) {
        let x = paramX.name.toLowerCase();
        let y = paramY.name.toLowerCase();

        return x < y ? -1 : x > y ? 1 : 0;
    }
}