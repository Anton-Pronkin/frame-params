class Checkbox extends ComponentBase {
    static #elements = {
        input: "input",
        mark: "mark"
    }

    #caption;
    #checked;

    constructor ({caption, checked}) {
        super({
            tag: "label",
            name: "checkbox"
        });

        this.#caption = caption;
        this.#checked = checked;
    }

    renderComponent() {
        let checkedAttribute = this.#checked ? "checked" : "";

        return `
            <span>${this.escape(this.#caption)}</span>
            <input class="${this.bem(Checkbox.#elements.input)}" type="checkbox" ${checkedAttribute}>
            <span class="${this.bem(Checkbox.#elements.mark)}"></span>`;
    }

    getChecked() {
        return this.element(Checkbox.#elements.input).is(":checked");
    }
}