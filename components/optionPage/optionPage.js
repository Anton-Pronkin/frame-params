class OptionPage extends ComponentBase {
    static #elements = {
        options: "options",
        saveButton: "save-button"
    }

    #options = null;
    static #saveOptions = null;
    
    constructor ({options, saveOptions}) {
        super({
            name: "option-page"
        });

        this.#options = options;
        OptionPage.#saveOptions = saveOptions;
    }

    renderComponent() {
        return this.#renderPage();
    }

    #renderPage() {
        let optionList = new OptionList({ options: this.#options });
        return `
            <div class="${this.bem(OptionPage.#elements.options)}">${optionList.render()}</div>
            <div class="${this.bem(OptionPage.#elements.saveButton)}" click-handler="${OptionPage.saveClick.name}">Save</div>`;
    }

    static saveClick({target}) {
        let component = ComponentBase.component(target);

        let options = OptionList.getOptions(component);
        OptionPage.#saveOptions(options);
    }
}