class ComponentBase {
    static #componentsCount = 0;
    static #components = new Map();
    static #componentIdPrefix = "component-";

    #componentId;
    #componentTag;
    #componentName;

    constructor({tag, name}) {
        this.#componentTag = tag || "div";
        this.#componentName = name || this.#componentId;
        this.#componentId = this.#generateUniqueId(); 

        ComponentBase.#components.set(this.#componentName, this.constructor);
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

    #generateUniqueId() {
        let regularId = ComponentBase.#componentsCount++;
        return `${ComponentBase.#componentIdPrefix}${this.#componentName}-${regularId}`;
    }

    static component(element) {
        return $(element).closest(`[id^=${ComponentBase.#componentIdPrefix}]`);
    }

    static componentName(element) {
        return ComponentBase.component(element).attr('class');
    }

    static bem(component, element, modifier) {
        const elementSeparator = "__";
        const modifierSeparator = "--";

        const elementName = component + elementSeparator + element;
        return !modifier ? elementName : elementName + modifierSeparator + modifier;
    }

    static getComponent(name) {
        return ComponentBase.#components.get(name);
    }
}