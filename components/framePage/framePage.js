class FramePage extends ComponentBase {
    static #elements = {
        emptyMessage: "empty-message"
    }

    #frames;

    constructor ({frames}) {
        super({
            name: "frame-page"
        });

        this.#frames = new FrameList({frames});
    }

    renderComponent() {
        if (this.#frames.items.length) {
            return this.#renderPage();
        }

        return `<span class=${this.bem(FramePage.#elements.emptyMessage)}>Page does not contan frames with params</span>`;
    }

    #renderPage() {
        return this.#frames.render();
    }
}