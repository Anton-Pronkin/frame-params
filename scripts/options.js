const baseOptions = [
    {
        name: OptionManager.optionNames.paramsHighlighting,
        caption: "Highlight names of params that equal \"id\" or ends with \"id\""
    }, 
    {
        name: OptionManager.optionNames.paramsSorting,
        caption: "Sort params alphabetically"
    }, 
    {
        name: OptionManager.optionNames.emptyFramesHiding,
        caption: "Hide frames that have no params"
    }, 
    {
        name: OptionManager.optionNames.pageUrlDisplaying,
        caption: "Show page URL instead of the page title"
    }
];

let render = async () => {
    let options = await OptionPreparer.process(baseOptions);

    const controller = new ComponentsController({
        root: document.getElementById("options-content"),
        mainComponent:  new OptionPage({
            options: options, 
            saveOptions: saveOptions
        })
    });

    controller.renderComponents();

    async function saveOptions(options) {
        for (const option of options) {
            await OptionManager.set(option.name, option.checked);
        }

        close();
    }
};

render();