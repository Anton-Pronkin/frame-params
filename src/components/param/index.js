import React from "react";
import classnames from "classnames";
import "./index.css";

export default class Param extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paramValue: ""
        }
    }

    render() {
        let paramNameClasses = classnames({
            "param__name": true,
            "param__name--highlighted": this.props.param.isHighlighted
        });
        
        return (
            <div className="param__container">
                <div title={this.props.param.name} className={paramNameClasses}>{this.props.param.name}</div>
                <input type="text" defaultValue={this.props.param.value} className="param__value" onChange={this.valueChanged.bind(this)}></input>
                <div className="param__copy-button" onClick={this.copyButtonClick.bind(this)}>Copy</div>
            </div>
        );
    }
    
    valueChanged(event) {
        this.setState({
            paramValue: event.target.value
        })
    }

    copyButtonClick() {
        navigator.clipboard.writeText(this.state.paramValue).then(function() {
            window.close();
        });
    }
}