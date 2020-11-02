class Option extends ComponentBase {
    static #elements = {
        checkboxOption: "checkbox-option",
        checkbox: "checkbox",
        params: "params"
    }

    #option = null;

    constructor ({option}) {
        super({
            name: "option"
        });

        this.#option = option;
    }

    renderComponent() {
        return this.#renderOption(this.#option);
    }

    #renderOption({caption, checked, name}) {
        return `
            <div class="${this.bem(Option.#elements.checkboxOption)}" option-name="${name}">
                ${new Checkbox({caption, checked}).render()}
            </div>`;
    }
}