import React from "react";
import Option from "../option";

export default function OptionList({options, onOptionChecked}) {
    const optionList = options.map((option) => <Option option={option} key={option.name} onOptionChecked={onOptionChecked} />);
    
    return (
        <div className="option-list">
            {optionList}
        </div>
    );
}