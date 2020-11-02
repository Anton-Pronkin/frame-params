class ParamList extends ComponentBase {
    #params;

    constructor ({params}) {
        super({
            name: "param-list"
        });

        this.#params = params;
    }

    renderComponent() {
        return this.#renderParams();
    }

    #renderParams() {
        let params = "";
        for (const param of this.#params) {
            params += this.#renderParam(param);
        }

        return params;
    }

    #renderParam(param) {
        return new Param({param}).render();
    }
}