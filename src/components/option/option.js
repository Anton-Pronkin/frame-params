class Option extends ComponentBase {
    static #elements = {
        checkboxOption: "checkbox-option",
        checkbox: "checkbox",
        params: "params"
    }

    #option;
    #checkbox;

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
        this.#checkbox = new Checkbox({caption, checked});
        return `
            <div class="${this.bem(Option.#elements.checkboxOption)}" option-name="${name}">
                ${this.#checkbox.render()}
            </div>`;
    }

    getName() {
        return this.#option.name;
    }

    getChecked() {
        return this.#checkbox.getChecked();
    }
}