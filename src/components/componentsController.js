class ComponentsController {
    static supportedEventNames = [
        "click"
    ];

    #root = null;
    #mainComponent = null;

    constructor({root, mainComponent}) {
        this.#root = root;
        this.#mainComponent = mainComponent;
    }

    renderComponents() {
        this.#root.innerHTML = this.#mainComponent.render();
        this.#applyHandlers(this.#root);
    }

    #applyHandlers(container) {
        const root = $(container);
        for (const eventName of ComponentsController.supportedEventNames) {
            this.#applyHandler(root, eventName);
        }
    }

    #applyHandler(root, eventName) {
        const attributeName = `${eventName}-handler`;
        root.find(`[${attributeName}]`).each(function() {
            let element = $(this);
            let component = ComponentBase.getComponentByElement(element);

            let handlerName = element.attr(attributeName);
            let handler = component[handlerName] ?? component.constructor[handlerName];

            element.on(eventName, handler.bind(component));
            element.removeAttr(attributeName);
        });
    }
}