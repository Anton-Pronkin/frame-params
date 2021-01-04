import OptionManager from "./optionManager";

export default class OptionPreparer {
    static async process(baseOptions) {
        let options = [];
        for (const baseOption of baseOptions) {
            let option = await this.prepareOption(baseOption);
            options.push(option);
        }

        return options;
    }

    static async prepareOption({name, caption}) {
        return {
            name: name,
            caption: caption,
            checked: await OptionManager.get(name)
        }
    }
}