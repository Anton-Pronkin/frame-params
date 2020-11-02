class OptionList extends ComponentList {
    constructor ({options}) {
        super({
            name: "option-list",
            items: options.map(option => new Option({option}))
        });
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