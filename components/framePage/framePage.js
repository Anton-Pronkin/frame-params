class FramePage extends ComponentBase {
    static #elements = {
        emptyMessage: "empty-message"
    }

    #frames = null;
    
    constructor ({frames}) {
        super({
            name: "frame-page"
        });

        this.#frames = frames;
    }

    renderComponent() {
        if (this.#frames.length) {
            return this.#renderPage();
        }

        return `<span class=${this.bem(FramePage.#elements.emptyMessage)}>Page does not contan frames with params</span>`;
    }

    #renderPage() {
        let frameList = new FrameList({ frames: this.#frames });
        return frameList.render();
    }
}