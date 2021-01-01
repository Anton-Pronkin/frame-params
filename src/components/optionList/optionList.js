class OptionList extends ComponentList {
    constructor ({options}) {
        super({
            name: "option-list",
            items: options.map(option => new Option({option}))
        });
    }

    getOptions() {
        return this.items.map(option => ({
            name: option.getName(),
            checked: option.getChecked()
        }));
    }
}