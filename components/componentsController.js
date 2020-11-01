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

            let componentName = ComponentBase.componentName(element);
            let component = ComponentBase.getComponent(componentName);

            let handlerName = element.attr(attributeName);
            let handler = component[handlerName];

            element.on(eventName, handler);
            element.removeAttr(attributeName);
        });
    }
}