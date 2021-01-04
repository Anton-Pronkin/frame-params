import React from "react";
import "./index.css"

export default class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        };
    }

    render() {
        return (
            <div className="checkbox" onClick={this.checked.bind(this)} >
                <span>{this.props.caption}</span>
                <input className="checkbox__input" type="checkbox" defaultChecked={this.state.checked}/> 
                <span className="checkbox__mark"></span>
            </div>
        );
    }

    checked() {
        const newChecked = !this.state.checked;
        this.setState({
            checked: newChecked
        });

        this.onChecked(newChecked);
    }

    onChecked(checked) {
        this.props.onChecked?.(checked);
    }
}