class Param extends ComponentBase {
    static #elements = {
        container: "container",
        name: "name",
        value: "value",
        copyButton: "copy-button"
    }

    static #modifiers = {
        highlighted: "highlighted"
    }

    #param;

    constructor ({param}) {
        super({
            name: "param"
        });

        this.#param = param;
    }

    renderComponent() {
        return this.#renderParam(this.#param);
    }

    #renderParam({name, value, isHighlighted}) {
        let pamaNameModifier = isHighlighted ? this.bem(Param.#elements.name, Param.#modifiers.highlighted) : "";

        return `
            <div class="${this.bem(Param.#elements.container)}">
                <div class="${this.bem(Param.#elements.name)} ${pamaNameModifier}" title=${name}>${name}</div>
                <input class="${this.bem(Param.#elements.value)}" type="text" value=${value}></input>
                <div class="${this.bem(Param.#elements.copyButton)}" click-handler="${this.copyButtonClick.name}">Copy</div>
            </div>`;
    }

    copyButtonClick() {
        let text = this.element(Param.#elements.value).val();
        navigator.clipboard.writeText(text).then(function() {
            window.close();
        });
    }
}