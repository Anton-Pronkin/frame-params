class ParamList extends ComponentBase {
    static #elements = {
        paramItem: "param-item",
        paramName: "param-name",
        paramValue: "param-value",
        copyButton: "copy-param-button"
    }

    static #modifiers = {
        highlighted: "highlighted"
    }

    constructor ({params}) {
        super({
            tag: "ul",
            name: "param-list"
        });

        this.params = params;
    }

    renderComponent() {
        return this.#renderParams();
    }

    #renderParams() {
        let params = "";
        for (const param of this.params) {
            params += this.#renderParam(param);
        }

        return params;
    }

    #renderParam({name, value, isHighlighted}) {
        let pamaNameModifier = isHighlighted ? this.bem(ParamList.#elements.paramName, ParamList.#modifiers.highlighted) : "";

        return `
            <li class="${this.bem(ParamList.#elements.paramItem)}">
                <div class="${this.bem(ParamList.#elements.paramName)} ${pamaNameModifier}" title=${name}>${name}</div>
                <input class="${this.bem(ParamList.#elements.paramValue)}" type="text" value=${value}></input>
                <div class="${this.bem(ParamList.#elements.copyButton)}" click-handler="${ParamList.copyButtonClick.name}">Copy</div>
            </li>`;
    }

    static copyButtonClick({target}) {
        let text = $(target).prev().val();
        navigator.clipboard.writeText(text).then(function() {
            window.close();
        });
    }
}