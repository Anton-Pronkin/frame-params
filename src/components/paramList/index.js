import React from "react";
import Param from "../param";
import "./index.css";

export default function ParamList({params}) {
    const paramList = params.map((param) => <Param param={param} className="param-list" key={param.name}/>);

    return (
        <div className="param-list">
            {paramList}
        </div>
    );
}