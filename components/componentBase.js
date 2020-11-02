class ComponentBase {
    static #componentsCount = 0;
    static #components = new Map();
    static #componentIdPrefix = "component-";

    #componentId;
    #componentTag;
    #componentName;

    constructor({tag, name}) {
        this.#componentTag = tag || "div";
        this.#componentName = name || "unknown";
        this.#componentId = this.#generateUniqueId(); 

        ComponentBase.#components.set(this.#componentId, this);
    }

    render() {
        return `
            <${this.#componentTag} id=${this.#componentId} class="${this.#componentName}">
                ${this.renderComponent()}
            </${this.#componentTag}>`;
    }

    renderComponent() {
    }

    bem(element, modifier) {
        return ComponentBase.bem(this.#componentName, element, modifier);
    }

    static bem(block, element, modifier) {
        const elementSeparator = "__";
        const modifierSeparator = "--";

        const elementName = block + elementSeparator + element;
        return !modifier ? elementName : elementName + modifierSeparator + modifier;
    }

    element(element, modifier) {
        let root = this.getComponentRoot();
        return element ? root.find(`.${this.bem(element, modifier)}`) : root;
    }

    getComponentRoot() {
        return $(document).find(`#${this.#componentId}`);
    }

    #generateUniqueId() {
        let regularId = ComponentBase.#componentsCount++;
        return `${ComponentBase.#componentIdPrefix}${this.#componentName}-${regularId}`;
    }

    static getComponentByElement(element) {
        let componentId = ComponentBase.getComponentIdByElement(element);
        return ComponentBase.getComponent(componentId);
    }

    static getComponentIdByElement(element) {
        return $(element).closest(`[id^=${ComponentBase.#componentIdPrefix}]`).attr("id");
    }

    static getComponent(componentId) {
        return ComponentBase.#components.get(componentId);
    }
}