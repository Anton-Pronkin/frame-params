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

    constructor ({frame}) {
        super({
            name: "frame"
        });

        this.#frame = frame;
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
        return params.length ? `click-handler="${Frame.frameClick.name}"` : "";
    }

    static frameClick({target}) {
        const component = ComponentBase.componentName(target);
        const expandedFrameClass = ComponentBase.bem(component, Frame.#elements.container, Frame.#modifiers.expanded);

        const framesSelector = "." + ComponentBase.bem(component, Frame.#elements.container);
        const paramsSelector = "." + ComponentBase.bem(component, Frame.#elements.params);

        let currentFrame = $(target).parent();
        currentFrame.toggleClass(expandedFrameClass);
        currentFrame.find(paramsSelector).toggle("fast");

        let otherFrames = $(framesSelector).not(currentFrame);
        otherFrames.removeClass(expandedFrameClass);
        otherFrames.find(paramsSelector).hide("fast");
    }
}