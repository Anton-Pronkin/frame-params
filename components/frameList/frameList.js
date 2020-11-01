class FrameList extends ComponentBase {
    static #elements = {
        frame: "frame",
        title: "title",
        params: "params"
    }

    static #modifiers = {
        empty: "empty",
        expanded: "expanded"
    }

    #frames = null;

    constructor ({frames}) {
        super({
            tag: "ul",
            name: "frame-list"
        });

        this.#frames = frames;
    }

    renderComponent() {
        return this.#renderFrames();
    }

    #renderFrames() {
        let framesHtml = "";
        for (const frame of this.#frames) {
            framesHtml += this.#renderFrame(frame);
        }

        return framesHtml;
    }

    #renderFrame({title, tooltip, params}) {
        let paramList = new ParamList({params});

        let frameModifier = this.getFrameModifier(params);
        let titleAttribute = this.getTitleAttribute(params);
       
        return `
            <li class="${this.bem(FrameList.#elements.frame)} ${frameModifier}">
                <div class="${this.bem(FrameList.#elements.title)}" title=${tooltip} ${titleAttribute}>${title}</div>
                <div class="${this.bem(FrameList.#elements.params)}">${paramList.render()}</div>
            </li>`;
    }

    getFrameModifier(params) {
        return params.length ? "" : this.bem(FrameList.#elements.frame, FrameList.#modifiers.empty);
    }

    getTitleAttribute(params) {
        return params.length ? `click-handler="${FrameList.frameClick.name}"` : "";
    }

    static frameClick({target}) {
        const component = ComponentBase.componentName(target);
        const expandedFrameClass = ComponentBase.bem(component, FrameList.#elements.frame, FrameList.#modifiers.expanded);

        const framesSelector = "." + ComponentBase.bem(component, FrameList.#elements.frame);
        const paramsSelector = "." + ComponentBase.bem(component, FrameList.#elements.params);

        let currentFrame = $(target).parent();
        currentFrame.toggleClass(expandedFrameClass);
        currentFrame.find(paramsSelector).toggle("fast");

        let otherFrames = $(framesSelector).not(currentFrame);
        otherFrames.removeClass(expandedFrameClass);
        otherFrames.find(paramsSelector).hide("fast");
    }
}