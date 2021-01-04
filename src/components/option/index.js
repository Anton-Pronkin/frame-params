import React from "react";
import Checkbox from "../checkbox";
import "./index.css";

export default function Option({option, onOptionChecked}) {
    return (
        <div className="option__checkbox-option">
            <Checkbox caption={option.caption} checked={option.checked} onChecked={onChecked} />
        </div>
    );

    function onChecked(checked) {
        onOptionChecked?.(option.name, checked);
    }
}