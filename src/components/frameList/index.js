import React from "react";
import Frame from "../frame"

export default class FrameList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            expandedFrames: []
        }
    }

    render() {
        const frameList = this.props.frames.map((frame) => {
            const isExpanded = this.state.expandedFrames.some(id => id == frame.id);
            return <Frame frame={frame} key={frame.id} expanded={isExpanded} onFrameClick={this.frameClick.bind(this, frame.id)}/>
        });
        
        return (
            <div className="frame-list">
                {frameList}
            </div>
        );
    }

    frameClick(frameId) {
        let expandedFrames = this.state.expandedFrames.includes(frameId) ? [] : [frameId];
        this.setState({ expandedFrames });
    }
}