class ParamList extends ComponentList {
    constructor ({params}) {
        super({
            name: "param-list",
            items: params.map(param => new Param({param}))
        });
    }
}