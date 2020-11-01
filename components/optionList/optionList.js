class OptionList extends ComponentBase {
    static #elements = {
        checkboxOption: "checkbox-option",
        checkbox: "checkbox",
        params: "params"
    }

    #options = null;

    constructor ({options}) {
        super({
            name: "option-list"
        });

        this.#options = options;
    }

    renderComponent() {
        return this.#renderOptions();
    }

    #renderOptions() {
        let optionsHtml = "";
        for (const option of this.#options) {
            optionsHtml += this.#renderOption(option);
        }

        return optionsHtml;
    }

    #renderOption({caption, checked, name}) {
        return `
            <div class="${this.bem(OptionList.#elements.checkboxOption)}" option-name="${name}">
                ${new Checkbox({caption, checked}).render()}
            </div>`;
    }

    static getOptions(container) {
        let optionNameAttribute = "option-name";

        let options = [];
        $(container).find(`[${optionNameAttribute}]`).each(function() {
            let element = $(this);
            let checkboxComponent = element.children()[0];

            let name = element.attr(optionNameAttribute);
            let checked = Checkbox.getChecked(checkboxComponent);

            options.push({ name, checked });
        });

        return options;
    }
}