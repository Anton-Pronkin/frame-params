class OptionPage extends ComponentBase {
    static #elements = {
        options: "options",
        saveButton: "save-button"
    }

    #options;
    #onSaveClick;
    
    constructor ({options, onSaveClick}) {
        super({
            name: "option-page"
        });

        this.#options = new OptionList({options});
        this.#onSaveClick = onSaveClick;
    }

    renderComponent() {
        return this.#renderPage();
    }

    #renderPage() {
        return `
            <div class="${this.bem(OptionPage.#elements.options)}">${this.#options.render()}</div>
            <div class="${this.bem(OptionPage.#elements.saveButton)}" click-handler="${this.saveClick.name}">Save</div>`;
    }

    saveClick() {
        let options = this.#options.getOptions();
        this.#onSaveClick?.(options);
    }
}