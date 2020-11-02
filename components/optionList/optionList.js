class OptionList extends ComponentBase {
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

    #renderOption(option) {
        return new Option({option}).render();
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