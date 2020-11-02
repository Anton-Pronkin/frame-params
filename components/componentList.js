class ComponentList extends ComponentBase {
    constructor(params) {
        super(params);
        this.items = params.items;
    }

    renderComponent() {
        let html = "";
        for (const item of this.items) {
            html += item.render();
        }

        return html;
    }
}