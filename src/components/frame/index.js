import React from "react";
import ParamList from "../paramList";
import classnames from "classnames";
import "./frame.css";

export default function Frame(props) {
    let containerClasses = classnames({
        "frame__container": true,
        "frame__container--empty": !props.frame.params.length,
        "frame__container--expanded": props.expanded
    });

    return (
        <div className={containerClasses}>
            <div className="frame__title" title={props.frame.tooltip} onClick={frameClick}>
                {props.frame.title}
            </div>
            <div className="frame__params">
                <ParamList params={props.frame.params} />
            </div>   
        </div>
    );

    function frameClick() {
        if (props.frame.params.length) {
            props.onFrameClick?.();
        }
    }
}