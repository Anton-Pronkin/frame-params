import React from "react";
import OptionManager from "../../utils/optionManager";
import OptionPreparer from "../../utils/optionPreparer";
import OptionsDescription from "../../utils/optionsDescription";
import OptionList from "../optionList";
import "./index.css";

export default class OptionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            options: null
        };
    }

    async componentDidMount() {
        let options = await OptionPreparer.process(OptionsDescription);
        this.setState({
            loaded: true,
            options
        });
    }

    render() {
        if (!this.state.loaded) {
            return <div>Loading...</div>
        }

        return (
            <div className="option-page">
                <OptionList options={this.state.options} onOptionChecked={this.optionChecked.bind(this)}/>
                <div className="option-page__save-button" onClick={this.saveClick.bind(this)}>Save</div>
            </div>
        );
    }

    optionChecked(optionName, optionChecked) {
        const updateChecked = option => option.name == optionName ? { ...option, checked: optionChecked } : option;
        const newOptions = this.state.options.map(updateChecked);

        this.setState({
            options: newOptions
        });
    }

    async saveClick() {
        let options = this.state.options;
        for (const option of options) {
            await OptionManager.set(option.name, option.checked);
        }

        close();
    }
}