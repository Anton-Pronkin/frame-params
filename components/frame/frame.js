class Frame extends ComponentBase {
    static #elements = {
        container: "container",
        title: "title",
        params: "params"
    }

    static #modifiers = {
        empty: "empty",
        expanded: "expanded"
    }

    #frame;
    #onClick;

    constructor ({frame, onClick}) {
        super({
            name: "frame"
        });

        this.#frame = frame;
        this.#onClick = onClick;
    }

    renderComponent() {
        return this.#renderFrame(this.#frame);
    }

    #renderFrame({title, tooltip, params}) {
        let paramList = new ParamList({params});

        let containerModifier = this.getFrameModifier(params);
        let titleAttribute = this.getTitleAttribute(params);
       
        return `
            <div class="${this.bem(Frame.#elements.container)} ${containerModifier}">
                <div class="${this.bem(Frame.#elements.title)}" title=${tooltip} ${titleAttribute}>${title}</div>
                <div class="${this.bem(Frame.#elements.params)}">${paramList.render()}</div>
            </div>`;
    }

    getFrameModifier(params) {
        return params.length ? "" : this.bem(Frame.#elements.container, Frame.#modifiers.empty);
    }

    getTitleAttribute(params) {
        return params.length ? `click-handler="${this.frameClick.name}"` : "";
    }

    toggle() {
        let container = this.element(Frame.#elements.container);
        container.toggleClass(this.bem(Frame.#elements.container, Frame.#modifiers.expanded));

        let params = this.element(Frame.#elements.params);
        params.toggle("fast");
    }

    collapse() {
        let container = this.element(Frame.#elements.container);
        container.removeClass(this.bem(Frame.#elements.container, Frame.#modifiers.expanded));

        let params = this.element(Frame.#elements.params);
        params.hide("fast");
    }

    frameClick() {
        this.#onClick?.(this);
    }
}