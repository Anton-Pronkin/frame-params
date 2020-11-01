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
            <span>${this.#caption}</span>
            <input class="${this.bem(Checkbox.#elements.input)}" type="checkbox" ${checkedAttribute}>
            <span class="${this.bem(Checkbox.#elements.mark)}"></span>`;
    }

    static getChecked(container) {
        let component = ComponentBase.componentName(container);
        let checkBoxSelector = "." + ComponentBase.bem(component, Checkbox.#elements.input);
        
        return $(container).find(checkBoxSelector).is(":checked");
    }
}